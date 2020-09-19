const orders = {
	"readyToDispatch": [
		{
			"f12": "121195772944",
			"deliveryState": "readyToDispatch",
			"trackingNumber": "712141838354",
			"label": true,
			"externalEvents": [],
			"externalStatus": "pending",
			"updatedAt": "2020-08-05T19:42:33.602-04:00"
		}
	]
};
async function chileExpress(order) {
    try {
        const axios = require('axios').default;
        const res = await axios.post('https://services.wschilexpress.com/transport-orders/api/v1.0/tracking',
            {
                'transportOrderNumber': order.trackingNumber,
                'rut': '77261280',
                'showTrackingEvents': 1
            },
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': '6c6a7fd78cdf4a84b6240ce7decea102',
                    'Content-Type': 'application/json'
                }
            });
        if (res.data.data.trackingEvents && res.data.data.trackingEvents.length > 0) {
            order.chileExpressInfo = res.data.data.trackingEvents;
        } else {
            return undefined;
        }
        //console.log(order)
        return order;
    } catch (error) {
        console.log('ERROR');
        console.log(error.message);
        console.log('/ERROR');
        order.chileExpressInfo = (error.message.indexOf('429') == -1) ? error.response.statusDescription || error.response.data.statusDescription : error.message;
        //console.log(JSON.stringify(order))
        return undefined;
    }
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function process(orders) {
    let i = 0;
    const fs = require('fs');
    while (i < orders.length) {
        let result = await Promise.all([
            chileExpress(orders[i]),
            timeout(4000)
        ]);
        if (!result || !result[0]) {
            i++;
        } else if (result[0].chileExpressInfo && result[0].chileExpressInfo.indexOf('429') == -1) {
            i++;
            fs.appendFileSync('result.txt', JSON.stringify(result[0]) + " \n\n");
        }
    }
}
process([...orders.readyToDispatch]);