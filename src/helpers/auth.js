const helpers = {};
const Role = require("../models/Role");
const User = require("../models/User");

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Usuario no autorizado");
  res.redirect("/users/signin");
};
helpers.isModerator = async function (req, res, next) {
  const user = await User.findById(req.user._id);
  console.log(user);
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "moderator") {
      next();
      return;
    }
  }
  req.flash(
    "error_msg",
    "El usuario no tiene permitido acceder a esta sección"
  );
  res.redirect("/becas/becas-user");
};
helpers.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "admin") {
      next();
      return;
    }
  }
  req.flash(
    "error_msg",
    "El usuario no tiene permitido acceder a esta sección"
  );
  res.redirect("/becas/becas-user");
};
helpers.isAdminMod = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  const roles = await Role.find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "admin" || roles[i].name == "moderator") {
      next();
      return;
    }
  }
  req.flash(
    "error_msg",
    "El usuario no tiene permitido acceder a esta sección"
  );
  res.redirect("/becas/becas-user");
};
module.exports = helpers;
