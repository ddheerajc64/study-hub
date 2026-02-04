self.addEventListener("fetch", e=>{
  e.respondWith(
    caches.open("study-hub").then(cache=>{
      return cache.match(e.request).then(r=>{
        return r || fetch(e.request).then(res=>{
          cache.put(e.request, res.clone());
          return res;
        });
      });
    })
  );
});
