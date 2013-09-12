//ko.bindingHandlers['validationMessage'] = {
//    init: function (element, valueAccessor) {
//        var id = uuid.v4();
//        var observable = valueAccessor();
//        var $parent = $(element).parent();
//        var $targetElement;

//        if ($parent.hasClass('display'))
//            $targetElement = $parent.parent().parent();
//        else {
//            var $prev = $(element).prev();
//            $targetElement = $prev.attr('type') === 'hidden' ? $prev.prev() : $prev;
//        }
//        var error = ko.observable();
//        var pane = TC.insertNodeAfter($targetElement, {
//            path: '/Common/tooltip',
//            data: { html: error, position: 'auto', target: $targetElement, timeout: 3000, topic: id }
//        });
//        $targetElement.next().addClass('validationMessage');
//        observable.subscribe(function () {
//            if (observable.isModified && observable.isModified()) {
//                TC.context().pubsub.publish(observable.isValid() ? 'tooltip.hide' : 'tooltip.show', { topic: id, immediate: true });
//                error(observable.error);
//            }
//        });
//        return { controlsDescendantBindings: true };
//    }
//};
