export default function createWebSocketPlugin(socket) {
  return store => {
    socket.on('data', data => {
      store.commit('receiveData', data);
    });
    store.subscribe(mutation => {
      if(mutation.type === 'addData') {
        socket.emit('add', mutation.payload);
      } else if(mutation.type === 'updateData') {
        socket.emit('update', mutation.payload);
      } else if(mutation.type === 'removeData') {
        socket.emit('remove', mutation.payload);
      } 
    });
  };
}