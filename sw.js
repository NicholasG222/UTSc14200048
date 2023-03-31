self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('first-app')
        .then(function(cache) {
          cache.addAll([
            '/',
            'index.html',
            'blog.html',
            'about.html',
            'contact.html',
            'portofolio-example01.html',
            'uts.css',
            'uts.js'
          ])
        })
    );
    return self.clients.claim();
  });
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function(res) {
                return caches.open('first-app')
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function(err) {
                return caches.open('first-app')
                  .then(function(cache) {
                    cache.put(event.request.url, res.clone());
                    return res;
                  });
              });
          }
        })
    );
  });
  

  


    
