const https = require("https");
const fs = require("fs");

// SSL 인증서 로드
const options = {
  key: fs.readFileSync("./ch14/ssl.key"),
  cert: fs.readFileSync("./ch14/ssl.cert"),
};

// HTTPS 서버 생성
https
  .createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello, HTTPS!\n");
  })
  .listen(443, () => {
    console.log("HTTPS server running on port 443");
  });
