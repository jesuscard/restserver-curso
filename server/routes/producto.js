const express = require("express");

const { verificaToken } = require("../middlewares/authentication");

const Producto = require("../models/producto");

const app = express();


//=============
//Mostrar todos los productos
//========
app.get('/producto', verificaToken,(req,res)=>{
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
      .skip(desde)
      .limit(limite)
      .sort("descripcion")
      .populate("usuario", "nombre email")
      .populate("categoria", "descripcion")
      .exec((err, productos) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }
        Producto.count({ disponible: true }, (err, conteo) => {
            res.json({
            ok: true,
            productos,
            cuantos: conteo,
            });
        });
      });
})

//=======================
//Mostrar un producto
//=======================
app.get('/producto/:id', verificaToken,(req,res)=>{
    let id = req.params.id;
    Producto.findById(id)
      .populate("usuario", "nombre email")
      .populate("categoria", "descripcion")
      .exec((err, productoDB) =>{
             if (err) {
               return res.status(500).json({
                 ok: false,
                 err,
               });
             }
      if (!productoDB) {
               return res.status(400).json({
                 ok: false,
                 err: {
                     message: 'El Id no existe'
                 }
               });
             }
        res.json({
          ok: true,
          producto: productoDB,
        });
      });
});
//=========================
//Buscar un producto
//=========================

app.get('/producto/buscar/:termino', verificaToken,(req,res)=>{
  let termino = req.params.termino;
  let regex = new RegExp(termino,'i');
  Producto.find({ nombre: regex })
    .populate("categoria", "descripcion")
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
        
      }
      res.status(201).json({
        ok: true,
        producto: productoDB,
      });
    });
})

//=========================
//Crear un nuevo producto
//=========================
app.post('/producto',verificaToken,(req,res)=>{
  let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id,
    })
    producto.save((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err,
        });
      }
      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.status(201).json({
        ok: true,
        producto: productoDB,
      });
    });
})

//=============
//Actualizar un producto
//========
app.put("/product/:id", verificaToken , (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let productModif ={
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    categoria: body.categoria,
  }

  Producto.findByIdAndUpdate(
    id,
    productModif,
    { new: true, runValidators: true },
    (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
      if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

      res.json({
        ok: true,
        producto: productoDB,
      });
    }
  );
});


//======================
//Eliminar un producto
//======================
app.delete("/producto/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let estadoNew = {
    disponible: false,
  };
  Producto.findById(id,(err,productoDB)=>{
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }
        if (!productoDB) {
          return res.status(400).json({
            ok: false,
            err: {
              message: "El id no existe",
            },
          });
        }
        productoDB.disponible = false;
        productoDB.save((err, productoBorrado)=>{
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }
            res.json({
              ok: true,
              producto: productoBorrado,
              message: "Producto Borrado"
            });
        })
  })
});

module.exports = app;