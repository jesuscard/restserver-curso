const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const categoriaSchema = new Schema({
  descripcion: {
    type: String,
    unique: true,
    required: [true, "La descripción es obligatoria"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Categoria", categoriaSchema);
