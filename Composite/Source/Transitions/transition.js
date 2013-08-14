TC.transition = function (target, transition, reverse) {
    var node;
    var pane;
    var element;
    setState();
    
    transition = transition || (pane && pane.transition) || (node && node.transition);
    var implementation = TC.Transitions[transition];
    if (reverse && implementation && implementation.reverse)
        implementation = TC.Transitions[implementation.reverse];

    return {
        in: function () {
            $(element).show();
            return implementation && implementation.in(element);
        },
        
        out: function (remove) {
            setTransitionMode();
            
            var promise = implementation && implementation.out(element);
            $.when(promise).done(removeElement);
            return promise;
            
            function removeElement() {
                if (remove === false) {
                    $(element).hide().attr('style', '');
                } else
                    $(element).remove();
            }
        },
        
        to: function (paneOptions, remove) {
            var context = TC.context();
            if (node)
                TC.Utils.insertPaneAfter(node, element, TC.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), context);
            else
                TC.insertNodeAfter(element, TC.Utils.getPaneOptions(paneOptions, { transition: transition, reverseTransitionIn: reverse }), null, context);
            this.out(remove);
            return context.renderOperation.promise;
        }
    };
    
    function setTransitionMode() {
        var $element = $(element);
        if (TC.transition.mode === 'fixed')
            $element.css({
                position: 'fixed',
                left: $element.offset().left,
                top: $element.offset().top
            });
        else
            $element.css({
                position: 'absolute',
                width: $element.width(),
                left: $element.position().left,
                top: $element.position().top
            });
    }

    function setState() {
        if (!target) throw "No target passed to TC.transition";
        
        if (target.constructor === TC.Types.Node) {
            node = target;
            pane = node.pane;
            element = pane.element;
        } else if (target.constructor === TC.Types.Pane) {
            pane = target;
            node = pane.node;
            element = pane.element;
        } else {
            element = target;
        }
    }    
};