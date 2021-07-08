const usersCtrl = {};

const { Passport } = require("passport");
const passport = require("passport");

const User = require("../models/User");
const Role = require("../models/Role");

usersCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

usersCtrl.signup = async (req, res) => {
  const errors = [];
  const { username, email, password, confirm_password, roles } = req.body;
  if (password != confirm_password) {
    errors.push({ text: " Las contraseñas no coinciden" });
  }
  if (password.length < 4) {
    errors.push({ text: "La contraseña debe contener al menos 4 caracteres." });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      username,
      email,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo ya esta en uso.");
      res.redirect("/users/signup");
    } else {
      const newUser = new User({ username, email, password, roles });
      newUser.password = await newUser.encryptPassword(password);
      if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        user.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
      }
      await newUser.save();
      console.log(newUser);
      req.flash("success_msg", "Te has registrado con éxito.");
      res.redirect("/users/signin");
    }
  }
};

usersCtrl.renderSignInForm = (req, res) => {
  res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
  successRedirect: "/becas/becas-user",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Sesión cerrada");
  res.redirect("/users/signin");
};

module.exports = usersCtrl;
