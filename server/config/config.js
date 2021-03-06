//=============
//puerto
//=============

process.env.PORT = process.env.PORT || 3000;


//=============
//entorno
//=============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=============
//Base de datos
//=============

let urlDB;
if(process.env.NODE_ENV === 'dev') {
   urlDB =  'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;

//=============
//Vencimiento del token
//=============
//60 segundos
//60 minutos
//24 horas
//30 días
process.env.CADUCIDAD_TOKEN = '48h';

//=============
//SEED de autenticación
//=============

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//=============
//Google ClientID
//=============
process.env.CLIENT_ID = process.env.CLIENT_ID ||"725143700715-9ar430a9r3hcsk3blinurhssl1j0dc5s.apps.googleusercontent.com";

