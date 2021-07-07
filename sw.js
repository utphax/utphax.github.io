var CACHE_VERSION = 'v1';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION).then(function (cache) {
            return cache.addAll([
                '/',
                '/index',
                '/it_fair/',
                '/map/',
                '/gallery/',
                '/cosplay/',
                '/contact/',
                '/compete/',
                '/about/',
                '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css',
                '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css',
                '/assets/css/style.css',
                '/assets/css/prettyPhoto.css',
                '/assets/css/hoverex-all.css',
                '/assets/img/organization/fortinet.png',
                '/assets/js/jquery.prettyPhoto.js',
                '/assets/js/custom.js',
                '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/retina.js/1.3.0/retina.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js',
                '/assets/js/jquery.hoverdir.js',
                '/assets/js/jquery.hoverex.min.js',
                '//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.2.2/isotope.pkgd.min.js',
                '/assets/img/organization/cybersec.png',
                '/assets/img/organization/kperak.png',
                '/assets/img/organization/cyberhax.png',
                '/assets/img/organization/syntech.png',
                '/assets/img/utphax.png',
                '/assets/img/organization/utp.png',
                '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/fonts/fontawesome-webfont.woff2?v=4.4.0',
                '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/fonts/glyphicons-halflings-regular.woff2',
                '/assets/img/slider-banner.jpg',
                '/assets/img/slider-cos.jpg',
                '/assets/img/slider-merch.jpg',
                '/assets/img/slider-sponsor.jpg',
                '/assets/img/slider-utphax15.jpg',
                '/assets/img/slider-baju.jpg',
                '/assets/img/t-back.jpg',
                '/assets/img/cosplay.jpg',
                '/assets/img/Yone_Saizho.jpg',
                '/assets/img/Ayu_Afrina.jpg',
                '/assets/img/Yukise_Michi.jpg',
                '/assets/img/it-fair.jpg'
            ]).catch(function (error) {
                console.error('Error in install handler:', error);
            });
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});