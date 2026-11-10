// FamilyFi Lite works online only: no offline copy is kept on the phone.
// This worker exists so Android lets users "Add to Home screen" / install the app.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => new Response(
      '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui;background:#0f5f55;color:#fff;display:grid;place-items:center;height:100vh;margin:0;text-align:center;padding:20px"><div><div style="font-size:48px">📶</div><h2>No internet</h2><p>FamilyFi Lite needs the internet — your data lives in your Google Drive.</p><button onclick="location.reload()" style="padding:12px 22px;border:0;border-radius:12px;font-size:16px;font-weight:700;color:#0f5f55">Try again</button></div></body>',
      {headers: {'Content-Type': 'text/html; charset=utf-8'}})));
  }
});
