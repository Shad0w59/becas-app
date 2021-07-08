const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const multer = require("multer");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//inicializacion
const app = express();
require("./config/initialSetup");
require("./config/passport");

//Configuracion
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../src/public/uploads/"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
app.use(
  multer({
    storage,
  }).array("file")
);

//Variables Globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//Routes

app.use(require("./routes/index.routes"));
app.use(require("./routes/becas.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/solicitud.routes"));
//Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
