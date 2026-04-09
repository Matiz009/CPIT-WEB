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

const PORT=3000;
const http = require('http');
http.createServer((req,res)=>{
    // res.writeHead(200,{'Content-Type':'text/html'});
    // res.write('<div><h1>Hello World</h1><br/><p>This is a simple Node.js server.</p></div>');
    if(req.url === '/'){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write('<div><h1>Home Page</h1><br/><p>Welcome to the home page.</p></div>');
    }
    if(req.url === '/products'){
        const products = [
            {id:1,name:'Product 1',price:10},
            {id:2,name:'Product 2',price:20},
            {id:3,name:'Product 3',price:30}
        ];
        res.writeHead(200,{'Content-Type':'application/json'});
        res.write(JSON.stringify(products));
    }     
    res.end();
}).listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});