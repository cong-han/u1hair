conconst CACHE_NAME = 'quote-calc-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/router.js',
];
// 安装：预缓存核心文件
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
           return cache.addAll(urlsToCache);
        })
    );
});
// 拦截请求：缓存里有就用缓存，没有就发网络请求
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});st CACHE_NAME = "quote-calc-v1";
const urlsToCache = ["/", "/index.html", "/js/app.js", "/js/router.js"];
// 安装：预缓存核心文件
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});
// 拦截请求：缓存里有就用缓存，没有就发网络请求
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
