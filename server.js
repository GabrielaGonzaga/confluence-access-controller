// server.js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const certsPath = path.join(__dirname, 'certs');

const httpsOptions = {
  key: fs.readFileSync(path.join(certsPath, 'server.key')),
  cert: fs.readFileSync(path.join(certsPath, 'server.crt')),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3443, () => {
    console.log('> ✅ HTTPS Server ready at https://localhost:3443');
  });
});
