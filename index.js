//Express là một web application framework for nodejs,
//nó cung cấp cho chúng những rất nhiều tính năng mạnh mẽ trên nền tảng web.
//Express rất dễ dàng để phát triển các ứng dụng nhanh dựa trên Node. js cho các ứng dụng Web.
//Express hỗ trợ các phương thức HTTP và middleware tạo ra 1 API rất mạnh mẽ và sử dụng dễ dàng hơn.
//Import express
var express = require("express");
const http = require("http"); //Mô-đun http sử dụng trong nodejs khi bạn cần thực hiện yêu cầu qua các giao thức.
var app = express();
const server = http.createServer(app); //Tạo mới server

const port = process.env.PORT || 3000
server.listen(port, () => {
  //Lắng nghe server
  console.log("Server đang chay tren cong 3000");
});

//Thêm socketIO
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// nhớ thêm cái cors này để tránh bị lỗi nhé

socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  socket.emit("getId", socket.id);

  //Khi client phát tín hiệu với key sendDataClient
  socket.on("sendDataClient", function(data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

//On là nhận
//Emit gửi đi