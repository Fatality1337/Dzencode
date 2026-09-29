import type { Server } from 'socket.io';
import { eventBus } from '../events/eventBus.js';
export function attachSessionManager(io: Server) {
  let sessions = 0;
  io.on('connection', (socket) => {
    sessions += 1;
    io.emit('sessions:changed', { count: sessions });
    socket.on('disconnect', () => {
      sessions = Math.max(0, sessions - 1);
      io.emit('sessions:changed', { count: sessions });
    });
  });
  const events = [
    'ORDER_CREATED',
    'ORDER_DELETED',
    'PRODUCT_CREATED',
    'PRODUCT_DELETED',
    'GROUP_CREATED',
    'GROUP_DELETED',
    'USER_CREATED',
    'USER_DELETED',
  ] as const;
  const cleanups = events.map((event) => eventBus.on(event, (payload) => io.emit('data:changed', { event, payload })));
  return () => {
    cleanups.forEach((cleanup) => cleanup());
    io.removeAllListeners('connection');
  };
}
