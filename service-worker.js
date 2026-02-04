// UPDATED CACHE VERSION
const CACHE_NAME = 'physics-ultra-v1';

const ASSETS = [
    './',
    './index.html',
    './manifest.json'
    // The browser will automatically cache the icon links from index.html
];

// Install Event
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('SW: Caching Assets');
                return cache.addAll(ASSETS);
            })
    );
});

// Activate Event (Cleans up old caches like 'physics-hub-v1')
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('SW: Clearing Old Cache', key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch Event (Offline Capability)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
