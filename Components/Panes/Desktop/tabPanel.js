// needs a big ol' refactor
(function () {
    TC.registerModel(function (pane) {
        var pubsub = pane.pubsub;
        var data = pane.data;

        var self = this;
        this.loggedOn = CurrentUser.isAuthenticated;
        this.tabs = data.tabs;
        this.pane = pane;

        var currentTab;
        var panes = {};
        var tabPanel;

        var dock = data.dock;
        if (!dock) dock = 'top';
        var tabPanelClass = dock + 'TabPanel';
        var implementation = dockImplementation();
        this.tooltipPosition = implementation.tooltipPosition;

        this.paneRendered = function () {
            // using the attr binding to set a class does not seem reliable, do it here instead    
            tabPanel = $(pane.element).children('.tabPanel');
            tabPanel.addClass(tabPanelClass);
            implementation.initialise();
            tabPanel.show();

            var autoOpenTab = _.find(self.tabs, function (tab) { return tab.autoOpen === true; });
            if (autoOpenTab)
                toggle(autoOpenTab);
        };

        this.click = function (item) {
            var clickData = _.isFunction(item.data) ? item.data() : item.data;
            if (item.action && item.action === 'slide') {
                toggle(item);
            } else {
                if (item.pane)
                    pane.navigate(item.pane, clickData);
                else if (item.process)
                    Process[item.process](pane);
                else if (item.dialog)
                    TC.dialog(item.dialog, { modal: true });
                else if (item.publish)
                    pubsub.publish(item.publish.message, item.publish.data);
            }
        };

        function toggle(tab) {
            if (!currentTab)
                open(tab);
            else if (currentTab === tab)
                close(currentTab);
            else {
                close(currentTab);
                open(tab);
            }
        }

        function open(tab) {
            $.when(tabLoaded(tab)).done(function () {
                implementation.open(tab);
                setSelectedTab(tab);
                currentTab = tab;
                pubsub.publish('tabOpened', panes[tab.text]);

                if (tab.closeOnNavigate)
                    pubsub.subscribeOnce('__navigate', function () {
                        close(tab);
                    });
            });
        }

        function close(tab) {
            implementation.close(tab);
            setSelectedTab();
            currentTab = null;
            pubsub.publish('tabClosed', panes[tab.text]);
        }

        function tabLoaded(tab) {
            if (panes[tab.text] == null) {
                var element = $('<div></div>').addClass('tabContent subpanel').appendTo(tabPanel);
                var context = TC.context();
                var renderOperation = context.renderOperation;
                var node = TC.appendNode(element, {
                    path: tab.pane,
                    data: tab.data,
                }, null, context);
                panes[tab.text] = node.pane;
                return renderOperation.promise;
            }
        }

        function setSelectedTab(tab) {
            $(pane.element).find('.tabSelected').removeClass('tabSelected');
            $(pane.element).find('.tabButton:eq(' + _.indexOf(self.tabs, tab) + ')').addClass('tabSelected');
        }

        function dockImplementation() {
            var implementations = {
                top: {
                    initialise: function () { },
                    tooltipPosition: 'below',
                    open: function (tab) {
                        $(panes[tab.text].element)
                            .css('min-width', $(pane.element).find('.tabButtonContainer').width() - 1)
                            .parent()
                            .stop(true, true)
                            .slideDown('fast');
                    },
                    close: function (tab) {
                        $(panes[tab.text].element).parent().slideUp('fast');
                    }
                },
                right: {
                    initialise: function () {
                        var $container = $('.rightTabPanel .tabButtonContainer');
                        $container.hover(function () {
                            $container.animate({ 'right': 0 }, 'fast');
                        }, function () {
                            $container.animate({ 'right': -63 }, 'fast');
                        });

                    },
                    tooltipPosition: 'left',
                    open: function (tab) {
                        $(panes[tab.text].element)
                            .css('min-height', $(pane.element).find('.tabButtonContainer').height())
                            .parent()
                            .stop(true, true)
                            .show('fast');
                    },
                    close: function (tab) {
                        $(panes[tab.text].element).parent().hide('fast');
                    }

                }
            };

            if (!implementations[dock])
                throw 'Dock type ' + dock + ' not implemented.';

            return implementations[dock];
        };

        pubsub.subscribe('closeTab', function (paneToClose) {
            if (currentTab && panes[currentTab.text] === paneToClose)
                close(currentTab);
        });

    });
})();