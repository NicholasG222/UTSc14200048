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
      caches.open('first-app')
        .then(function(cache) {
          return fetch(event.request)
            .then(function(res) {
              cache.put(event.request, res.clone());
              return res;
            });
        }).catch(function(err) {
            return caches.open('first-app')
              .then(function(cache) {
                return fetch(event.request)
                .then(function(res) {
                    cache.put(event.request, res.clone());
                    return res;
                  })
              });
            }));

        }
    );

  


    
