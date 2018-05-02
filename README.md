# node-fpm
Refresh is the latest

# install
```sh
npm install node-fpm
```

# base example
url:[demo_url](https://github.com/zy445566/node-fpm/tree/master/test)
```js
const path = require("path");
const Fpm = require("node-fpm");
const config = {
    http:{
        host:'0.0.0.0',
        port:'9090',
    },
    vm: {
        filename:path.join(__dirname,'trace.log'),
        timeout:3000
    }, 
};
new Fpm(config).run(path.join(__dirname,'code'));
console.log(`run in http://127.0.0.1:${config.http.port}`);
```
