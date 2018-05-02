const http = require('http');
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
class FpmRun {
    constructor(dir,config)
    {
        this.dir = dir;
        this.config = config;
        this.config.fpm.dir = this.dir;
    }

    startServer(func)
    {
        http.createServer((request, response) => {
            func(request, response);
        }).listen(this.config.http.port, this.config.http.host);
    }

    getFilepathByRequest(request)
    {
        let filename = request.url;
        if (filename=='/'){filename='/index.js';}
        let filepath = path.join(this.dir,filename);
        return filepath;
    }

    getPromisify(asyncFunc)
    {
        return (...args)=>{
            return new Promise((reslove,reject)=>{
                asyncFunc(...args,(err,res)=>{
                    if(err){
                        if(err instanceof Error)
                        {
                            return reject(err)
                        } else {
                            return reslove(err);
                        }  
                    }
                    return reslove(res);
                })
            });
        };
    }

    runContext(code,request,response)
    {
        vm.runInNewContext(code,_.extend({
            require:require,
            config:this.config
        },global),this.config.vm)(request,response);
    }


    asyncFile()
    {
        
        this.startServer((request, response)=>{
            let filepath = this.getFilepathByRequest(request);
            let readFile = this.getPromisify(fs.readFile);
            let exists = this.getPromisify(fs.exists);
            exists(filepath).then((isExists)=>{
                if(!isExists){filepath = this.config.fpm.httpCode._404;}
                return readFile(filepath);
            }).then((buffer)=>{
                    this.runContext(buffer.toString(),request,response);
            }).catch((err)=>{
                this.config.fpm.logs.error(err);
            })
        });  
        
    }

    syncFile()
    {
        this.startServer((request, response)=>{
            try{
                let filepath = this.getFilepathByRequest(request);
                let isExists = fs.existsSync(filepath);
                if(!isExists){filepath = this.config.fpm.httpCode._404;}
                let buffer = fs.readFileSync(filepath,this.config.fs);
                this.runContext(buffer.toString(),request,response);
            } catch(err)
            {
                this.config.fpm.logs.error(err);
            }
        });
    }
}
module.exports = FpmRun;