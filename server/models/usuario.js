const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol váido'
};

let Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El Nombre es obligatorio"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  img: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.plugin(uniqueValidator, {
  message: "{PATH} debe ser unico.",
});


usuarioSchema.methods.toJSON = function(){
    let user =  this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
}


module.exports = mongoose.model("Usuario", usuarioSchema);