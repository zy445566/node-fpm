const path = require("path");
const Fpm = require("../index");
const config = {
    http:{
        host:'0.0.0.0',
        port:'9090',
    },
    vm: {
        filename:'trace.log',
        timeout:3000
    },
    fs:{
        encoding:'utf8'
    },
    fpm:{
        mode:'async', //sync
    }    
};
new Fpm(config).run(path.join(__dirname,'code'));
console.log(`run in http://127.0.0.1:${config.http.port}`);
