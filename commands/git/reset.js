
require('dotenv-flow').config()
const fse = require("fs-extra");
var path = "app";

fse.remove(path).then(function() {});