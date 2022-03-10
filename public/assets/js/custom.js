var sw = $(window).width();
var sh = $(window).height();

$(window).on('load', function () {

    setTimeout(function() {
        $(".loader-first").fadeOut("slow");
        $('html').removeClass('loadjs');
    }, 100);

    if($(document).find('img').hasClass('svg-convert')) {
        $('.svg-convert').svgConvert({onComplete: function() {
            }
        });
    }

    setTimeout(function () {

        /* ---------------- In View Animation -------------------- */
        $('.animate').bind('inview', function (event, isInView) {
            if (isInView) {
                var animate = $(this).attr('data-animation');
                var speedDuration = $(this).attr('data-duration');
                var $t = $(this);
                setTimeout(function () {
                    $t.removeClass('animate');
                    $t.addClass(animate + ' animated');
                }, speedDuration);
            }
        });

        $('img').each(function () {
            var $element = $(this);
            if (sw > 767) {
                if ($element[0].hasAttribute('data-desktop-src')) {
                    var imageUrl = $element.attr("data-desktop-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-desktop-src');
                    $element.removeAttr('data-mobile-src');
                } else if ($element[0].hasAttribute('data-both-src')) {
                    var imageUrl = $element.attr("data-both-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-both-src');
                }
            } else {
                if($element[0].hasAttribute('data-mobile-src')) {
                    var imageUrl = $element.attr("data-mobile-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-desktop-src');
                    $element.removeAttr('data-mobile-src');
                } else if ($element[0].hasAttribute('data-both-src')) {
                    var imageUrl = $element.attr("data-both-src");
                    $element.attr("src", imageUrl);
                    $element.removeAttr('data-both-src');
                }
            }
        });

    }, 200);

});


$(document).ready(function() {

    if (sw > 1025) {
        if ((sw < 1400) && (sh >900)) {

        } else {
            fontResizer();
        }
    }

    var path = window.location.pathname.split("/").pop();
    var target = $('.navigation a[href="/' + path + '"]');
    target.addClass('active');

    // var logo = new Vivus('logo', {
    //     type: 'async',
    //     duration: 100,
    //     animTimingFunction: Vivus.EASE,
    //     start: 'autostart'
    // });

    // var tl = gsap.timeline({defaults:{duration: 1, ease: Back.easeOut.config(2), opacity:0}})
    // tl.from(".card-bg", {delay:1, scale:.2, transformOrigin:'center'}, "=.2")

    setTimeout(function () {

        if ($(document).find('section').hasClass('js-hero')) {
            var heroslide = new Swiper('.js-hero .swiper-container', {
                slidesPerView: 1,
                loop:true,
                //effect: 'fade',
                //observer: true,
                //observeParents: true,
                //rtl: rtlvalue,
                speed: 800,
                autoplay: {
                    disableOnInteraction: false,
                    delay: 5000,
                },
                pagination: {
                    el: '.pg.swiper-pagination',
                    clickable: true,
                },
            });
        }

        if ($(document).find('div').hasClass('videos__wrap')) {
            var advslider = new Swiper('.videos__wrap .swiper-container', {
                slidesPerView: 3,
                //loop:true,
                spaceBetween: 50,
                speed: 600,
                // autoplay: {
                //     disableOnInteraction: false,
                //     delay: 2500,
                // },
                navigation: {
                    nextEl: ".js-intro .swiper-button-next",
                    prevEl: ".js-intro .swiper-button-prev"
                },
                breakpoints: {
                    640: {
                        slidesPerView: 1,
                        //spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                    },
                },
            });
        }


    }, 2000);


    // $('.game__item').on('click', function(){
    //     $('.game__item.current').removeClass('current');
    //     $(this).addClass('current');
    // });

    $(".like").click(function () {
        var input = $(this).find('.qty1');
        input.val(parseInt(input.val())+ 1);
    });


    $('.toggle-menu').click(function () {
        //$('html').toggleClass('open-menu');
        $(this).toggleClass('open');
        $('.navigation').toggleClass('active');
    });

    if (sw < 768) {
        $('.navigation a').click(function () {
            $('.navigation').removeClass('active');
            $('.toggle-menu').removeClass('open');
        });
    }

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
        var $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            // window.location.hash = target;
        });
    });

});



function fontResizer() {
    var perc = parseInt(sw)/120;
    $('body').css('font-size', perc);
}

$(window).on('resize orientation', function() {
    sw = $(window).width();
    sh = $(window).height();
    if (sh < 450 && sw > 480 && sw < 820) {
        $('#portrait-warnning').css('display', 'flex');
    } else {
        $('#portrait-warnning').css('display', 'none');
    }

    setTimeout(function () {
        if (sw > 1025) {

            if ((sw < 1400) && (sw > 1300) && (sh > 900)) {

            } else {
                fontResizer();
            }
        }
    }, 500);
});

