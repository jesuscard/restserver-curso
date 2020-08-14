
const express = require("express");

const { verificaToken, verifica_Role }  = require("../middlewares/authentication");
const _ = require("underscore");
const Categoria = require("../models/categoria");
const app = express();

//=============
//Mostrar todas las categorias
//========
app.get('/categoria',(req,res)=>{

    Categoria.find({ estado: true }, '_id descripcion usuario')
      .sort('descripcion')
      .populate('usuario', 'nombre email')
      .exec(
      (err, categorias) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          categorias,
        });
      }
    );

})

//=======================
//Mostrar categoria by ID
//=======================
app.get('/categoria/:id',(req,res)=>{
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) =>{
             if (err) {
               return res.status(500).json({
                 ok: false,
                 err,
               });
             }
             if (!categoriaDB) {
               return res.status(400).json({
                 ok: false,
                 err: {
                     message: 'El Id no es correcto'
                 }
               });
             }
        res.json({
          ok: true,
          categoria: categoriaDB,
        });
      });
});

//=========================
//Crear una nueva categoría
//=========================
app.post('/categoria',[verificaToken],(req,res)=>{
    //usuario = req.usuario._id
    let body = req.body;
           let categoria = new Categoria({
             descripcion: body.descripcion,
             usuario: req.usuario._id,
           });

           categoria.save((err, categoriaDB) => {
             if (err) {
               return res.status(500).json({
                 ok: false,
                 err,
               });
             }
             if (!categoriaDB) {
               return res.status(400).json({
                 ok: false,
                 err,
               });
             }

             res.json({
               ok: true,
               categoria: categoriaDB,
             });
           });
})

//=============
//Actualizar una nueva categoría
//========
app.put("/categoria/:id", verificaToken , (req, res) => {
  let id = req.params.id;
  let body = req.body;

  let descCategoria ={
      descripcion: body.descripcion
  }

  Categoria.findByIdAndUpdate(
    id,
    descCategoria,
    { new: true, runValidators: true },
    (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

      res.json({
        ok: true,
        categoria: categoriaDB,
      });
    }
  );
});


//======================
//Eliminar una categoría
//======================
app.delete("/categoria/:id", [verificaToken,verifica_Role], (req, res) => {
  let id = req.params.id;
  let estadoNew = {
    estado: false,
  };

  Categoria.findByIdAndRemove(id,(err, categoriaDB)=>{
              if (err) {
                return res.status(500).json({
                  ok: false,
                  err,
                });
              }
              if (!categoriaDB) {
                return res.status(400).json({
                  ok: false,
                  err: {
                      message: 'El id no existe'
                  }
                });
              }
                  res.json({
                    ok: true,
                    message: 'Categoria Borrada',
                  });
  })
});




module.exports = app;