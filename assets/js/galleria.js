/*!
 * Galleria settings
 */

 Galleria.loadTheme('https://cdnjs.cloudflare.com/ajax/libs/galleria/1.4.2/themes/classic/galleria.classic.min.js');
 Galleria.configure({
        transition: 'fade',
        autoplay: 5000,
        wait: 'true',
        lightbox: 'true',
        overlayBackground: '#313131',
        flickrOptions:{
            size: 'original',
            description: false,
            max: 100,
            sort: 'date-taken-asc'
        }
  });
