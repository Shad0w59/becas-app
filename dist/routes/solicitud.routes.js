const {
  Router
} = require("express");

const {
  renderBecas3
} = require("../controllers/becas.controller");

const router = Router();

const {
  renderSolicitudForm,
  renderSolicitud2,
  renderSolicitud,
  createNewSolicitud
} = require("../controllers/solicitud.controller");

const {
  isAuthenticated
} = require("../helpers/auth"); //Nueva Solicitud


router.get("/solicitud/add/:id", isAuthenticated, renderSolicitudForm, renderBecas3);
router.post("/solicitud/new-solicitud", isAuthenticated, createNewSolicitud); //Obtener todas las Solicitudes

router.get("/solicitud/solicitud", isAuthenticated, renderSolicitud); //Obtener Solicitud por Id

router.get("/solicitud/get-solicitud/:id", renderSolicitud2);
module.exports = router;