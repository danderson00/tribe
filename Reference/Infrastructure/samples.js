Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n&lt;input data-bind="value: task" />\n&lt;button data-bind="click: create">Create&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">// Declare model constructors using this simple function.\n// Tribe creates an instance and binds it to the template.\n\nTC.registerModel(function (pane) {\n    var self = this;\n    \n    this.task = ko.observable();\n    \n    this.create = function() {\n        pane.pubsub.publish(\'task.create\', self.task());\n        self.task(\'\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Todos&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">\n            // all the configuration you need!\n            $(TC.run);\n        &lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'layout\'">&lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Todos&lt;/h1>\n\n&lt;!-- Creating panes is simple -->\n&lt;div data-bind="pane: \'create\'">&lt;/div>\n&lt;div data-bind="pane: \'list\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* CSS can be maintained alongside the \n   template it corresponds with */\n\n.taskList {\n    list-style: none;\n    padding: 0;\n}\n\n.taskList li {\n    padding: 5px;\n}</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n&lt;ul class="taskList" data-bind="foreach: tasks">\n    &lt;li data-bind="pane: \'task\', data: $data">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.tasks = ko.observableArray([\'Sample task\']);\n\n    // Using messages decouples your components.\n    // Tribe cleans up subscriptions automatically.\n    pane.pubsub.subscribe(\'task.create\', function(task) {\n        self.tasks.push(task);\n    });\n\n    pane.pubsub.subscribe(\'task.delete\', function (task) {\n        var index = self.tasks.indexOf(task);\n        self.tasks.splice(index, 1);\n    });\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n&lt;button data-bind="click: deleteTask">x&lt;/button>\n&lt;span data-bind="text: task">&lt;/span></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.task = pane.data;\n    \n    this.deleteTask = function() {\n        pane.pubsub.publish(\'task.delete\', self.task);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div data-bind="pane: \'sender\'">&lt;/div>\n&lt;div data-bind="pane: \'messages\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Hook up our message hub and join a channel\n    TMH.initialise(pane.pubsub, \'signalr\');\n    TMH.joinChannel(\'chat\', {\n         serverEvents: [\'chat.*\']\n    });\n\n    // The dispose function is called automatically\n    // when the pane is removed from the DOM.\n    this.dispose = function() {\n        TMH.leaveChannel(\'chat\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Todos&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">\n            $(TC.run);\n        &lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'chat\'">&lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.messages {\n    list-style: none;\n    padding: 0;\n}\n\n.messages li {\n    padding: 5px;\n}</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="messages" data-bind="foreach: messages">\n    &lt;li>\n        &lt;span data-bind="text: name">&lt;/span>:\n        &lt;span data-bind="text: message">&lt;/span>\n    &lt;/li>\n&lt;/ul>\n</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.messages = ko.observableArray();\n\n    pane.pubsub.subscribe(\'chat.message\',\n        function (message) {\n            self.messages.push(message);\n        });\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="chat">\n    &lt;div>\n        Name: &lt;input data-bind="value: name" />    \n    &lt;/div>\n\n    &lt;div>\n        Message: &lt;input data-bind="value: message" />\n        &lt;button data-bind="click: send">Send&lt;/button>\n    &lt;/div>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.name = ko.observable(\'Anonymous\');\n    this.message = ko.observable();\n\n    this.send = function() {\n        pane.pubsub.publish(\'chat.message\', {\n            name: self.name(),\n            message: self.message()\n        });\n        self.message(\'\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Let\'s reuse our panes from the previous example -->\n&lt;ul class="rounded">\n    &lt;li data-bind="pane: \'../Chat/sender\'">&lt;/li>\n    &lt;li data-bind="pane: \'../Chat/messages\'">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n  &lt;head>\n    &lt;title>Tribe Mobile&lt;/title>\n    &lt;meta name="viewport" \n      content="minimum-scale=1.0, width=device-width, \n               maximum-scale=1.0, user-scalable=no" />\n\n    &lt;script src="jquery.js">&lt;/script>\n    &lt;script src="knockout.js">&lt;/script>\n    &lt;script src="Tribe.js">&lt;/script>\n    &lt;script src="Tribe.Mobile.js">&lt;/script>\n        \n    &lt;script type="text/javascript">\n      $(TC.run);\n    &lt;/script>\n  &lt;/head>\n  &lt;body data-bind="pane: \'/Mobile/main\',\n                   data: { pane: \'welcome\' }">\n  &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="layout">\n    &lt;ul class="rounded">\n        &lt;li class="forward">Test1&lt;/li>\n        &lt;li class="forward">Test2&lt;/li>\n        &lt;li class="arrow" data-bind="click: function() {}">Test3&lt;/li>\n        &lt;li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New Player...\', }">&lt;/li>\n    &lt;/ul>\n    \n    &lt;div data-bind="pane: \'/Mobile/list\', data: listData">&lt;/div>\n    \n    &lt;button class="white" data-bind="click: overlay">Overlay&lt;/button>\n    &lt;button class="white" data-bind="click: toolbar">Toolbar&lt;/button>\n    &lt;button class="white" data-bind="click: navigate">Navigate&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'layout.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.title(\'Title!\');\n    TC.toolbar.options([\n        { text: \'test\', func: function () { alert(\'test\'); } },\n        { text: \'test2\', func: function () { alert(\'test2\'); } }\n    ]);\n\n    this.listData = {\n        items: [\n            { id: 1, name: \'test1\' },\n            { id: 2, name: \'test2\' },\n            { id: 3, name: \'test3\' }\n        ],\n        itemText: function (item) { return item.id + \': \' + item.name; },\n        headerText: \'Select Item:\',\n        itemClick: function(item) {\n        },\n        cssClass: \'rounded\'\n    };\n\n    this.overlay = function() {\n        TC.overlay(\'overlay\');\n    };\n\n    this.toolbar = function () {\n        TC.toolbar.visible(!TC.toolbar.visible());\n    };\n\n    this.navigate = function() {\n        pane.navigate(\'navigate\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'overlay.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul>\n    &lt;li>One&lt;/li>\n    &lt;li>Two&lt;/li>\n    &lt;li>Three&lt;/li>\n    &lt;li>Four&lt;/li>\n&lt;/ul>\n\n&lt;button class="white" data-bind="click: function() { pane.remove(); }">Close&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">ul.welcome li {\n    background: #103070;\n    color: white;\n    text-align: center;\n    text-shadow: 3px 3px 0 black, 5px 5px 5px rgba(0, 0, 0, 0.5);\n    font: bold 64pt \'Cambria\';\n}</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="rounded welcome">\n    &lt;li>tribe&lt;/li>\n&lt;/ul>\n&lt;ul class="rounded">\n    &lt;li data-bind="click: samples">Samples&lt;/li>\n&lt;/ul>\n&lt;ul class="rounded">\n    &lt;li data-bind="click: chat">Chat&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.defaults.back = true;\n\n    this.samples = function() {\n        pane.navigate(\'layout\');\n    };\n\n    this.chat = function () {\n        pane.navigate(\'chat\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our heading pretty */\n.helloWorld h1 {\n    text-shadow: 3px 3px 0 #AAA;\n}</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="helloWorld">\n    &lt;h1>Hello, World!&lt;/h1>\n\n    &lt;!-- Bind our message property -->\n    &lt;span data-bind="text: message">&lt;/span>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Model properties are available for \n    // data binding in your template.\n    this.message = "Message passed: " + pane.data.message;\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Creating Panes&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">$(TC.run)&lt;/script>\n    &lt;/head>\n    \n    &lt;!-- Create a pane and pass it some data -->\n    &lt;body data-bind="pane: \'helloWorld\',\n                     data: { message: \'Test message.\' }">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;button data-bind="click: createPane">Create Pane&lt;/button>\n\n&lt;!-- New panes will be appended to this element -->\n&lt;div class="items">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var i = 0;\n    \n    // Dynamically insert a pane into the element\n    // with its class set to "items".\n    this.createPane = function() {\n        TC.appendNode(\'.items\', { path: \'item\', data: ++i });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Creating Panes Dynamically&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'create\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is pane number \n\n    &lt;!-- If our pane doesn\'t have a model, you can access \n         the pane property in data bindings -->\n    &lt;span data-bind="text: pane.data">&lt;/span>.\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Communicating&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.panels > div {\n    margin-bottom: 5px;\n    border: 1px solid black;\n}</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="panels">\n    &lt;!-- Pass the shared observable to child panes -->\n\n    &lt;div data-bind="pane: \'sender\',\n                    data: observable">&lt;/div>\n\n    &lt;div data-bind="pane: \'receiver\',\n                    data: observable">&lt;/div>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Create an observable to share between child panes\n    this.observable = ko.observable(\'Test\');\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    Observable: &lt;span data-bind="text: observable">&lt;/span>\n&lt;/div>\n\n&lt;div>\n    Messages:\n    &lt;ul data-bind="foreach: messages">\n        &lt;li data-bind="text: message">&lt;/li>\n    &lt;/ul>\n&lt;/div>\n</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    // Our shared observable\n    this.observable = pane.data;\n    \n    // Listen for messages and push them onto \n    // an array as they arrive\n    this.messages = ko.observableArray();\n    pane.pubsub.subscribe(\'sample.message\', function (data) {\n        self.messages.push(data);\n    });\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    Observable: &lt;input data-bind="value: observable" />\n&lt;/div>\n\n&lt;div>\n    Message: &lt;input data-bind="value: message"/>\n    &lt;button data-bind="click: send">Send&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n    \n    // Our shared observable\n    this.observable = pane.data;\n    \n    // The pubsub object is available through the pane object.\n    this.message = ko.observable();\n    this.send = function() {\n        pane.pubsub.publish(\'sample.message\',\n            { message: self.message() });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;button data-bind="click: createPane">Create Pane&lt;/button>\n&lt;div class="items">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var i = 0;\n    \n    this.createPane = function() {\n        TC.appendNode(pane.find(\'.items\'),\n            { path: \'item\', data: ++i });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Pane Lifecycle&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'create\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is pane number &lt;span data-bind="text: data">&lt;/span>.\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    this.data = pane.data;\n\n    // The initialise function is called before the pane\n    // is rendered. If you return a jQuery deferred object,\n    // Tribe will wait for it to resolve before continuing.\n    \n    this.initialise = function() {\n        var promise = $.Deferred();\n        setTimeout(promise.resolve, 500);\n        return promise;\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is the first pane in our navigation stack.\n&lt;/div>\n&lt;button data-bind="click: next">Next&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.next = function() {\n        pane.navigate(\'second\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Navigating&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The handlesNavigation binding marks the underlying node\n     as the node that should transition on navigation -->\n\n&lt;div data-bind="pane: \'first\', handlesNavigation: \'fade\'">\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    This is the second pane in our navigation stack.\n&lt;/div>\n&lt;button data-bind="click: back">Back&lt;/button>\n&lt;button data-bind="click: next">Next&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.back = function () {\n        pane.navigateBack();\n    };\n\n    this.next = function () {\n        pane.navigate(\'third\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div>\n    And the last one!\n&lt;/div>\n&lt;button data-bind="click: back">Back&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.back = function() {\n        pane.navigateBack();\n    };\n});</pre>'
});