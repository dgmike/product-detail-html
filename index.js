const http = require('http');
const fs = require('fs');
const HttpDispatcher = require('httpdispatcher');

const PORT = 3000;
const dispatcher = new HttpDispatcher;

const index = fs.readFileSync('src/index.html');

dispatcher.setStatic('/public');
dispatcher.setStaticDirname('public');

dispatcher.onGet('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(index);
  res.end();
});

const server = http.createServer((req, res) => {
  try {
    console.log(req.url);
    dispatcher.dispatch(req, res);
  } catch(err) {
    console.log(err);
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

