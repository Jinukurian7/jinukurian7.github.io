(function ($) {
    'use strict';
    var THEME = {
        init: function () {
            this.onLoad();
            this.winLoad();
            this.resizeListner();
            this.scrollListner();
        },
        settings: {
            windowWidth: $(window).width(),
            windowheight: $(window).height(),
            scrollClassTrigger: 500
        },
        onLoad: function () {
            $(document).ready(function () {});
        },

        winLoad: function () {
            $(window).on('load', function () {
                $('body').addClass('all-loaded');
            });
        },

        resizeListner: function () {
            $(window).on('load resize', function () {
                THEME.settings.windowWidth = $(window).width();
            });
        },
        // ScrollListner
        scrollListner: function () {
            $(window).on('load scroll', function () {
                if ($(window).scrollTop() > THEME.settings.scrollClassTrigger) {
                    $('body').addClass('scrolled');
                } else {
                    $('body').removeClass('scrolled');
                }
            });

            $(window).on('mousewheel DOMMouseScroll', function (event) {
                var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                if (wd < 0) {
                    $('body').removeClass('scrollingUp');
                    $('body').addClass('scrollingDown');
                } else {
                    $('body').removeClass('scrollingDown');
                    $('body').addClass('scrollingUp')
                }
            });
        }
    };
    THEME.init();
}(jQuery));