const C='jbdc-v25',F=['./','index.html','data.js','mottos.js','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!='GET')return;
if(/config\.js/.test(q.url)){e.respondWith(fetch(q).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(q,c));return r}).catch(()=>caches.match(q)));return}
e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).catch(()=>caches.match('index.html'))))});
