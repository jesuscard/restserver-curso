const fs = require('fs');

let brand = [
["	 COPY AIR	","	14442695	","	10-08-20 08:33	"]
]

 
let brand_act = ''
let result = brand.filter( row => {
    if (row[0] !== brand_act){
        brand_act = row[0]
        return true
    }
    return false
})
fs.appendFileSync("result.txt", JSON.stringify(result));

console.log(result);

https://falabellasvlproductosimg.blob.core.windows.net/falabellasvlproductosimgcontainer/seller_Accesorios.

SKU_FALABELLA
2
corres este script
'12626801381',
'12626914425',
'12627040888',
'12627098209',
'12627208790',
'12627218812',
'12627249786',
'12627281663',
'12627306458',


db.getCollection('order').update(
    {
        business: 0,
        countryCode: 'PE',
        externalId: {
            $in: [
                '12626914425',
                '12627040888',
                '12627098209',
                '12627208790',
                '12627218812',
                '12627281663',
                '12627306458'
            ]
        }
    },
    {
        $set: {
            deliveryState: 'cancelled'
        }
    },
    {
        multi: true
    }
)

db.getCollection('distribution-order').update(
    {
        country: "PE",
        externalId: {
            $in: [
                '12626801381',
                '12627249786'
            ]
        }
    },
    {
        $set: {
            deliveryState: "cancelled",
            paymentState: "cancelled",
        }
    },
    {
        multi: true
    }
)
