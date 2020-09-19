const product_ids = {
    "ids":[
        1104465, 1120713, 1120719, 1140346, 1140572, 1141400, 1141414, 1142718, 1142911, 1147149, 1147589, 1149445, 1150532, 1153960, 1154091, 1154128, 1155166, 1155209, 1156280, 1156285, 1156300, 1156314, 1156317, 1156324, 1156346, 1156366, 1156638, 1156657, 1156736, 1156862, 1156867, 1156882, 1157125, 1157131, 1157151, 1157152, 1157180, 1157252, 1157271, 1157278, 1157284, 1157306, 1157313, 1157349, 1157363, 1157395, 1157408, 1157410, 1157503, 1157511, 1157666, 1157689, 1157700, 1157771, 1157897, 1157992, 1158011, 1158030, 1158049, 1158052, 1158054, 1158062, 1158071, 1158085, 1158103, 1158109, 1158129, 1158134, 1158147, 1158148, 1158166, 1158211, 1158268, 1158296, 1158332, 1158534, 1158544, 1158547, 1158548, 1158563, 1158567, 1158576, 1158583, 1158601, 1158636, 1158657, 1158678, 1158682, 1158689, 1158704, 1158717, 1158758, 1158782, 1158791, 1158804, 1158820, 1158937, 1158970, 1159029, 1159039, 1160670, 1160689, 1160706, 1161214, 1161233, 1161278, 1152316, 1152327, 1152331, 1152340, 1152346, 1152356, 1152369, 1152390, 1152397, 1152404, 1152412, 1152435, 1152490, 1152517, 1152535, 1152550, 1152554, 1152561, 1152567, 1152574, 1152581, 1152597, 1152601, 1152616, 1152656, 1152663, 1152671, 1152688, 1152694, 1152703, 1152710, 1152724, 1152732, 1152777, 1134828
    ]
};

async function ProductApprove(ids) {
    try {
        const axios = require('axios').default;
        const res = await axios.post('https://svl-products-ces.eastus2-1.eventgrid.azure.net/api/events',
            {
                "cloudEventsVersion": "0.1",
                "eventType": "SVL.Products.ProductApproved",
                "eventTypeVersion": "1.0",
                "eventID": "1594509f-2cfb-4add-8a77-fe3989b64674",
                "source": "/subscriptions/b7b5539c-bab8-46a1-a7f6-d58557771d01/resourceGroups/as-buffetcloud-falabella-svl/providers/Microsoft.EventGrid/topics/svl-products-ces#falabella/Colombia/svl/products",
                "eventTime": "2019-07-09T18:25:39+00:00",
                "extensions": {
                    "country": "CO"
                },
                "data": {
                    "uri": "https://api-svl-products.buffetcloud.io/services/prdapi/api/v1/admin/products/" + ids
                }
            },
            {
                headers: {
                    "Content-Type":"application/javascript",
                    "aeg-sas-key":"LyVoFEZICBH4BuBcp6yOmmchevne8V9KYMVoE2fEeDA="
                }
            });
        if(res.status == 200){
            return res.status
        }else{
            console.log('errrrrrr', res.message);
            return res.message
        }
    } catch (error) {
        console.log('ERROR');
        console.log(error.message);
        console.log('/ERROR');
        return error.message
    }
}

async function process(product_ids) {
    let i = 0;
    const fs = require('fs');
    while (i < product_ids.length) {
        console.log('Produccc', product_ids[i])
        let result = await ProductApprove(product_ids[i])
         console.log(result)
        if(result == 200){
            i++
            console.log(`Se proceso correctamente el producto: ${product_ids[i]} / ${result}`)
        }
        else{
            i++
            console.log(`Dio error: ${product_ids[i]} / ${result}`)
        }
    }
}
process([...product_ids.ids]);