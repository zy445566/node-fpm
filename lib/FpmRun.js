const net = require('net');
const http = require('http');
const https = require('https');
// const http2 = require('http2');
const dgram = require('dgram');
const vm = require('vm');
const fs = require('fs');
const util = require('util');
const path = require('path');

class FpmRun {
    constructor(dir,option)
    {
        this.dir = dir;
        this.option = option;
        this.fileCache = {};
    }

    async()
    {
        
        http.createServer((request, response) => {
            let filename = request.url;
            if (filename=='/'){filename='/index.js';}
            const readFile = util.promisify(fs.readFile);
            let filepath = path.join(this.dir,filename);
            // console.log(filepath)
            readFile(filepath).then((buffer)=>{
                vm.runInThisContext(buffer.toString(),this.option.vm)(request,response);
            }).catch((err)=>{
                throw err;
            })
            
        }).listen(this.option.protocol.http.port, this.option.protocol.http.host);
    }

    watch()
    {

    }
}
module.exports = FpmRun;