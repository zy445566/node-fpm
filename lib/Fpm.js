const _ = require('lodash');
const path = require('path');
const FpmRun = require('./FpmRun');
class Fpm {
    constructor(config = {})
    {
        this.config = _.defaultsDeep(config, {
            http:{
                host:'0.0.0.0',
                port:'9090',
            },
            vm: {},
            fs:{},
            fpm:{
                mode:'async', //sync
                httpCode:{
                    _404:path.join(__dirname,'404.js')
                },
                logs:console
            }
        });
    }

    run(dir)
    {
        let fpmRun = new FpmRun(dir,this.config);
        switch (this.config.fpm.mode)
        {
            case 'async':
                fpmRun.asyncFile();
                break;
            case 'sync':
                fpmRun.syncFile();
                break;
            // case 'watch':
            //     fpmRun.watch();
            //     break;
            default:
                fpmRun.async();
                break;
        }
    }
}
module.exports = Fpm;