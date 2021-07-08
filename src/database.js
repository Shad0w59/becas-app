const mongoose = require("mongoose");

const { BECAS_APP_MONGODB_HOST, BECAS_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI =
  "mongodb://" + BECAS_APP_MONGODB_HOST + "/" + BECAS_APP_MONGODB_DATABASE;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => console.log(err));
