// console.log(require,config);
((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});    
    res.write("Home!");
    res.end();
})