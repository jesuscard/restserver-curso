//Si hay external-courier que no tienen eventos, las podemos enviar a que se reproceses
const azure = require("azure-storage");
const loadash = require("lodash");
const STORAGE_QUEUE_CHILEXPRESS = `DefaultEndpointsProtocol=https;AccountName=svlprod;AccountKey=vTj0JyNlcFfxU1sYv7s+Smd3MJP8tqYwhArZ5hm8LvQw+6WTyc3QsUWVTi0yi39TxFxmyIO5v6waHj/OLinUzA==;EndpointSuffix=core.windows.net`;
const NAME_QUEUE_CHILEXPRESS = `chexptrackingnumbers`;
let orders = [
  "712141838354"
];
const sendMessage = (trackingNumbers) => {
  const queueService = azure.createQueueService(STORAGE_QUEUE_CHILEXPRESS);
  const message = Buffer.from(
    JSON.stringify({
      data: {
        orders: trackingNumbers,
      },
    })
  ).toString("base64");
  // logger(`Messahe Base 64 ${message}`);
  queueService.createMessage(NAME_QUEUE_CHILEXPRESS, message, function (error) {
    if (!error) {
      // Message inserted
      console.log(`Message  Queue : ${JSON.stringify(trackingNumbers)}`);
    } else {
      console.log(`Error  Queue : ${error}`);
    }
  });
};
const chunkMessahe = () => {
  loadash.chunk(orders, 500).forEach((trackingNumbers) => {
    //console.log(trackingNumbers);
    sendMessage(trackingNumbers);
  });
};
chunkMessahe();
