const CACHE_NAME = 'freeride-mtb-v69-live-garage';
const ASSETS = ["./","./index.html","./manifest.json","./frame_aggressive.png","./frame_trail.png","./frame_hardtail.png"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch", e => { if(e.request.method==="GET") e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request))); });
