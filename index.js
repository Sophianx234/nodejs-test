
const http = require('http')
const path = require('path')
const fs = require('fs')


const replaceTemplate =(temp,product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
          output = output.replace(/{%DESCRIPTION%}/g,product.description)
          output = output.replace(/{%IMAGE%}/g,product.image)
          output = output.replace(/{%QUANTITY%}/g,product.price)
          output = output.replace(/{%FROM%}/g,product.from)
          output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
          output = output.replace(/{%ORGANIC%}/g,product.nutrients)
          return output
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
const dataObj = JSON.parse(data)
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempProducts = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

const server = http.createServer((req,res)=>{
    const pathName = req.url

    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200,{
            'content-type': 'text/html'
        })
        const cardsHtml = dataObj.map(el=>replaceTemplate(tempCard,el)).join('')
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g,cardsHtml)
        res.end(output)
    
}
    else if(pathName === '/api'){
        res.writeHead(200,{
            'content-type': 'application/json'
    })
            res.end(data)
}
    else{
        res.writeHead(404,{
            'content-type': 'text/html',
            'my-own-header': 'Page not Found'
        })
        res.end('Page not Found')
}

}
)

server.listen(8000,()=>{
    console.log('listening to port 8000')
})