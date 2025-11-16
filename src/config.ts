// Central place for runtime configuration values.
// Update here to change the Worker URL used by the app.
export const WORKER_URL = 'http://localhost:8787/';
export const WEBSOCKET_URL = 'ws://127.0.0.1:8787/';
// export const WORKER_URL = 'https://websocket-worker.loumarv.workers.dev/';
// export const WEBSOCKET_URL = 'wss://websocket-worker.loumarv.workers.dev/';
export default {
  WORKER_URL,
  WEBSOCKET_URL
}
