module.exports = (io) => {
  const roomNs = io.of('/room');
  roomNs.on('connection', (socket) => {
    socket.on('join', ({ roomId, user }) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-joined', { user });
    });

    socket.on('draw', (payload) => {
      // payload: { room, data }
      if (payload && payload.room) {
        socket.to(payload.room).emit('draw', payload.data);
      }
    });

    socket.on('chat', (payload) => {
      if (payload && payload.room) {
        socket.to(payload.room).emit('chat', payload.message);
      }
    });

    socket.on('disconnecting', () => {
      // optionally notify rooms
    });
  });
};
