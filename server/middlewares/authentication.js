const jwt = require("jsonwebtoken");


//==============================
//Verificar token
//==============================

let verificaToken = ( req, res, next) => {
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          err,
        });
      }

      req.usuario = decoded.usuario;
      next();
    });
    

};

//===================
// Verifica AdminRole
//===================
let verifica_Role = (req,res,next) =>{
    let usuario = req.usuario

    if (usuario.role == "ADMIN_ROLE"){
        next();
    }
    else{
      return res.json({
        ok: false,
        err: {
          message: "El Usuario no es adminstrador",
        },
      });
    }
  
}

//===================
// Verifica Token para imagen
//===================
let verificaTokenImg = (req, res, next) => {
  let token = req.query.token
  console.log(token);
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err,
      });
    }

    req.usuario = decoded.usuario;
    next();

  });

}


module.exports = {
  verificaToken,
  verifica_Role,
  verificaTokenImg
};