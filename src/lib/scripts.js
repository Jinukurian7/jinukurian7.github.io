(function ($) {
    'use strict';
    const JK = {
        init: function() {
            this.onLoad();
            this.winLoad();
            this.resizeListner();
            this.scrollListner();
            this.preloader();
            this.loadAnim();
            this.skillProgress();
            this.timeline();
        },
        settings: {
            windowWidth: $(window).width(),
            windowheight: $(window).height(),
            scrollClassTrigger: $(".hero-section").height() - 250
        },
        onLoad: () => {
            $(document).ready(() => {
                
            });
        },

        winLoad: () => {
            $(window).on('load', () => {
                // $('body').addClass('page-loaded');
            });
        },

        resizeListner: () => {
            $(window).on("load resize", () => {
                JK.settings.windowWidth = $(window).width();
            });
        },
       
        // ScrollListner
        scrollListner: () => {
            $(window).on('load scroll', function () {
                if ($(window).scrollTop() > JK.settings.scrollClassTrigger) {
                    $('header').addClass('fixed');
                } else {
                    $('header').removeClass('fixed');
                }
            });

            $(window).on('mousewheel DOMMouseScroll', (event) => {
                var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                if (wd < 0) {
                    $('body').removeClass('scrollingUp');
                    $('body').addClass('scrollingDown');
                } else {
                    $('body').removeClass('scrollingDown');
                    $('body').addClass('scrollingUp')
                }
            });
        },
        // Preloader
        preloader: function() {
            let preloader = $(".preloader");
            let cover = $(".preloader-cover");
            let preloaderContent = $(".preloader-content > *");
            let progressBar = $(".progressbar");
            let count = $(".progressbar-text");
            let tl = gsap.timeline();
            tl.from(preloaderContent, 0.5,{
                y: -10,
                autoAlpha: 0, 
                stagger: 0.5
            })
            .from(progressBar, 2, {
                delay: 0.5,
                strokeDashoffset: 100,
                ease:Linear.easeNone,
                onUpdate: function() {
                    let percentage = Math.round(this.progress() * 100)
                    count.text(percentage + "%")
                }
            })
            .to(preloaderContent, 0.2,{
                y: -10,
                autoAlpha: 0, 
            }, "+=0.5")
            .to(cover, 1, {
                delay: 0.25,
                x: "-100%",
                ease: Power4.easeOut
            })
            .to(preloader, 1, {
                x: "-100%",
                ease: Power4.easeOut
            }, "-=0.25")
            .to(preloader, 0.5, {
                autoAlpha: 0
            })
            .add(function() {
                $("body").addClass("page-loaded");
            }, "-=1");
        },

        loadAnim: () => {

            gsap.from(".profile-list li", {
                autoAlpha: 0,
                y: 10,
                ease: Power4.easeOut,
                delay: 0.5,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: ".profile-list"
                }
           })
           gsap.from(".social li", {
                autoAlpha: 0,
                y: 10,
                ease: Power4.easeOut,
                delay: 0.5,
                stagger: 0.25,
                scrollTrigger: {
                    trigger: ".social"
                }
           })
        },

        skillProgress: () => {
            gsap.to(".bar-fill", 1.5, { 
                width: function(index, target) {
                    return target.dataset.value
                }, 
                stagger: 0.25,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".skill-box"
                }
            });
        },

        timeline: () => {
            // gsap.to('.timeline-box')
            gsap.utils.toArray(".timeline-box").forEach(function(section) {
                gsap.from(section, 1.5, {
                    ease: "power3.out",
                    opacity:0,
                    y: 100,
                    scrollTrigger: section
                });
            });
        }
    };
    JK.init();
}(jQuery));
