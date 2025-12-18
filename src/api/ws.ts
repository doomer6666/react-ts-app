type WSMessage = { type: string; payload?: any };

const WS_URL = "ws://localhost:8000/ws"

let socket: WebSocket | null = null;
const handler = new Set<(msg: WSMessage) => void>();

function connect() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return;

  socket = new WebSocket(WS_URL);

  socket.addEventListener('open', () => {
    console.info('[ws] connected');
  });

  socket.addEventListener('message', (ev) => {
    try {
      const data = JSON.parse(ev.data);
      handler.forEach((cb) => cb(data));
    } catch (err) {
      console.warn('[ws] failed to parse message', err);
    }
  });

  socket.addEventListener('close', () => {
    console.info(`[ws] closed, reconnecting`);
    setTimeout(connect, 1000);
  });

  socket.addEventListener('error', (e) => {
    console.error('[ws] error', e);
    socket?.close();
  });
}

export function initWebsocket() {
  console.info('[ws] initWebsocket called');
  connect();
}

export function handleMessage(cb: (msg: WSMessage) => void) {
  handler.add(cb);
  return () => handler.delete(cb);
}

export default {
  initWebsocket,
  handleMessage
};
