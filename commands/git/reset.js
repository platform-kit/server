
require('dotenv').config()
const fse = require("fs-extra");
var path = "app";

fse.remove(path).then(function() {});