const solicitudCtrl = {};

const Solicitud = require("../models/Solicitud");
const Beca = require("../models/Beca");

solicitudCtrl.renderSolicitudForm = async (req, res) => {
  const beca = await Beca.findById(req.params.id);
  res.render("solicitud/new-solicitud", { beca });
};

solicitudCtrl.renderSolicitud2 = async (req, res) => {
  const solicitud = await Solicitud.findById(req.params.id);
  console.log(solicitud);
  res.render("solicitud/get-solicitud", { solicitud });
};

solicitudCtrl.createNewSolicitud = async (req, res) => {
  const {titleBeca, nombre, tipoAlumno, dni, matriculado, cursoAcademico } = req.body;

  const newSolicitud = new Solicitud({
    titleBeca,
    nombre,
    tipoAlumno,
    dni,
    matriculado,
    cursoAcademico,
  });
  await newSolicitud.save();
  req.flash("success_msg", "Solicitud registrada correctamente");
  res.redirect("/solicitud/solicitud");
};

solicitudCtrl.renderSolicitud = async (req, res) => {
  const solicitud = await Solicitud.find();
  res.render("solicitud/solicitud", { solicitud });
};

module.exports = solicitudCtrl;
