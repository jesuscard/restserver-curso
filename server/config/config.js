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
    urlDB = 'mongodb+srv://jesuscard:AwNgHr6OceUPEVni@cluster0-jwbbu.mongodb.net/cafe'     
}

process.env.URLDB = urlDB;