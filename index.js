const http = require("http");
const fs = require("fs");
const url = require("url");

const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const slugs = dataObj.map((data) =>
  slugify(data.productName, {
    lower: true,
  })
);
console.log(slugs);
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log(url.parse(req.url, true));

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);
  }
  // TODO:
  else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "Page not Found",
    });
    res.end("Page not Found");
  }
});

server.listen(8000, () => {
  console.log("listening to port 8000");
});
