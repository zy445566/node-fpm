const _ = require('lodash');
const FpmRun = require('./FpmRun');
class Fpm {
    constructor(option = {})
    {
        this.option = _.defaults(option, {
            http:{
                host:'0.0.0.0',
                port:'9090',
            },
            vm: {},
            fs:{},
            fpm:{
                mode:'async', //sync
            }
        });
    }

    run(dir)
    {
        let fpmRun = new FpmRun(dir,this.option);
        switch (this.option.fpm.mode)
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