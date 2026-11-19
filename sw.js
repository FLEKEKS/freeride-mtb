const CACHE_NAME = "freeride-mtb-v51-final-assets";
const ASSETS = ["./", "./index.html", "./manifest.json", "./freeride_bike.png", "./freeride_chassis.png", "./frame_trail.png", "./frame_hardtail.png", "./frame_light.png", "./frame_aggressive.png", "./frames/light.png", "./frames/hardtail.png", "./frames/trail.png", "./frames/frame_trail.png", "./frames/frame_hardtail.png", "./frames/aggressive.png", "./frames/frame_light.png", "./frames/frame_aggressive.png", "./parts/brake_shimano.png", "./parts/saddle_ergon.png", "./parts/fork_boxxer.png", "./parts/stem_burgtec.png", "./parts/shock_air.png", "./parts/wheel_29.png", "./parts/stem_raceface.png", "./parts/shock_ohlins.png", "./parts/stem_deity.png", "./parts/pedal_dh.png", "./parts/shock_coil.png", "./parts/bar_freeride.png", "./parts/saddle_wtb.png", "./parts/fork_fox40.png", "./parts/wheel_275.png", "./parts/bar_raceface.png", "./parts/fork_ohlins.png", "./parts/pedal_light.png", "./parts/saddle_sdg.png", "./parts/pedal_alloy.png", "./parts/bar_renthal.png", "./parts/brake_magura.png", "./parts/wheel_26.png", "./parts/brake_sram.png"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    if (response.ok && new URL(event.request.url).origin === self.location.origin) caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  })));
});
