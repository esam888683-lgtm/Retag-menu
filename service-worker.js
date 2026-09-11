const CACHE_NAME = "halal4you-menu-v1";
const APP_SHELL = [
  "./index.html",
  "./README.md",
  "./manifest.json",
  "./css/style.css",
  "./assets/logo.svg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/products/لحم صوص.jpg",
  "./assets/products/كريب استريبس.jpg",
  "./assets/products/crepe.svg",
  "./assets/products/زنجر سوري.jpeg",
  "./assets/products/كاوبوي.jpg",
  "./assets/products/تشارلي بوي.jpg",
  "./assets/products/طاجن كوارع.jpg",
  "./assets/products/4ق بروست.jpg",
  "./assets/products/كريب ميكس فراخ.jpg",
  "./assets/products/بطاطس.jpg",
  "./assets/products/كفته.jpg",
  "./assets/products/فاهيتا سوري.jpeg",
  "./assets/products/fried-chicken.svg",
  "./assets/products/The_sandwich_went_202512160234.jpeg",
  "./assets/products/فته.jpg",
  "./assets/products/استريبس سوري.jpeg",
  "./assets/products/فولكانو.jpg",
  "./assets/products/تشيزي بيف.jpg",
  "./assets/products/حلال شيستر.jpg",
  "./assets/products/21ق استريبس.jpg",
  "./assets/products/12ق استريبس.jpg",
  "./assets/products/بطاطس سوري.jpg",
  "./assets/products/meals.svg",
  "./assets/products/ميكس فراخ وكفته.jpg",
  "./assets/products/ميكس بانيه وكفته.jpg",
  "./assets/products/طاجن بصل.jpg",
  "./assets/products/وجبه شيش طاووق.jpg",
  "./assets/products/ماشروم بيف.jpg",
  "./assets/products/كبده.jpg",
  "./assets/products/حواوشي.png",
  "./assets/products/بروست اطفال.jpg",
  "./assets/products/جوسي لوسي 4.jpg",
  "./assets/products/فراخ شيش.png",
  "./assets/products/شيش طاووق سوري.jpg.jpeg",
  "./assets/products/5ق استريبس.jpg",
  "./assets/products/8ق بروست.jpg",
  "./assets/products/زنجر استريبس.jpg",
  "./assets/products/extras.svg",
  "./assets/products/بوفتيك.jpg",
  "./assets/products/ممبار.jpg",
  "./assets/products/استيك.jpg",
  "./assets/products/شيش طاووق.jpg",
  "./assets/products/تشيكن ماشروم.jpg",
  "./assets/products/sandwiches.svg",
  "./assets/products/كريب زنجر.jpg",
  "./assets/products/لحم صوص عرض.jpg",
  "./assets/products/مقبلات.jpeg",
  "./assets/products/drinks.svg",
  "./assets/products/ميكس لحوم.jpg",
  "./assets/products/فاهيتا تشيكن.jpg",
  "./assets/products/فاهيتا.jpg",
  "./assets/products/ميكس عائلي.jpg",
  "./assets/products/طرب.jpg",
  "./assets/products/كلاسيك بيف.jpg",
  "./assets/products/ميجا برجر.jpg",
  "./assets/products/ميكس 2ق بروست +2 ق استريبس.jpg",
  "./assets/products/21ق بروست.jpg",
  "./assets/products/16ق بروست.jpg",
  "./assets/products/سوبر كرانشي.jpg",
  "./assets/products/2ق بروست.jpg",
  "./assets/products/كريب برجر.jpg",
  "./assets/products/طاجن لحمه.jpg",
  "./assets/products/بطاطس ميكس سوري.jpeg",
  "./assets/products/كريب شيش.jpg",
  "./assets/products/بانيه.jpg",
  "./assets/products/3ق بروست.jpg",
  "./assets/products/شاورما سوري.jpg.jpeg",
  "./assets/products/حلال فاير برجر.jpg",
  "./assets/products/استريبس اطفال.jpg",
  "./assets/products/12ق بروست.jpg",
  "./assets/products/بانيه سوري.jpeg",
  "./assets/products/3ق استريبس.jpg",
  "./assets/products/كينج برجر.jpg",
  "./assets/products/كلاسيك استريبس فيلر.jpg",
  "./assets/products/grills.svg",
  "./assets/products/فراخ مندي.jpg",
  "./assets/products/لحم مندي.jpg",
  "./assets/products/زنجر.jpg",
  "./assets/products/كلاسيك تشيكن.jpg",
  "./assets/products/لحم محمر.jpeg",
  "./assets/products/سجق.jpg",
  "./assets/products/حلال فاير.jpg",
  "./assets/products/حمام بلدي.png",
  "./assets/products/كفته سوري.jpeg",
  "./data/menu.js",
  "./js/app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
