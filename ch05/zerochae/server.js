const net = require("net");

const port = process.argv[2] || 8080;

const server = net.createServer((socket) => {
  console.log(`<<<Type-O-Serve Accepting on Port ${port}>>>`);

  socket.on("data", (data) => {
    console.log(`<<<Request From '${socket.remoteAddress}'>>>`);
    console.log(data.toString());
    console.log(`<<<Type Response Followed by "." >>>`);

    process.stdin.on("data", (response) => {
      if (socket.destroyed) {
        return;
      }

      socket.write(response);

      if (response.toString().trim() === "end") {
        socket.end();
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
