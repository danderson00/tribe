(function () {
    // TODO: Refactor - the trigger and panel should be in separate panes. The rest is starting to get nasty now too...
    T.registerModel(function (pane) {
        var self = this;
        var data = pane.data;

        this.showTrigger = !data.trigger;

        var $inputElement;
        var $dropDownPanel;
        var $dropDownTrigger;

        var multipleSelect = data.multipleSelect === true;

        var items = ko.utils.unwrapObservable(data.items);
        items = data.itemFilter ? _.filter(items, data.itemFilter) : items;
        if (data.nullItemText)
            items.splice(0, 0, null);

        this.items = ko.observableArray(items);
        this.allowCreate = data.createFunction;

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

        if (multipleSelect) {
            var initialValues = ko.utils.unwrapObservable(data.value);
            if (!$.isArray(initialValues))
                initialValues = initialValues ? [initialValues] : [];

            this.selectedItem = ko.observableArray(initialValues);
        } else
            this.selectedItem = ko.observable(ko.utils.unwrapObservable(data.value));

        this.selectedText = ko.dependentObservable(function () {
            if (multipleSelect)
                return self.displayText(self.selectedItem().join(", "));
            else
                return self.displayText(self.selectedItem());
        });

        this.isItemSelected = function (item) {
            if (multipleSelect)
                return this.selectedItem.indexOf(item) > -1;
            return this.selectedItem() === item;
        };

        this.paneRendered = function () {
            $inputElement = $(pane.element).find('.dropDownNewItem input');
            $dropDownPanel = $(pane.element).children('.dropDownPanel');
            $dropDownTrigger = data.trigger ? $(data.trigger) : $(pane.element).children('.dropDownTrigger');

            $dropDownTrigger.bind('click', handleClick);

            $inputElement
                .keydown(function (event) {
                    event.stopPropagation();
                    if (event.which == 27)
                        hideDropDown();
                })
                .keypress(function (event) {
                    event.stopPropagation();
                    if (event.which == 13)
                        self.createNew();
                });

            $(pane.element).click(function (event) { event.stopPropagation(); });
            $(document).click(hideDropDown);

            if (data.singleUse) showDropDown();
        };

        this.renderComplete = setPosition;

        function setPosition() {
            if (elementIsFixed($dropDownTrigger)) {
                var top = $dropDownTrigger.offset().top + $dropDownTrigger.height() - $(window).scrollTop();
                var left = $dropDownTrigger.offset().left;
                $dropDownPanel.css('position', 'fixed').offset({ left: left, top: top });
            } else {
                var top = $dropDownTrigger.position().top + $dropDownTrigger.height() - $(window).scrollTop();
                var left = $dropDownTrigger.position().left;
                $dropDownPanel.css({ left: left, top: top });
            }
        }

        function handleClick(event) {
            $dropDownTrigger = $(event.target);
            setPosition();
            toggleDropDown();
            event.stopPropagation();
        }

        function toggleDropDown() {
            if ($dropDownPanel.is(':visible'))
                hideDropDown();
            else
                showDropDown();
        };

        function showDropDown() {
            $dropDownPanel.slideDown('fast', function () {
                if (!Configuration.mobile()) $inputElement.focus();
                checkHorizontalPosition($dropDownPanel);
                checkVerticalPosition($dropDownPanel);
            });
        }

        function hideDropDown() {
            $(pane.element).children('.dropDownPanel').slideUp('fast', function () {
                if (data.singleUse)
                    self.dispose();
            });
        };

        this.selectItem = function (item) {
            if (multipleSelect) {
                var index = self.selectedItem.indexOf(item);
                if (index > -1)
                    self.selectedItem.splice(index, 1);
                else
                    self.selectedItem.push(item);
                if (ko.isObservable(data.value))
                    data.value(self.selectedItem());
            } else {
                //self.items.unshift(self.items.splice())
                self.selectedItem(item);
                if (ko.isObservable(data.value))
                    data.value(item);
                hideDropDown();
            }

            if (item && item.select) item.select(item);
        };

        this.createNew = function () {
            if (data.createFunction) {
                var inputValue = $inputElement.val();
                if (inputValue) {
                    var newItem = data.createFunction(inputValue);
                    $inputElement.val('');
                    self.items.push(newItem);
                    data.items.push(newItem);
                    self.selectItem(newItem);
                    hideDropDown();
                }
            }
        };

        this.dispose = function() {
            if (data.singleUse)
                pane.remove();
            $(document).unbind('click', hideDropDown);
        };
    });
})();