module.exports = (io) => {
    io.on("connection", (socket) => {
      console.log("A user connected");
  
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
  
      // مستمعي الأحداث الأخرى
      socket.on("message", (data) => {
        console.log("Message received:", data);
        // معالجة الرسالة
      });
  
      // يمكنك إضافة المزيد من الأحداث هنا
    });
  };
  