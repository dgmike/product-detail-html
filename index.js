const http = require('http');
const fs = require('fs');

const PORT = 3000;

index = fs.readFileSync('src/index.html');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(index);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

