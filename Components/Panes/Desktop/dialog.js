(function () {
    TC.registerModel(function (pane) {
        pane.node.skipPath = true;
        
        var self = this;
        var pubsub = pane.pubsub;
        var data = pane.data;
        var options = data.options ? data.options : {};

        this.pane = data.pane;
        this.id = options.id ? options.id : T.getUniqueId();
        this.showCloseButton = options.showCloseButton !== false;

        var dialogSelector = '#' + this.id;

        if (options.showLoadingDialog)
            centerDialog('.loadingDialog');

        if (options.closeOnNavigate)
            pubsub.subscribeOnce('navigating', closeDialog);

        this.paneRendered = function() {
            if (options.title)
                TC.createNode(pane.find('.dialogHeader'), { path: '/Common/contentHeader', data: { text: options.title } });
        };

        this.renderComplete = function () {
            positionDialog(dialogSelector, dialogSelector + ' .dialogContent');
            hideDialog('.loadingDialog');
            showDialog(dialogSelector + ':not(.loadingDialog)');

            if (options.modal !== false) {
                showDialog('.dialogBackgroundFilter');
                $(pane.element).bind('destroyed', function () { hideDialog('.dialogBackgroundFilter'); });
            }

            if(!options.reusable)
                $.when(TC.Utils.elementDestroyed($(dialogSelector + ' .dialogPane'))).done(function() {
                    pane.remove();
                });
        };

        this.dispose = function() {
            pubsub.publish('dialogClosed', { id: self.id });
        };

        function positionDialog(selector, contentSelector) {
            if (options.css)
                pane.find(selector).removeAttr('style').css(options.css);

            if (!hasVerticalPositionAttributes(options.css))
                centerVertically(selector, contentSelector);

            if (!hasHorizontalPositionAttributes(options.css))
                centerHorizontally(selector, contentSelector);
        }

        function hasHorizontalPositionAttributes(source) {
            return source && (source.left || source.right);
        }

        function hasVerticalPositionAttributes(source) {
            return source && (source.top || source.bottom);
        }

        function centerDialog(selector, contentSelector) {
            centerHorizontally(selector, contentSelector);
            centerVertically(selector, contentSelector);
        }

        function centerHorizontally(selector, contentSelector) {
            //var left = ($(window).width() - pane.find(selector).outerWidth()) / 2;

            //pane.find(selector).css({ left: left < 0 ? 0 : left });
            pane.find(selector).css({ left: 100 });

            if (contentSelector)
                pane.find(contentSelector).css({ maxWidth: $(this).parent().width() });
        }

        function centerVertically(selector, contentSelector) {
            //var top = ($(window).height() - pane.find(selector).outerHeight()) / 2;

            //pane.find(selector).css({ top: top < 65 ? 65 : top });
            pane.find(selector).css({ top: 100 });

            if (contentSelector)
                pane.find(contentSelector).css({ maxHeight: $(this).parent().height() - 65 });

        }

        function hideDialog(selector) {
            pane.find(selector).hide();
        }

        function showDialog(selector) {
            pane.find(selector).fadeIn(200);
        }

        function closeDialog() {
            pane.remove();
        }
        this.closeDialog = closeDialog;
    });
})();

TC.dialog = function (pane, options) {
    options = options || {};
    var element = options.element ? $(options.element) : 'body';
    pane = typeof (pane) == 'string' ? { path: pane } : pane;
    options.id = options.id ? options.id : T.getUniqueId();
    var title = ko.observable(options.title);
    options.title = options.title && title;

    var node = TC.appendNode(element, { path: '/Common/dialog', id: options.id, data: { pane: pane, options: options } }, options.node);
    return {
        node: node,
        close: node.pane.remove,
        transitionTo: function (paneOptions, newTitle) {
            title(newTitle);
            node.children[0].transitionTo(paneOptions);
        }
    };
};
TC.overlay = TC.dialog;

TC.Types.Pane.prototype.dialog = function (pane, options) {
    return TC.dialog(pane, $.extend({ node: this.node }, options));
};