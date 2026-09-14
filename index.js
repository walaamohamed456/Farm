const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(
  `${__dirname}/FINAL/template-overview.html`,
  'utf-8',
);
const tempCard = fs.readFileSync(
  `${__dirname}/FINAL/template-card.html`,
  'utf-8',
);
const tempProudct = fs.readFileSync(
  `${__dirname}/FINAL/template-product.html`,
  'utf-8',
);

const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
    res.end(output);
  }

  //Product Page
  else if (pathname === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProudct, product);
    res.end(output);
  }

  //API
  else if (pathname === '/api') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404);
    res.end('Page not found');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
});

//////////////////////////
// files
//blocking, synchronous way
// const textin = fs.readFileSync('./input.txt', 'utf-8')
// console.log(textin)
// const textOut = `this is the witing file: ${textin}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./output.txt', textOut)
// console.log('file written')

// non blocking asynchrous way

// fs.readFile('./start.txt', 'utf-8', (err, data1) => {

//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log("data1 =", data1);

//     fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2) => {

//         if (err) {
//             console.log(err);
//             return;
//         }

//         console.log("data2 =", data2);
//     });
// });

// console.log('will read file!');

// fs.readFile('./start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log("ERROR")
//     fs.readFile(`./${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//         fs.readFile('./output.txt', 'utf-8', (err, data3) => {
//             console.log(data3)

//             fs.writeFile('./final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log("ur file has been written")
//             })
//         })
//     })
// })
// console.log('will read file!')
