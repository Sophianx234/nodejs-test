const fs = require('fs')
const http = require('http');
const url = require('url');


/*
const textIn = fs.readFileSync('./txt/input.txt','utf-8')

console.log(textIn)

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/output.txt',textOut)
console.log('file Written')
 */

//Non-blocking, asynchronous
/* 
fs.readFile('./txt/start.txt','utf-8',(err,data1)=>{
    
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
    console.log(data2)
    fs.readFile(`./txt/append.txt`,'utf-8',(err,data3)=>{
    console.log(data3)
    fs.writeFile('./txt/final.txt', `${data2}\n ${data3}`,'utf-8',err=>{
         console.log('Your file has been written')
    })
    })
    })
    
})

console.log('Will read file!') */


// Server
const data  = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8',)
const dataObj = JSON.parse(data)

const server =http.createServer((req, res)=>{
    const pathName = req.url
    if(pathName === '/' || pathName=== '/overview')
        {

            res.end('This is the Overview')
        } 
    else if(pathName === '/product'){

        res.end('This is the Product ')
    }
    else if(pathName === '/api'){
        res.end(data)
        
    }
    else {
        res.end('Page not Found!')
    }
    
}) 

server.listen(8000,'127.0.0.1',()=>{
    console.log('listening to request from port 800');
})
