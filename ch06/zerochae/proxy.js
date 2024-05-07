const net = require("net");
const PROXY_PORT = 7070;
const SERVER_PORT = 8080;

const server = net.createServer((clientSocket) => {
  console.log("proxy connected");

  const serverSocket = net.createConnection({ port: SERVER_PORT });

  clientSocket.pipe(serverSocket);
  serverSocket.pipe(clientSocket);
});

server.listen(PROXY_PORT, () => {
  console.log("proxy server listening on port 7070");
});
