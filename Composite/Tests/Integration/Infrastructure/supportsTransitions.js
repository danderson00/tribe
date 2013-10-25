Test.supportsTransitions = (function() {
    var b = document.body || document.documentElement;
    var style = b.style;
    var property = 'transition';
    var vendors = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];

    if (typeof style[property] == 'string') { return true; }

    // Tests for vendor specific prop
    property = property.charAt(0).toUpperCase() + property.substr(1);
    for (var i = 0, l = vendors.length; i < l; i++) {
        if (typeof style[vendors[i] + property] == 'string') { return true; }
    }

    return false;
})();
