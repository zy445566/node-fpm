const path = require("path");
const Fpm = require("../lib/Fpm");
new Fpm().run(path.join(__dirname,'code'));