const { Router } = require("express");
const router = Router();

const {
  renderBecaForm,
  renderBecas2,
  renderBecas3,
  createNewBeca,
  renderBecas,
  renderEditForm,
  updateBeca,
  deleteBeca,
} = require("../controllers/becas.controller");
const { createNewSolicitud } = require("../controllers/solicitud.controller");

const {
  isAuthenticated,
  isModerator,
  isAdmin,
  isAdminMod,
} = require("../helpers/auth");

//Nueva Beca
router.get("/becas/add", [isAuthenticated, isAdminMod], renderBecaForm);

router.post("/becas/new-beca", isAuthenticated, createNewBeca);

//Obtener todas las Becas
router.get("/becas/becas-admin", [isAuthenticated, isAdmin], renderBecas);

router.get("/becas/becas-user", renderBecas2);

//Obtener Beca por Id

router.get("/becas/get-beca/:id", renderBecas3, createNewSolicitud);

// Editar Becas
router.get("/becas/edit/:id", [isAuthenticated, isAdmin], renderEditForm);

router.put("/becas/edit-beca/:id", isAuthenticated, updateBeca);

// Eliminar Becas
router.delete("/becas/delete/:id", [isAuthenticated, isAdmin], deleteBeca);

module.exports = router;
