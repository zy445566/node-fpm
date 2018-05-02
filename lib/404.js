((req,res)=>{
    res.writeHead(404, {'Content-Type': 'text/html'});    
    res.write('<h1 style="text-align:center">404</h1>');        
    res.end();
})