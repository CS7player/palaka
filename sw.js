const CACHE_NAME = "palaka-offline";

const FILES = [
 "./",
 "./index.html",
 "./style.css",
 "./script.js",
 "./dark.png",
 "./light.png",
 "./logo.png",
 "./icon.png"
];

// Install
self.addEventListener("install", event => {
 event.waitUntil(
  caches.open(CACHE_NAME)
   .then(cache => cache.addAll(FILES))
 );
});

// Activate
self.addEventListener("activate", event => {
 event.waitUntil(self.clients.claim());
});

// Fetch
self.addEventListener("fetch", event => {
 event.respondWith(
  caches.match(event.request).then(cached => {
   if (cached) {
    return cached;
   }

   return fetch(event.request).then(response => {
    const copy = response.clone();

    caches.open(CACHE_NAME).then(cache => {
     cache.put(event.request, copy);
    });

    return response;
   });
  })
 );
});