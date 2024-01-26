const mongoUrl = process.env.URL_MONGO;
const mongoose = require("mongoose");
mongoose.connect(mongoUrl);
require("./Users");
module.exports = mongoose;
