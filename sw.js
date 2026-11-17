const CACHE = "freeride-mtb-dirt-arena-v13";
const CORE = ["./", "./index.html", "./manifest.json"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("freeride-mtb-") && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => {
  const req = event.request; if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    event.respondWith(fetch(new Request(req, { cache: "no-store" })).then(res => { const copy=res.clone(); caches.open(CACHE).then(c=>c.put("./index.html",copy)); return res; }).catch(() => caches.open(CACHE).then(c=>c.match("./index.html"))));
    return;
  }
  event.respondWith(caches.open(CACHE).then(async cache => { const hit=await cache.match(req); if(hit) return hit; const res=await fetch(req); if(res.ok) cache.put(req,res.clone()); return res; }).catch(() => caches.match(req)));
});
