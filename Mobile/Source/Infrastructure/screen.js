$(function () {
    var page = document.body,
        ua = navigator.userAgent,
        iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
        ipad = ~ua.indexOf('iPad'),
        ios = iphone || ipad,
        // Detect if this is running as a fullscreen app from the homescreen
        fullscreen = window.navigator.standalone,
        android = ~ua.indexOf('Android'),
        lastWidth = 0,
        style = $('<style class="__tribe"></style>').appendTo('head');    

    if (android) {
        // Android's browser adds the scroll position to the innerHeight, just to
        // make this really fucking difficult. Thus, once we are scrolled, the
        // page height value needs to be corrected in case the page is loaded
        // when already scrolled down. The pageYOffset is of no use, since it always
        // returns 0 while the address bar is displayed.
        window.onscroll = function () {
            setHeight(window.innerHeight);
        };
    }
    var setupScroll = window.onload = function () {
        var height;
        
        // Start out by adding the height of the location bar to the width, so that
        // we can scroll past it
        if (ios) {
            // iOS reliably returns the innerWindow size for documentElement.clientHeight
            // but window.innerHeight is sometimes the wrong value after rotating
            // the orientation
            height = document.documentElement.clientHeight;
            
            // Only add extra padding to the height on iphone / ipod, since the ipad
            // browser doesn't scroll off the location bar.
            if (iphone && !fullscreen) {
                setTimeout(scrollTo, 0, 0, 0);
                height += 60;
            }

        } else if (android) {
            // The stock Android browser has a location bar height of 56 pixels, but
            // this very likely could be broken in other Android browsers.
            //setTimeout(scrollTo, 1000, 0, 56);
            height = window.innerHeight + 56;
        }

        if (height) {
            setHeight(height);
            // Scroll after a timeout, since iOS will scroll to the top of the page
            // after it fires the onload event
        }

    };
    (window.onresize = function () {
        var pageWidth = page.offsetWidth;
        // Android doesn't support orientation change, so check for when the width
        // changes to figure out when the orientation changes
        if (lastWidth == pageWidth) return;
        lastWidth = pageWidth;
        setupScroll();
    })();
    
    function setHeight(height) {
        style.html('.deviceHeight > * { min-height: ' + height + 'px; }');
    }
});