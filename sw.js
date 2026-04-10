// ══════════════════════════════════════════
// CRONO TEST 01 — Service Worker v1.0
// Cache offline para uso sin internet en terreno
// ══════════════════════════════════════════

const CACHE = 'crono-test-01-v1';

const PRECACHE = [
  '/crono-test-01/index.html',
  '/crono-test-01/landing.html',
  '/crono-test-01/crono.html',
  '/crono-test-01/assets/ruta.js',
  '/crono-test-01/manifest.json',
  '/crono-test-01/icons/icon-192.png',
  '/crono-test-01/icons/icon-512.png',
];

const RUNTIME = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet',
];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE)
      .then(c=>c.addAll(PRECACHE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);

  // Archivos del proyecto — Cache First
  if(url.origin===location.origin){
    e.respondWith(
      caches.match(e.request).then(cached=>{
        if(cached){
          fetch(e.request).then(r=>{
            if(r&&r.status===200) caches.open(CACHE).then(c=>c.put(e.request,r));
          }).catch(()=>{});
          return cached;
        }
        return fetch(e.request).then(r=>{
          if(!r||r.status!==200) return r;
          caches.open(CACHE).then(c=>c.put(e.request,r.clone()));
          return r;
        });
      })
    );
    return;
  }

  // Recursos externos — Network First con fallback
  if(RUNTIME.some(d=>url.href.includes(d))){
    e.respondWith(
      fetch(e.request)
        .then(r=>{ caches.open(CACHE).then(c=>c.put(e.request,r.clone())); return r; })
        .catch(()=>caches.match(e.request))
    );
  }
});
