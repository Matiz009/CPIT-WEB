// // const length = 1000;
// // function calculateArea(length){
// //     return Math.PI* length * length;
// // }

// // console.log(Math.round(calculateArea(length)));


// // os module

// const os = require('os');
// console.log(os.platform());
// console.log(os.arch());
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(os.cpus());

// console.log(os.homedir());

// console.log(os.machine());


// path module

// const path = require('path');

// console.log(path.dirname('C:/Users/HP/Desktop/node/index.js'));
// console.log(path.extname('C:/Users/HP/Desktop/node/index.js'));
// console.log(path.basename('C:/Users/HP/Desktop/node/index.js'));
// console.log(path.parse('C:/Users/HP/Desktop/node/index.js'));


// // fs module

// const fs = require('fs');
// fs.readFile('index.js','utf-8',(error,res)=>{
//     if(error){
//         console.log(error.message);
//     }else{
//         console.log(res);
//     }
// })

// // http module

const PORT = 3000;
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {

    if(req.url === '/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end('<div><h1>Home Page</h1><p>Welcome to the home page.</p></div>');
    } 
    else if(req.url === '/products'){
        const products = [
            {id:1,name:'Product 1',price:10},
            {id:2,name:'Product 2',price:20},
            {id:3,name:'Product 3',price:30}
        ];
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(products));
    } 
    else if(req.url === '/users'){
        fs.readFile('users.json', (error, data) => {
            if(error){
                res.writeHead(500,{'Content-Type':'application/json'});
                res.end(JSON.stringify({error: 'Failed to read users file'}));
            } else {
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(data);
            }
        });
    } 
    else {
        res.writeHead(404, {'Content-Type':'text/plain'});
        res.end('404 Not Found');
    }

}).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});