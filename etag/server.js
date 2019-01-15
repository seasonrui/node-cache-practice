let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
const md5 = require('md5');

http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url, true);
  let filepath = path.join(__dirname, pathname);
  console.log(filepath);
  fs.stat(filepath, (err, stat) => {
    if (err) {
      return sendError(req, res);
    } else {
      send(req, res, filepath);

    }
  });
}).listen(3000);
function sendError(req, res) {
  res.end('Not Found');
}
function send(req, res, filepath) {
  let cont = fs.readFileSync(filepath);
  let etag = md5(cont);

  res.setHeader('Content-Type', mime.getType(filepath));
  res.setHeader('Cache-Control', 'no-cache');

  if (req.headers['if-none-match'] === etag) {
    res.statusCode = 304;
    res.end();
  }
  else {
    res.setHeader('Etag', etag)
    res.end(cont);
  }
}
