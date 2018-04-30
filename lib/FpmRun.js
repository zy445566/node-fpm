const http = require('http');
const vm = require('vm');
const fs = require('fs');
const path = require('path');

class FpmRun {
    constructor(dir,option)
    {
        this.dir = dir;
        this.option = option;
        this.fileCache = {};
    }

    startServer(func)
    {
        http.createServer((request, response) => {
            func(request, response);
        }).listen(this.option.http.port, this.option.http.host);
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

    asyncFile()
    {
        
        this.startServer((request, response)=>{
            let filepath = this.getFilepathByRequest(request);
            let readFile = this.getPromisify(fs.readFile);
            let exists = this.getPromisify(fs.exists);
            exists(filepath).then((isExists)=>{
                if(isExists){return readFile(filepath);}
            }).then((buffer)=>{
                vm.runInThisContext(buffer.toString(),this.option.vm)(request,response);
            }).catch((err)=>{
                throw err;
            })
        });  
        
    }

    syncFile()
    {
        this.startServer((request, response)=>{
            let filepath = this.getFilepathByRequest(request);
            let buffer = fs.readFileSync(filepath,this.option.fs);
            vm.runInThisContext(buffer.toString(),this.option.vm)(request,response);
        });
    }
}
module.exports = FpmRun;