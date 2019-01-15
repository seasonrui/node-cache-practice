let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');

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
  res.setHeader('Content-Type', mime.getType(filepath));
  res.setHeader('Cache-Control', 'no-cache');
  res.end(cont);
}
