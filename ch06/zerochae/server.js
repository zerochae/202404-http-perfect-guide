const net = require("net");
const SERVER_PORT = 8080;

const server = net.createServer((socket) => {
  console.log("server connected");

  socket.on("data", (data) => {
    console.log(data.toString())
    socket.write("server get request")
  });

  socket.on("end", () => {
    console.log("proxy disconnected");
  });
});

server.listen(SERVER_PORT, () => {
  console.log("server listening on port 8080");
});
