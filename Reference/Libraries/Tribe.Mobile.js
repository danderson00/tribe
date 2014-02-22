
// Panes/blank.js


T.scriptEnvironment = { resourcePath: '/Mobile/blank' };

T.registerModel(function(pane) {});




// Panes/editable.js


T.scriptEnvironment = { resourcePath: '/Mobile/editable' };

T.registerModel(function (pane) {
    var self = this;
    var data = pane.data || {};
    
    this.initialText = data.initialText;    
    this.newValue = ko.observable();
    this.editing = ko.observable(false);

    this.startEditing = function() {
        self.editing(true);
        $(pane.element).find('input').focus();
    };

    this.save = function() {
        if ($.isFunction(data.callback))
            data.callback(self.newValue());
        self.editing(false);
    };

    this.cancel = function() {
        self.editing(false);
    };
});



// Panes/list.js


T.scriptEnvironment = { resourcePath: '/Mobile/list' };

T.registerModel(function (pane) {
    var data = pane.data;
    this.items = data.items;
    this.click = data.itemClick || function () { };
    this.cssClass = data.cssClass;
    this.headerText = data.headerText;
    
    this.displayText = function (item) {
        if (item === null || item === undefined)
            return data.nullItemText;

        if (data.itemText) {
            if ($.isFunction(data.itemText))
                return data.itemText(item);
            else
                return item[data.itemText];
        } else {
            return item;
        }
    };
});



// Panes/main.js


T.scriptEnvironment = { resourcePath: '/Mobile/main' };

T.registerModel(function (pane) {
    //T.transition.mode = "normal";
    
    this.pane = (pane.data && pane.data.pane) || 'blank';

    this.renderComplete = function() {
        setPadding(T.toolbar.visible());
        T.toolbar.visible.subscribe(setPadding);
        
        // this is a bit of a hack to make navigation from the toolbar occur against the child navigation pane in embedded scenarios
        pane.node.navigation = pane.node.children[1].navigation;
    };

    function setPadding(visible) {
        if (visible) {
            var height = $('.TM .toolbar').outerHeight();
            $('<style id="__tribe_toolbar">.TM .screenContainer > * { padding-top: ' + height + 'px; }</style>').appendTo('head');
        } else
            $('#__tribe_toolbar').remove();
    };
});



// Panes/options.js


T.scriptEnvironment = { resourcePath: '/Mobile/options' };

T.registerModel(function (pane) {
    var self = this;
    this.options = pane.data.options;

    this.paneRendered = function() {
        T.transition('.modalBackground', 'fade')['in']();
        T.transition('.optionsList', 'slideDown')['in']();
    };

    this.itemClick = function (item) {
        if (item.func)
            item.func();
        self.hide();
    };

    this.hide = function() {
        $.when(
            T.transition('.optionsList', 'slideUp').out(),
            T.transition('.modalBackground', 'fade').out()
        ).done(pane.remove);
    };
});



// Panes/overlay.js


T.scriptEnvironment = { resourcePath: '/Mobile/overlay' };

T.registerModel(function (pane) {
    var data = pane.data || {};
    var element;

    this.pane = data.pane;

    pane.node.nodeForPath = function() {
        return T.nodeFor('.TM').children[1];
    };
    
    this.renderComplete = function () {
        element = $(pane.element).find('.overlay').show();
        T.transition(element, data.transition || 'slideDown')['in']();

        T.nodeFor(element.children()).pane.remove = close;
    };

    function close() {
        T.transition(element, data.transition || 'slideDown', true).out();
    }
});

T.overlay = function (paneOptions, transition) {
    var node = T.appendNode('.TM', { path: '/Mobile/overlay', data: { pane: paneOptions }});
    return {
        node: node,
        close: function () {
            T.transition($(node.pane.element).find('.overlay'), transition || 'slideDown', true).out();
        }
    };
};

// HACK
T.dialog = function(paneOptions) {
    return T.overlay(paneOptions, 'slideLeft');
};
T.Types.Pane.prototype.dialog = T.dialog;




// Panes/toolbar.js


T.scriptEnvironment = { resourcePath: '/Mobile/toolbar' };

T.toolbar = {
    title: ko.observable(),
    back: ko.observable(false),
    options: ko.observableArray([]),
    visible: ko.observable(true),
    defaults: {
        options: [],
        visible: true
    }
};
T.registerModel(function (pane) {
    this.back = function () {
        var back = ko.utils.unwrapObservable(pane.data.back || T.toolbar.back);
        if (back === true)
            pane.node.navigateBack();
        else if (back.constructor === Function)
            back();
    };

    this.showOptions = function() {
        T.appendNode(pane.element, { path: 'options', data: { options: pane.data.options || T.toolbar.options() } });
    };

    function renderComplete() {
        var defaults = T.toolbar.defaults;
        T.toolbar.back(defaults.back && !pane.node.findNavigation().isAtStart());
    }
    
    function navigating() {
        var defaults = T.toolbar.defaults;
        T.toolbar.title(defaults.title);
        T.toolbar.options(defaults.options);
        T.toolbar.visible(defaults.visible);
    }

    T.Utils.handleDocumentEvent('renderComplete', renderComplete);
    T.Utils.handleDocumentEvent('navigating', navigating);
    this.dispose = function () {
        T.Utils.detachDocumentEvent('renderComplete', renderComplete);
        T.Utils.detachDocumentEvent('navigating', navigating);
    };
});



//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<div class="editable">\n    <span data-bind="text: initialText, click: startEditing, visible: !editing()"></span>\n    <input type="text" data-bind="value: newValue, event: { blur: save }, enterPressed: save, escapePressed: cancel, visible: editing"/>\n</div>', 'template--Mobile-editable');

//
window.__appendTemplate('\n<ul data-bind="cssClass: cssClass">\n    <li data-bind="visible: headerText, text: headerText" class="listHeader"></li>\n    <!-- ko foreach: items -->\n    <li data-bind="click: $root.click, text: $root.displayText($data)"></li>\n    <!-- /ko -->\n</ul>', 'template--Mobile-list');

//
window.__appendTemplate('\n<div class="TM">\n    <div data-bind="pane: \'toolbar\', data: T.toolbar"></div>\n    <div class="deviceHeight screenContainer">\n        <div data-bind="pane: { path: pane, handlesNavigation: { transition: \'slideLeft\' } }"></div>\n    </div>\n</div>\n', 'template--Mobile-main');

//
window.__appendTemplate('\n<div class="deviceHeight">\n    <div class="optionsList in" data-bind="pane: \'list\', data: { items: options, itemText: \'text\', itemClick: itemClick, cssClass: \'edgetoedge\' }">\n        \n    </div>    \n    <div class="modalBackground" data-bind="click: hide"><div></div></div>\n</div>', 'template--Mobile-options');

//
window.__appendTemplate('\n<div class="deviceHeight screenContainer">\n    <div class="overlay" data-bind="pane: pane">\n    </div>\n</div>', 'template--Mobile-overlay');

//
window.__appendTemplate('\n<div class="toolbar" data-bind="visible: T.toolbar.visible">\n    <h1 data-bind="text: T.toolbar.title"></h1>\n    <a data-bind="visible: T.toolbar.options().length, click: showOptions" class="button">Options</a>\n    <a data-bind="visible: T.toolbar.back, click: back" class="back">Back</a>\n</div>\n', 'template--Mobile-toolbar');

//
window.__appendStyle = function (content) {
    var element = document.getElementById('__tribeStyles');
    if (!element) {
        element = document.createElement('style');
        element.className = '__tribe';
        element.id = '__tribeStyles';
        document.getElementsByTagName('head')[0].appendChild(element);
    }

    if(element.styleSheet)
        element.styleSheet.cssText += content;
    else
        element.appendChild(document.createTextNode(content));
};//
window.__appendStyle('.editable>*{display:block}.editable input{width:100%;margin:-4px 0}');

//
window.__appendStyle('.listHeader{font-weight:bold}');

//
window.__appendStyle('body{margin:0;padding:0;overflow-x:hidden}.TM *{margin:0;padding:0}.TM{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none;-webkit-text-size-adjust:none;-webkit-user-select:none;user-select:none;font-family:"Helvetica Neue",Helvetica;-webkit-overflow-scrolling:touch}.TM a{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-user-drag:none}.TM .selectable,input,textarea{-webkit-user-select:auto}.TM .scroll{-webkit-box-flex:1;box-flex:1;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;-webkit-margin-collapse:separate}.TM .screenContainer>*{right:0;top:0;left:0;bottom:0;width:100%;height:100%;display:block;position:absolute;overflow-x:hidden;overflow-y:auto;display:-webkit-box;display:box;-webkit-box-orient:vertical;box-orient:vertical;-webkit-box-flex:1;box-flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transform:translate3d(0,0,0) rotate(0) scale(1);background-color:#cbd2d8;background-image:-webkit-gradient(linear,0% 50%,7 50%,color-stop(0%,rgba(197,205,212,0)),color-stop(14.286%,rgba(197,205,212,0)),color-stop(14.286%,#c5cdd4),color-stop(100%,#c5cdd4));background-image:-webkit-linear-gradient(left,rgba(197,205,212,0),rgba(197,205,212,0) 1px,#c5cdd4 1px,#c5cdd4 7px);background-image:linear-gradient(to right,rgba(197,205,212,0),rgba(197,205,212,0) 1px,#c5cdd4 1px,#c5cdd4 7px);background-size:7px}');

//
window.__appendStyle('.optionsList{position:absolute;top:0;left:0;width:100%;z-index:1001}.modalBackground{position:absolute;overflow:hidden;top:0;bottom:0;left:0;right:0;padding:0;margin:0;z-index:1000}.modalBackground>div{width:100%;height:100%;min-height:100%;background-color:Gray;filter:alpha(opacity=60);opacity:.60}');

//
window.__appendStyle('.overlay{display:none;overflow:hidden;z-index:100;padding-top:0!important}');

//
window.__appendStyle('.toolbar{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:rgba(0,0,0,0.4) 0 1px 6px;box-shadow:rgba(0,0,0,0.4) 0 1px 6px;border-bottom:1px solid #2a3441;z-index:2;position:relative;padding:10px;height:44px;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,rgba(255,255,255,0.15)),color-stop(100%,rgba(255,255,255,0))),-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#92a3b9),color-stop(50%,#7f93ad),color-stop(51%,#768ba7),color-stop(100%,#6d83a1));background-image:-webkit-linear-gradient(rgba(255,255,255,0.15),rgba(255,255,255,0)),-webkit-linear-gradient(top,#92a3b9,#7f93ad 50%,#768ba7 51%,#6d83a1);background-image:linear-gradient(rgba(255,255,255,0.15),rgba(255,255,255,0)),linear-gradient(to bottom,#92a3b9,#7f93ad 50%,#768ba7 51%,#6d83a1);-webkit-box-shadow:rgba(255,255,255,0.3) 0 1px 0 inset;box-shadow:rgba(255,255,255,0.3) 0 1px 0 inset}.toolbar a,.toolbar a:visited,.toolbar a:active,.toolbar a:hover{text-decoration:none}.toolbar>h1{position:absolute;overflow:hidden;left:50%;bottom:9px;margin:1px 0 0 -75px;width:150px;font-size:20px;font-weight:bold;line-height:1.3em;text-align:center;text-overflow:ellipsis;white-space:nowrap;color:white;text-shadow:#5c718e 0 -1px 0}.black-translucent .toolbar{padding-top:30px;height:64px}.landscape .toolbar>h1{margin-left:-125px;width:250px}.button,.back,.cancel,.add{position:absolute;overflow:hidden;width:auto;height:30px;font-family:inherit;font-size:12px;font-weight:bold;line-height:30px;text-overflow:ellipsis;text-decoration:none;white-space:nowrap;background:0;bottom:6px;right:10px;margin:0;padding:0 10px;color:white;text-shadow:#3e5779 0 -1px 0;-webkit-box-shadow:rgba(255,255,255,0.2) 0 1px 0,rgba(0,0,0,0.2) 0 1px 2px inset;box-shadow:rgba(255,255,255,0.2) 0 1px 0,rgba(0,0,0,0.2) 0 1px 2px inset;border:1px solid #2d3f57;-webkit-border-radius:5px;border-radius:5px;background-image:none;background-color:#50709a;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#7c97bb),color-stop(50%,#5a7caa),color-stop(51%,#50709a),color-stop(100%,#476489));background-image:-webkit-linear-gradient(top,#7c97bb,#5a7caa 50%,#50709a 51%,#476489);background-image:linear-gradient(top,#7c97bb,#5a7caa 50%,#50709a 51%,#476489)}.button.active,.back.active,.cancel.active,.add.active{border-color:#243346;background-image:none;background-color:#476489;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#6b89b2),color-stop(50%,#50709a),color-stop(51%,#476489),color-stop(100%,#3e5779));background-image:-webkit-linear-gradient(top,#6b89b2,#50709a 50%,#476489 51%,#3e5779);background-image:linear-gradient(top,#6b89b2,#50709a 50%,#476489 51%,#3e5779);color:white;text-shadow:#364b68 0 -1px 0}.back{max-width:60px;margin-left:15px;overflow:visible;padding-left:5px}.back:after,.back:before{content:\'\';position:absolute;width:20px;height:20px;top:1px;left:1px;-webkit-transform:rotate(45deg) translate3d(0.2px,0,0);transform:rotate(45deg) translate3d(0.2px,0,0);-webkit-transform-origin:0 0;transform-origin:0 0;background-image:none;background-color:#50709a;background-image:-webkit-gradient(linear,0% 0,100% 100%,color-stop(0%,#7c97bb),color-stop(50%,#5a7caa),color-stop(51%,#50709a),color-stop(100%,#476489));background-image:-webkit-linear-gradient(top left,#7c97bb,#5a7caa 50%,#50709a 51%,#476489);background-image:linear-gradient(top left,#7c97bb,#5a7caa 50%,#50709a 51%,#476489);background-size:100% 98%;-webkit-border-radius:0 0 0 2px;border-radius:0 0 0 2px;-webkit-mask-image:-webkit-linear-gradient(45deg,black,black 15px,rgba(0,0,0,0) 15px);-webkit-mask-image:-webkit-gradient(linear,left bottom,right top,from(black),color-stop(50%,black),color-stop(50%,rgba(0,0,0,0)),to(rgba(0,0,0,0)));-webkit-mask-clip:border-box;-webkit-background-clip:content-box}.back:after{-webkit-box-shadow:rgba(0,0,0,0.2) 1px 0 0 inset,rgba(0,0,0,0.2) 0 -1px 0 inset;box-shadow:rgba(0,0,0,0.2) 1px 0 0 inset,rgba(0,0,0,0.2) 0 -1px 0 inset}.back:before{margin-left:-1px;background:#243346 none}.back.active:after{background-image:none;background-color:#476489;background-image:-webkit-gradient(linear,0% 0,100% 100%,color-stop(0%,#6b89b2),color-stop(50%,#50709a),color-stop(51%,#476489),color-stop(100%,#3e5779));background-image:-webkit-linear-gradient(left top,#6b89b2,#50709a 50%,#476489 51%,#3e5779);background-image:linear-gradient(left top,#6b89b2,#50709a 50%,#476489 51%,#3e5779)}.back.active:before{background-color:#243346}.leftButton,.cancel,.back{left:6px;right:auto}');

// Infrastructure/click.js

(function () {
    var supportsTouch;
    $(function() { supportsTouch = 'ontouchstart' in document; });
    
    ko.bindingHandlers['click'] = {
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
            applyFastClick(element);
            applyActiveClass(element);

            var newValueAccessor = function () { return { click: valueAccessor() }; };
            return ko.bindingHandlers['event']['init'].call(this, element, newValueAccessor, allBindingsAccessor, viewModel);
        }
    };

    function applyActiveClass(element) {
        var $element = $(element);
        $element.bind(supportsTouch ? 'touchstart' : 'mousedown', touchStartHandler);

        function touchStartHandler(e) {
            $element.addClass('active');

            // Remove our active class if we move
            $element.on(supportsTouch ? 'touchmove' : 'mousemove', function () {
                $element.removeClass('active');
            });

            $element.on(supportsTouch ? 'touchend' : 'mouseup', function () {
                $element.removeClass('active').unbind('touchmove mousemove');
            });
        }
    }

    function applyFastClick(element) {
        var $element = $(element);

        if (supportsTouch)
            $element.on('touchstart', touchstart);

        var moved;

        function touchstart(e) {
            e.preventDefault();
            moved = false;
            $element.on('touchmove', touchmove);
            $element.on('touchend', touchend);
        }

        function touchmove(e) {
            moved = true;
        }

        function touchend(e) {
            $element.off('touchmove', touchmove);
            $element.off('touchend', touchend);

            if (!moved)
                $element.click();
        }
    }
})();



// Infrastructure/screen.js

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


//
window.__appendStyle('.TM button.blue{background-color:#2f7ce3;color:white;text-shadow:#1a63c5 0 -1px 0}.TM button{display:block;box-sizing:border-box;font-size:20px;font-weight:bold;margin:10px 20px;padding:10px;text-align:center;text-decoration:inherit;-webkit-border-radius:8px;border-radius:8px;-webkit-box-shadow:rgba(0,0,0,0.4) 0 1px 3px,rgba(0,0,0,0.4) 0 0 0 5px,rgba(255,255,255,0.3) 0 1px 0 5px;box-shadow:rgba(0,0,0,0.4) 0 1px 3px,rgba(0,0,0,0.4) 0 0 0 5px,rgba(255,255,255,0.3) 0 1px 0 5px}.TM button.active,.TM button:active{background-image:none!important;background-color:#2952a3!important;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#4775d1),color-stop(50%,#2e5cb8),color-stop(51%,#2952a3),color-stop(100%,#24478f))!important;background-image:-webkit-linear-gradient(top,#4775d1,#2e5cb8 50%,#2952a3 51%,#24478f)!important;background-image:linear-gradient(top,#4775d1,#2e5cb8 50%,#2952a3 51%,#24478f)!important;color:white!important;text-shadow:#1f3d7a 0 -1px 0!important}.TM button,.TM button.white{background-image:none;background-color:#eee;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#fff),color-stop(50%,#fbfbfb),color-stop(51%,#eee),color-stop(100%,#e1e1e1));background-image:-webkit-linear-gradient(top,#fff,#fbfbfb 50%,#eee 51%,#e1e1e1);background-image:linear-gradient(top,#fff,#fbfbfb 50%,#eee 51%,#e1e1e1);color:#151515;text-shadow:white 0 1px 0}.TM button.gray{background-image:none;background-color:#444;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#6a6a6a),color-stop(50%,#515151),color-stop(51%,#444),color-stop(100%,#373737));background-image:-webkit-linear-gradient(top,#6a6a6a,#515151 50%,#444 51%,#373737);background-image:linear-gradient(top,#6a6a6a,#515151 50%,#444 51%,#373737);color:white;text-shadow:#2b2b2b 0 -1px 0}.TM button.red{background-image:none;background-color:#d83b38;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#e57a78),color-stop(50%,#dc504d),color-stop(51%,#d83b38),color-stop(100%,#ce2c28));background-image:-webkit-linear-gradient(top,#e57a78,#dc504d 50%,#d83b38 51%,#ce2c28);background-image:linear-gradient(top,#e57a78,#dc504d 50%,#d83b38 51%,#ce2c28);color:white;text-shadow:#b92724 0 -1px 0}.TM button.red.active,.TM button.red:active{background-image:none;background-color:#c12926;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#de5856),color-stop(50%,#d52e2b),color-stop(51%,#c12926),color-stop(100%,#ac2422));background-image:-webkit-linear-gradient(top,#de5856,#d52e2b 50%,#c12926 51%,#ac2422);background-image:linear-gradient(top,#de5856,#d52e2b 50%,#c12926 51%,#ac2422);color:white;text-shadow:#97201e 0 -1px 0}.TM button.green{background-image:none;background-color:#36c;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#7094db),color-stop(50%,#4775d1),color-stop(51%,#36c),color-stop(100%,#2e5cb8));background-image:-webkit-linear-gradient(top,#7094db,#4775d1 50%,#36c 51%,#2e5cb8);background-image:linear-gradient(top,#7094db,#4775d1 50%,#36c 51%,#2e5cb8);color:white;text-shadow:#2952a3 0 -1px 0}');

//
window.__appendStyle('.TM ul{padding:0;margin:5px 10px;-webkit-margin-collapse:separate;-webkit-box-shadow:rgba(255,255,255,0.15) 0 1px 0;box-shadow:rgba(255,255,255,0.15) 0 1px 0;border:1px solid #52657f}.TM ul,.TM li{background-color:white;text-shadow:white 0 1px 0}.TM ul li{border-top:1px solid #f2f2f2;list-style-type:none;overflow:hidden;padding:10px;-webkit-transform:translate3d(0,0,0)}.TM ul li.active{background-image:none;background-color:#36c;-webkit-box-shadow:#4372d0 0 1px 0 inset;box-shadow:#4372d0 0 1px 0 inset;color:white;text-shadow:#2952a3 0 -1px 0}.TM ul li.forward:before{content:"";position:absolute;display:block;width:24px;height:24px;top:50%;right:6px;margin-top:-12px;width:24px;height:24px;-webkit-border-radius:12px;border-radius:12px;background-image:none;background-color:#36c;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#7094db),color-stop(50%,#4775d1),color-stop(51%,#36c),color-stop(100%,#2e5cb8));background-image:-webkit-linear-gradient(top,#7094db,#4775d1 50%,#36c 51%,#2e5cb8);background-image:linear-gradient(top,#7094db,#4775d1 50%,#36c 51%,#2e5cb8);border:2px solid #fff;-webkit-box-shadow:0 1px 2px rgba(0,0,0,0.3);box-shadow:0 1px 2px rgba(0,0,0,0.3);-webkit-box-sizing:border-box;padding:0;z-index:10;line-height:0;pointer-events:none}.TM ul li.forward:after{color:white;text-shadow:#2952a3 0 -1px 0;filter:alpha(opacity=100);opacity:1;font-size:24px}.TM ul li.arrow:after,.TM ul li.forward:after{content:"›";width:22px;height:100%;vertical-align:middle;font-size:30px;line-height:38px;font-family:Futura,"Futura Condensed",Helvetica,Arial,sans-serif;font-weight:bold;filter:alpha(opacity=60);opacity:.6;position:absolute;right:0;top:0;pointer-events:none;z-index:10}.TM ul.rounded{-webkit-border-radius:8px;border-radius:8px}.TM ul.rounded li:first-child,.TM ul.rounded li:first-child a{border-top:0;-webkit-border-top-left-radius:8px;border-top-left-radius:8px;-webkit-border-top-right-radius:8px;border-top-right-radius:8px}.TM ul.rounded li:last-child,.TM ul.rounded li:last-child a{-webkit-border-bottom-left-radius:8px;border-bottom-left-radius:8px;-webkit-border-bottom-right-radius:8px;border-bottom-right-radius:8px}.TM ul.edgetoedge{margin:0;padding:0;border-width:0 0 0 1px;-webkit-border-radius:0;border-radius:0}.TM ul.edgetoedge li{-webkit-border-radius:0;border-radius:0}.TM ul.edgetoedge li:first-child{border-top:0}.TM ul.edgetoedge li.group{font-size:16px;padding:2px 10px;background-image:none;background-color:#cbd2d8;background-image:-webkit-gradient(linear,50% 0,50% 100%,color-stop(0%,#aeb9c2),color-stop(10%,#bcc5cd),color-stop(65%,#cbd2d8),color-stop(100%,#ccd3d9));background-image:-webkit-linear-gradient(top,#aeb9c2,#bcc5cd 10%,#cbd2d8 65%,#ccd3d9);background-image:linear-gradient(top,#aeb9c2,#bcc5cd 10%,#cbd2d8 65%,#ccd3d9);color:black;text-shadow:#e8ebee 0 1px 0;border-bottom:1px solid #b5c1c9;border-top:1px solid #b5c1c9}');

//
window.__appendStyle('::-webkit-input-placeholder{color:#8293a1;text-shadow:#e8ebee 0 1px 0}.TM input:not([type]),.TM input[type="text"],.TM input[type="password"],.TM input[type="tel"],.TM input[type="number"],.TM input[type="search"],.TM input[type="email"],.TM input[type="url"],.TM textarea,.TM select{height:26px;line-height:16px;color:black;text-shadow:#e8ebee 0 1px 0;font:normal 16px "Helvetica Neue",Helvetica;background:transparent none;border:0;padding:0;display:inline-block;margin-left:0;width:100%;-webkit-appearance:textarea;outline:0;padding:0 5px 0 5px;box-sizing:border-box;-webkit-border-radius:6px;border-radius:6px;-webkit-box-shadow:inset 0 1px 4px rgba(0,0,0,.2);box-shadow:inset 0 1px 4px rgba(0,0,0,.2);border:1px solid #aaa}.TM input:focus,.TM textarea:focus,.TM select:focus{-webkit-box-shadow:0 0 12px #387bbe}.TM textarea{height:120px;padding:0;text-indent:-2px}.TM input[type="checkbox"],.TM input[type="radio"]{margin:0;padding:10px}.TM input[type="checkbox"]:after,.TM input[type="radio"]:after{content:attr(title);position:absolute;display:block;width:0;left:21px;top:12px;font-family:"Helvetica Neue",Helvetica;font-size:17px;line-height:21px;width:246px;margin:0 0 0 17px;color:black;text-shadow:#e8ebee 0 1px 0}.TM input[type=\'submit\']{-webkit-border-radius:4px;border-radius:4px;background:-webkit-gradient(linear,0% 0,0% 100%,from(#eee),to(#9c9ea0));border:1px outset #aaa;display:block;font-size:inherit;font-weight:inherit;padding:10px}.TM input[type="checkbox"],.TM input[type="radio"]{color:#324f85}.TM .toggle{width:94px;position:relative;height:27px;display:block;overflow:hidden;float:right}.TM .toggle input[type="checkbox"]{margin:0;-webkit-border-radius:5px;border-radius:5px;height:27px;overflow:hidden;width:149px;border:0;-webkit-transition:left .15s ease-in-out;transition:left .15s ease-in-out;position:absolute;top:0;left:-55px;-webkit-appearance:textarea;-webkit-tap-highlight-color:rgba(0,0,0,0)}.TM .toggle input[type="checkbox"]:checked{left:0}.TM .toggle input[type="checkbox"]{background:transparent url(../img/apple/on_off.png) 0 0 no-repeat}');