/* =========================================================================
   Service Worker — حلال فور يو
   استراتيجية التحديث:
   - الملفات التي تتغير باستمرار (index.html / app.js / menu.js / style.css)
     تُجلب من الشبكة أولاً (Network First) حتى تظهر الأسعار والأصناف الجديدة
     فورًا للعميل الذي ثبّت التطبيق على موبايله.
   - الصور والأيقونات تُخدم من الكاش أولاً (Cache First) للسرعة، وتُحدَّث
     في الخلفية.
   - عند عدم توفر الإنترنت يتم الرجوع للنسخة المحفوظة.
   ========================================================================= */

const VERSION = "v3";
const CORE_CACHE = `halal4you-core-${VERSION}`;
const ASSET_CACHE = `halal4you-assets-${VERSION}`;

// ملفات أساسية فقط — أي شيء آخر يُحفظ عند أول استخدام
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./data/menu.js",
  "./js/app.js",
  "./assets/logo.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

// امتدادات تُعتبر "محتوى متغيّر" -> الشبكة أولاً
const NETWORK_FIRST = /\.(?:html|js|css|json|webmanifest)$/i;
// امتدادات تُعتبر "أصول ثابتة" -> الكاش أولاً
const CACHE_FIRST = /\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|woff2?|ttf|otf)$/i;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CORE_CACHE)
      .then((cache) =>
        Promise.allSettled(
          CORE_ASSETS.map((url) =>
            cache.add(new Request(url, { cache: "reload" }))
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CORE_CACHE && key !== ASSET_CACHE)
          .map((key) => caches.delete(key))
      );
      if (self.registration.navigationPreload) {
        try {
          await self.registration.navigationPreload.enable();
        } catch (e) {
          /* تجاهل */
        }
      }
      await self.clients.claim();
    })()
  );
});

// يسمح للصفحة بطلب تفعيل النسخة الجديدة فورًا
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

async function networkFirst(request, preloadResponse) {
  const cache = await caches.open(CORE_CACHE);
  try {
    const preload = preloadResponse ? await preloadResponse : null;
    const response = preload || (await fetch(request, { cache: "no-store" }));
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (request.mode === "navigate") {
      const fallback = await cache.match("./index.html");
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(ASSET_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === "opaque")) {
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  // التنقل بين الصفحات: الشبكة أولاً دائمًا
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, event.preloadResponse));
    return;
  }

  if (!sameOrigin) return; // اترك الخطوط والموارد الخارجية للمتصفح

  if (NETWORK_FIRST.test(url.pathname)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (CACHE_FIRST.test(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
