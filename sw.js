const CACHE_NAME = 'hisab-khata-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
  // অন্যান্য যে ফাইল ক্যাশ করতে চান, যেমন CSS/JS আলাদা থাকলে
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});