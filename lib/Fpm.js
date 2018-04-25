const _ = require('lodash');
const FpmRun = require('FpmRun');
class Fpm {
    constructor(option = {})
    {
        this.option = _.defaults(option, {
            protocol: {
                net:{
                    host:'0.0.0.0',
                    port:'8090'
                },
                http:{
                    host:'0.0.0.0',
                    port:'80',
                    h2:false,
                },
                https:{
                    host:'0.0.0.0',
                    port:'443',
                    h2:false,
                },
                dgram:{
                    host:'0.0.0.0',
                    port:'8080'
                }
            }, 
            vm: {
                
            },
            fs:{
                mode:'async', //watch
            }
        });
    }

    run(dir)
    {
        let fpmRun = new FpmRun(dir,this.option);
        switch (fs.mode)
        {
            case 'async':
                fpmRun.async();
                break;
            case 'watch':
                fpmRun.watch();
                break;
            default:
                fpmRun.async();
                break;
        }
    }
}
module.exports = Fpm;