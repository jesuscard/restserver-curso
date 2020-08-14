
const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verifica_Role }  = require("../middlewares/authentication");
const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());


app.get("/usuario", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true }, "nombre email role estado")
    .skip(desde)
    .limit(limite)
    .exec((err, usuario) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      Usuario.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuario,
          cuantos: conteo,
        });
      });
    });
});

app.post("/usuario", [verificaToken, verifica_Role], (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuari: usuarioDB,
    });
  });
});

app.put("/usuario/:id", [verificaToken, verifica_Role], (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});

app.delete("/usuario/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  let estadoNew = {
    estado: false,
  };

  Usuario.findByIdAndUpdate(id, estadoNew, { new: true }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

module.exports = app;