const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.inventory = require("./inventory.model.js");

module.exports = db;
