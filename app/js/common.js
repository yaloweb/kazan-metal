$(function() {

	$(document).on('click', function (e) {
		if (!$(e.target).closest(".navbar").length) {
			$('.catalog-nav-link').removeClass('active');
			$('.navbar-dropdown').removeClass('opened');
		}
		if (!$(e.target).closest(".tabs-nav-block").length) {
			$('.tabs-nav-block').removeClass('opened');
		}
	});

	$('.menu-btn').on('click', function() {
		$('.navbar').addClass('visible')
	});

	$('.close-menu').on('click', function() {
		$('.navbar').removeClass('visible');
		$('.catalog-nav-link').removeClass('active');
		$('.navbar-dropdown').removeClass('opened');
	});

	$('.catalog-nav-link').on('click', function(e) {
		e.preventDefault();
		let ths = $(this),
				dropData = ths.data('dropdown'),
				dropdown = $(`.navbar-dropdown[data-dropdown=${dropData}]`);
		$('.catalog-nav-link').removeClass('active');
		$(this).addClass('active');
		if ( !dropdown.hasClass('opened') ) {
			$('.navbar-dropdown').removeClass('opened');
			dropdown.addClass('opened')
		}
	});

	$('.close-dropdown').on('click', function() {
		$('.catalog-nav-link').removeClass('active');
		$('.navbar-dropdown').removeClass('opened');
	});

	$('.banners-carousel').owlCarousel({
		items: 1,
		loop: true,
		dots: true,
		nav: true
	});

	$('.photos').fotorama({
		nav: 'thumbs',
		thumbmargin: 12,
		thumbwidth: 56,
		thumbheight: 56
	});

  let testimonials = $('.testimonials');
  let photosGallery = $('.photos-gallery');
	testimonials.owlCarousel({
		items: 1,
		nav: false,
		dots: false,
    touchDrag: false,
    mouseDrag: false
	});
  photosGallery.owlCarousel({
    items: 1,
    nav: false,
    dots: false,
    touchDrag: false,
    mouseDrag: false
  })

  $('.testimonials-nav-left').on('click', function() {
    testimonials.trigger('prev.owl.carousel', [300]);
    photosGallery.trigger('prev.owl.carousel', [300]);
    checkNavTestimonials()
  });

  $('.testimonials-nav-right').on('click', function() {
    testimonials.trigger('next.owl.carousel', [300]);
    photosGallery.trigger('next.owl.carousel', [300]);
    checkNavTestimonials()
  });

  function checkNavTestimonials() {
    let activeIndex = $('.testimonials .owl-item.active').index() + 1;
    if ( activeIndex == 1 ) {
      $('.testimonials-nav-left').addClass('disabled')
    }
    else if ( activeIndex == $('.testimonials .owl-item').length ) {
      $('.testimonials-nav-right').addClass('disabled')
    }
    else if ( activeIndex !== 1 && activeIndex !== $('.testimonials .owl-item').length ) {
      $('.testimonials-nav-left').removeClass('disabled')
      $('.testimonials-nav-right').removeClass('disabled')
    }
  }checkNavTestimonials();

	$('.phone-mask').inputmask({
  	mask: "+7 (999) 999-99-99",
  	showMaskOnHover: false
  });

  let galleryCarousel = $('.gallery');
  function galleryCarouselInit() {
  	if ( $(window).width() < 576 ) {
  		galleryCarousel.owlCarousel({
  			items: 2,
  			margin: 10,
  			loop: true,
  			nav: true,
  			dots: true,
  			responsive: {
  				320: {
  					items: 1
  				},
  				480: {
  					items: 2
  				}
  			}
  		})
  	}
  	else {
  		galleryCarousel.trigger('destroy.owl.carousel');
  	}
  }galleryCarouselInit();

  $(window).on('resize', function() {
  	galleryCarouselInit();
  });

  $('.header-open-search').on('click', function(e) {
  	e.preventDefault();
  	$('.header-form').addClass('opened');
  });

  $('.close-header-search').on('click', function(e) {
  	e.preventDefault();
  	$('.header-form').removeClass('opened');
  });

  $('.tabs-nav-block').each(function() {
  	let ths = $(this),
  			active = ths.find('.tabs-nav-mob-active'),
  			drop = ths.find('.tabs-nav');
  	active.on('click', function() {
  		ths.toggleClass('opened')
  	});
  });

  let $productImages = $('.product-images-gallery').fotorama({
		nav: 'thumbs',
		thumbmargin: 14,
		thumbwidth: 72,
		thumbheight: 74
	});

  let productImagesFotorama = $productImages.data('fotorama');

  $('.gallery-thumbs-prev-btn').on('click', function(e) {
  	e.preventDefault();
  	productImagesFotorama.show('<');
  });
  $('.gallery-thumbs-next-btn').on('click', function(e) {
  	e.preventDefault();
  	productImagesFotorama.show('>');
  });

  function checkNavGallery() {
  	let activeIndex = $(this).find('.fotorama__nav__frame--thumb.fotorama__active').index();
  	if ( activeIndex == 1 ) {
  		$('.gallery-thumbs-prev-btn').addClass('disabled')
  	}
  	else if ( activeIndex == $(this).find('.fotorama__nav__frame--thumb').length ) {
  		$('.gallery-thumbs-next-btn').addClass('disabled')
  	}
  	else if ( activeIndex !== 1 && activeIndex !== $(this).find('.fotorama__nav__frame--thumb').length ) {
  		$('.gallery-thumbs-prev-btn').removeClass('disabled')
  		$('.gallery-thumbs-next-btn').removeClass('disabled')
  	}
  };

  $('.product-images-gallery').on('fotorama:ready', checkNavGallery);
  $('.product-images-gallery').on('fotorama:showend', checkNavGallery);

  $('.questions-item').each(function() {
  	let ths = $(this),
  			title = ths.find('.questions-item-title'),
  			body = ths.find('.questions-item-body');
  	title.on('click', function() {
  		title.toggleClass('opened');
  		body.slideToggle(300)
  	});
  });

  $('.select-style').select2({
    minimumResultsForSearch: -1
  });

  $('.gallery-img').on('click', function(e) {
    e.preventDefault();
    let $fotoramaGallery = $('.gallery-fullscreen').fotorama(),
        gallery = $fotoramaGallery.data('fotorama'),
        index = $(this).parent().index();
    $('.gallery-fullscreen').addClass('no-transition');
    setTimeout(() => {
      $('.gallery-fullscreen').removeClass('no-transition')
    }, 300)
    gallery.setOptions({
      nav: false,
      allowFullscreen: true,
    });
    gallery.requestFullScreen()
    gallery.show(index)
  });

  $('.open-popup').on('click', function(e) {
    e.preventDefault();
    let id = $(this).attr('href');
    openPopup(id);
  });

  function openPopup(selector) {
    $(selector).show();
    setTimeout(() => {
      $(selector).addClass('opened')
    }, 50)
  }

  function closePopup() {
    $('.popup-wrapper').removeClass('opened');
    setTimeout(() => {
      $('.popup-wrapper').hide()
    }, 300)
  }

  $('.popup-bg').on('click', closePopup);
  $('.popup-close').on('click', closePopup);

  $('.sertificates').owlCarousel({
    items: 5,
    margin: 20,
    nav: true,
    dots: true,
    responsive: {
      0: {
        items: 2
      },
      576: {
        items: 3
      },
      768: {
        items: 4
      },
      992: {
        items: 5
      }
    }
  });

  $('.sertificate-link').on('click', function(e) {
    e.preventDefault();
    let src = $(this).attr('href');
    $('.full-umage-popup-src').attr('src', src);
    openPopup('#full-image');
  });

});
