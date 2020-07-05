require('./config/config')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

//const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
//app.use(bodyParser.json())

//Configuración global de rutas
app.use(require('./routes/index'))


// await mongoose.connect("mongodb://localhost:27017/cafe",() => {
 mongoose.connect(
    process.env.URLDB,
   { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
   (err, res) => {
     //   useNewUrlParser: true,
     //   useUnifiedTopology: true,
     if (err) throw err;
     console.log("env", process.env.URLDB);
     console.log("Database ONLINE");
   }
 ); 


app.listen(process.env.PORT, () => {
  console.log(`escuchando puerto ${process.env.PORT}`);
});
