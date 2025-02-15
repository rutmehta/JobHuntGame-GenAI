const CACHE_NAME = 'jobhunt-game-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/public/manifest.json',
    '/assets/audio/background_music.mp3',
    '/assets/images/background.png',
    '/assets/images/button.png',
    '/assets/images/loading-bar.png',
    '/assets/images/platform.png',
    '/assets/images/title.png',
    '/assets/sprites/player.png',
    '/assets/sprites/procrastination.png',
    '/js/game.js',
    '/js/phaserGame.js',
    '/js/states/Boot.js',
    '/js/states/InterviewState.js',
    '/js/states/Level.js',
    '/js/states/LevelComplete.js',
    '/js/states/MainMenu.js',
    '/js/states/MiniGame.js',
    '/js/states/MusicScene.js',
    '/js/states/Preloader.js'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request)
                    .then(response => {
                        // Cache new resources
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseClone);
                                });
                        }
                        return response;
                    });
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});