const CACHE_NAME = "emoji-rpg-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js"
];

// ติดตั้ง + cache ไฟล์
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// เปิดใช้งาน + ล้าง cache เก่า
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ดัก request
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});