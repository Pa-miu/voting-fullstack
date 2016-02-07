import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8099);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.geState().toJS());
    socket.on('action', store.dispatch.bind(store));
  });
}
