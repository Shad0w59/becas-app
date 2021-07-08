const {
  Schema,
  model
} = require("mongoose");

const SolicitudSchema = new Schema({
  titleBeca: {
    type: String
  },
  nombre: {
    type: String,
    required: true
  },
  tipoAlumno: {
    type: String
  },
  dni: {
    type: String
  },
  matriculado: {
    type: String
  },
  cursoAcademico: {
    type: Date
  }
}, {
  timestamps: true
});
module.exports = model("Solicitud", SolicitudSchema);