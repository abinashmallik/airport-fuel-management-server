"use strict";

module.exports = app => {
  require("./users")(app);
  require("./products")(app);
  require("./airports")(app);
  require("./aircrafts")(app);
  require("./transactions")(app);
};
