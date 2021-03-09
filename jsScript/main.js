$(document).ready(function() {
const flowersSlider = new Swiper('.flowers-slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 6,
    
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
      // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 6,
    }
  }
  });
  const reviewsSlider = new Swiper('.reviews-slider', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
  $("#review-1").on('click', function() {

    $.fancybox.open([
      {
        src  : 'https://source.unsplash.com/IvfoDk30JnI/1500x1000',
        opts : {
          caption : 'First caption',
          thumb   : 'https://source.unsplash.com/IvfoDk30JnI/240x160'
        }
      },
      {
        src  : 'https://source.unsplash.com/0JYgd2QuMfw/1500x1000',
        opts : {
          caption : 'Second caption',
          thumb   : 'https://source.unsplash.com/0JYgd2QuMfw/240x160'
        }
      }
    ], {
      loop : true,
      thumbs : {
        autoStart : true
      }
    });
  
  });
  $("#review-2").on('click', function() {

    $.fancybox.open([
      {
        src  : 'img/reviewimg/pinkflowerwine.jpg',
        opts : {
          caption : 'Green freshness',
          thumb   : 'img/reviewimg/pinkflowerwine.jpg'
        }
      },
      {
        src  : 'img/reviewimg/red_piano.jpg',
        opts : {
          caption : 'Red peonies',
          thumb   : 'img/reviewimg/red_piano.jpg'
        }
      },
      {
        src  : 'img/reviewimg/rozarozova.jpg',
        opts : {
          caption : 'Pink roses',
          thumb   : 'img/reviewimg/rozarozova.jpg'
        }
      }
    ], {
      loop : true,
      thumbs : {
        autoStart : true
      }
    });
  
  });
  

});
  