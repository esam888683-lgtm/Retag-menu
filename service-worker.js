/*
 * Halal 4 You PWA Service Worker
 * IMPORTANT: Menu data and app HTML/JS are NETWORK-FIRST.
 * This prevents old prices from staying stuck in the PWA cache.
 */
const VERSION = "2026-09-11-01";
const STATIC_CACHE = `halal-static-${VERSION}`;

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./data/menu.js",
  "./manifest.json",
  "./assets/logo.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

const isCritical = (url) => {
  const path = new URL(url).pathname;
  return (
    path.endsWith("/index.html") ||
    path.endsWith("/data/menu.js") ||
    path.endsWith("/js/app.js") ||
    path.endsWith("/manifest.json")
  );
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key.startsWith("halal-static-"))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  try {
    // no-store makes the critical menu/app files bypass the normal HTTP cache.
    const networkResponse = await fetch(request, { cache: "no-store" });
    if (networkResponse && networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  const refresh = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  return cached || (await refresh) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isCritical(request.url)) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Navigation: get the latest index.html whenever online.
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(new Request(new URL("./index.html", self.location.href), {
      method: "GET",
      cache: "no-store"
    })));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});
