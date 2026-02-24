const CACHE_NAME = "portfolio-v2";

// App shell — critical resources pre-cached on install
const APP_SHELL = [
    "/",
    "/profile.jpg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(
                names
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {
    const { request } = event;

    // Skip non-GET and chrome-extension requests
    if (request.method !== "GET" || request.url.startsWith("chrome-extension")) {
        return;
    }

    // Navigation requests: network-first, fall back to cached index
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).catch(() => caches.match("/"))
        );
        return;
    }

    // Static assets: stale-while-revalidate
    event.respondWith(
        caches.match(request).then((cached) => {
            const fetched = fetch(request)
                .then((response) => {
                    // Cache valid responses
                    if (response.ok) {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(request, clone);
                        });
                    }
                    return response;
                })
                .catch(() => cached);

            return cached || fetched;
        })
    );
});
