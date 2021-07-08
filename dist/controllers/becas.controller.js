const becasCtrl = {};

const Beca = require("../models/Beca");

becasCtrl.renderBecaForm = (req, res) => {
  res.render("becas/new-beca");
};

becasCtrl.renderBecas3 = async (req, res) => {
  const beca = await Beca.findById(req.params.id);
  console.log(beca);
  res.render("becas/get-beca", {
    beca
  });
};

becasCtrl.createNewBeca = async (req, res) => {
  const {
    title,
    encargado,
    importe,
    estu,
    conv,
    requisitos,
    documentacion,
    fechaReso,
    ayuda,
    tipoBeca,
    description,
    estado
  } = req.body;
  const newBeca = new Beca({
    title,
    encargado,
    importe,
    estu,
    conv,
    requisitos,
    documentacion,
    fechaReso,
    ayuda,
    tipoBeca,
    description,
    estado
  });
  await newBeca.save();
  req.flash("success_msg", "Beca añadida correctamente");
  res.redirect("/becas/becas-user");
};

becasCtrl.renderBecas = async (req, res) => {
  const becas = await Beca.find();
  res.render("becas/becas-admin", {
    becas
  });
};

becasCtrl.renderBecas2 = async (req, res) => {
  const becas = await Beca.find();
  res.render("becas/becas-user", {
    becas
  });
};

becasCtrl.renderEditForm = async (req, res) => {
  const beca = await Beca.findById(req.params.id);
  console.log(beca);
  res.render("becas/edit-beca", {
    beca
  });
};

becasCtrl.updateBeca = async (req, res) => {
  const {
    title,
    encargado,
    importe,
    estu,
    conv,
    requisitos,
    documentacion,
    fechaReso,
    ayuda,
    tipoBeca,
    description
  } = req.body;
  await Beca.findByIdAndUpdate(req.params.id, {
    title,
    encargado,
    importe,
    estu,
    conv,
    requisitos,
    documentacion,
    fechaReso,
    ayuda,
    tipoBeca,
    description
  });
  req.flash("success_msg", "Beca modificada correctamente");
  res.redirect("/becas/becas-admin");
};

becasCtrl.deleteBeca = async (req, res) => {
  await Beca.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Beca eliminada correctamente");
  res.redirect("/becas/becas-admin");
};

becasCtrl.subirArchivo = (req, res) => {};

module.exports = becasCtrl;