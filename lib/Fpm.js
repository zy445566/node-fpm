const _ = require('lodash');
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
        
    }
}
module.exports = Fpm;