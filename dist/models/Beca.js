const {
  Schema,
  model
} = require("mongoose");

const BecaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  encargado: {
    type: String
  },
  requisitos: {
    type: String
  },
  documentacion: {
    type: String
  },
  fechaReso: {
    type: Date
  },
  importe: {
    type: String,
    required: true
  },
  estu: {
    type: String,
    required: true
  },
  conv: {
    type: String,
    required: true
  },
  ayuda: {
    type: String,
    required: true
  },
  tipoBeca: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
module.exports = model("Beca", BecaSchema);