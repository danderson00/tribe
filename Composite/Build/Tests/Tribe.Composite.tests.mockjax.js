$.mockjax({
    url: 'Integration/Panes/Events/async.htm',
    responseText: '<div class="async">\n    <span data-bind="text: message" class="message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/async.js',
    responseText: 'T.registerModel(function (pane) {\n    this.message = \'test message\';\n    \n    this.paneRendered = function() {\n        if (Test.state.paneRendered) Test.state.paneRendered();\n    };\n\n    this.renderComplete = function() {\n        if (Test.state.renderComplete) Test.state.renderComplete();\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/asyncParent.htm',
    responseText: '<div data-bind="pane: \'async\'">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/asyncParent.js',
    responseText: 'T.registerModel(function (pane) {\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basic.css',
    responseText: '.basic {}',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basic.htm',
    responseText: '<div class="basic">\n    <span data-bind="text: message" class="message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basic.js',
    responseText: 'T.registerModel(function (pane) {\n    var self = this;\n    \n    Test.state.model = this;\n    Test.state.pane = pane;\n\n    this.message = \'\';\n    this.paneRenderedCalled = false;\n    this.renderCompleteCalled = false;\n    this.disposeCalled = false;\n    \n    this.initialise = function() {\n        self.message = \'test message\';\n    };\n\n    this.paneRendered = function() {\n        self.paneRenderedCalled = true;\n    };\n\n    this.renderComplete = function() {\n        self.renderCompleteCalled = true;\n    };\n\n    this.dispose = function() {\n        self.disposeCalled = true;\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/basicParent.htm',
    responseText: '<div data-bind="pane: \'basic\'" class="basicContainer">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/data.htm',
    responseText: '<div class="data">\n    <span class="message" data-bind="text: message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/data.js',
    responseText: 'T.registerModel(function(pane) {\n    this.message = pane.data;\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/dispose.htm',
    responseText: '<div class="dispose">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/dispose.js',
    responseText: 'T.registerModel(function (pane) {\n    Test.state.disposeCallCount = 0;\n    Test.state.disposed = $.Deferred();\n    \n    this.dispose = function() {\n        Test.state.disposed.resolve();\n        Test.state.disposeCallCount++;\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialise.htm',
    responseText: '<div class="initialise"></div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialise.js',
    responseText: 'T.registerModel(function (pane) {\n    this.initialise = function() {\n        return Test.state.deferred = $.Deferred();\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialiseParent.htm',
    responseText: '<div data-bind="pane: \'initialise\'">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Events/initialiseParent.js',
    responseText: 'T.registerModel(function (pane) {\n    this.renderComplete = function() {\n        Test.state.parentRenderCompleteCalled = true;\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/History/content1.htm',
    responseText: '<div class="content1">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/History/content2.htm',
    responseText: '<div class="content2">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/History/layout.htm',
    responseText: '<div class="layout">\n    <div data-bind="pane: \'content1\', handlesNavigation: true"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/child1.htm',
    responseText: '<div class="child1">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/child2.htm',
    responseText: '<div class="child2">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/content1.htm',
    responseText: '<div class="content1">\n    <div data-bind="pane: \'child1\'"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/content2.htm',
    responseText: '<div class="content2">\n    <div data-bind="pane: \'child2\'"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Navigate/layout.htm',
    responseText: '<div class="layout">\n    <div data-bind="pane: \'content1\', handlesNavigation: true"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/common.htm',
    responseText: '<div class="common">\n    <div data-bind="pane: pane"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/common.js',
    responseText: 'T.registerModel(function(pane) {\n    pane.node.skipPath = true;\n    this.pane = pane.data.pane;\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/Subfolder/child.htm',
    responseText: '<div class="child">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/Subfolder/parent.htm',
    responseText: '<div class="parent">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Paths/Subfolder/parent.js',
    responseText: 'T.registerModel(function(pane) {\n    this.renderComplete = function() {\n        T.createNode(\'.parent\', { path: \'/Paths/common\', data: { pane: \'child\' } });\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/PubSub/subscriber.htm',
    responseText: '<div class="subscriber">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/PubSub/subscriber.js',
    responseText: 'T.registerModel(function(pane) {\n    pane.pubsub.subscribe(\'test\', function(data) {\n        $(\'.subscriber\').text(data);\n    });\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Transition/pane1.htm',
    responseText: '<div class="pane1">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Transition/pane2.htm',
    responseText: '<div class="pane2">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/1.htm',
    responseText: '<div class="1" data-bind="pane: \'11\'">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/1.js',
    responseText: 'T.registerModel(function (pane) {\n    Test.state.pane = pane;\n\n    this.renderComplete = function() {\n        if (Test.state.renderComplete) Test.state.renderComplete();\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/11.htm',
    responseText: '<div class="11">\n    <div data-bind="pane: \'111\'"></div>\n    <div data-bind="pane: \'112\'"></div>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/111.htm',
    responseText: '<div class="111">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/112.htm',
    responseText: '<div class="112">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Tree/12.htm',
    responseText: '<div class="12">\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/child.htm',
    responseText: '<div class="child">\n    <span class="message" data-bind="text: message"></span>\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/child.js',
    responseText: 'T.registerModel(function(pane) {\n    this.message = "test message";\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/dynamicParent.htm',
    responseText: '<div class="dynamicParent">\n\n</div>',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/dynamicParent.js',
    responseText: 'T.registerModel(function(pane) {\n    this.paneRendered = function() {\n        T.createNode(\'.dynamicParent\', { path: \'child\' });\n    };\n});',
    responseTime: 0
});
$.mockjax({
    url: 'Integration/Panes/Utilities/parent.htm',
    responseText: '<div class="parent" data-bind="pane: \'child\'">\n\n</div>',
    responseTime: 0
});

$.mockjax({ url: 'Integration/Panes/Events/async.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/asyncParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/basicParent.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/basicParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/data.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/dispose.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/initialise.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Events/initialiseParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/content2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/layout.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/History/layout.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/child2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/content2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/layout.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Navigate/layout.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/common.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/Subfolder/child.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/Subfolder/child.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Paths/Subfolder/parent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/PubSub/subscriber.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane1.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane2.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Transition/pane2.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/1.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/11.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/11.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/111.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/111.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/112.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/112.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/12.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Tree/12.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/child.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/dynamicParent.css', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/parent.js', status: 404, responseTime: 0 });
$.mockjax({ url: 'Integration/Panes/Utilities/parent.css', status: 404, responseTime: 0 });
