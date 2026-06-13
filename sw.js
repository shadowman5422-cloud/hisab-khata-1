const CACHE_NAME = 'hisab-khata-v5'; // আগের ভার্সন থেকে বাড়ান (v4 → v5)
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // ইনস্টল শেষে সাথে সাথে activate হবে
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clientsClaim(); // এখন সব ক্লায়েন্ট এই SW ব্যবহার করবে
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});