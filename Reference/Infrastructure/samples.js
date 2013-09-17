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
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Hook up our message hub and join a channel\n    TMH.initialise(pane.pubsub);\n    TMH.joinChannel(\'chat\', {\n         serverEvents: [\'chat.*\']\n    });\n\n    // The dispose function is called automatically\n    // when the pane is removed from the DOM.\n    this.dispose = function() {\n        TMH.leaveChannel(\'chat\');\n    };\n});</pre>'
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
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n  &lt;head>\n    &lt;title>Tribe Mobile&lt;/title>\n    \n    &lt;!-- Some metadata for mobile browsers -->\n    &lt;meta name="viewport"\n          content="minimum-scale=1.0, width=device-width, \n                   maximum-scale=1.0, user-scalable=no" />\n     \n    &lt;script src="jquery.js">&lt;/script>\n    &lt;script src="knockout.js">&lt;/script>\n    &lt;script src="Tribe.js">&lt;/script>\n\n    &lt;!-- Tribe.Mobile.js is all you need to load -->\n    &lt;script src="Tribe.Mobile.js">&lt;/script>\n\n    &lt;script type="text/javascript">\n        $(TC.run);\n    &lt;/script>\n  &lt;/head>\n\n  &lt;!-- Use /Mobile/main as your host pane -->\n  &lt;body data-bind="pane: \'/Mobile/main\',\n                   data: { pane: \'welcome\' }">\n  &lt;/body>\n&lt;/html>\n</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'navigate.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul>&lt;li>You selected an item in the list...&lt;/li>&lt;/ul>\n&lt;ul>&lt;li>Click the back button to go back.&lt;/li>&lt;/ul>\n</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'overlay.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul>\n    &lt;li>One&lt;/li>\n    &lt;li>Two&lt;/li>\n    &lt;li>Three&lt;/li>\n    &lt;li>Four&lt;/li>\n&lt;/ul>\n\n&lt;button class="white" \n        data-bind="click: function() { pane.remove(); }">\n    Close\n&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'samples.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="layout">\n    &lt;ul class="rounded">\n        &lt;li>\n            Display any HTML in themed blocks\n        &lt;/li>\n        &lt;li class="arrow" data-bind="click: navigate">\n            With arrow...\n        &lt;/li>\n        &lt;li class="forward" data-bind="click: navigate">\n            Alternate arrow...\n        &lt;/li>\n        &lt;li data-bind="pane: \'/Mobile/editable\',\n                       data: { initialText: \'New Item...\', }">&lt;/li>\n    &lt;/ul>\n    \n    &lt;div data-bind="pane: \'/Mobile/list\', data: listData">&lt;/div>\n    \n    &lt;button class="white" data-bind="click: overlay">\n        Overlay\n    &lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'samples.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.title(\'Title!\');\n    \n    TC.toolbar.options([\n        { text: \'Option 1\', func: function () { } },\n        { text: \'Option 2\', func: function () { } }\n    ]);\n\n    this.listData = {\n        items: [\n            { id: 1, name: \'Item 1\' },\n            { id: 2, name: \'Item 2\' }\n        ],\n        itemText: function(item) {\n             return item.id + \' - \' + item.name;\n        },\n        headerText: \'Select List\',\n        itemClick: function(item) { }\n    };\n\n    this.overlay = function() {\n        TC.overlay(\'overlay\');\n    };\n\n    this.navigate = function() {\n        pane.navigate(\'navigate\');\n    };\n});</pre>'
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
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.defaults.back = true;\n\n    this.samples = function() {\n        pane.navigate(\'samples\');\n    };\n\n    this.chat = function () {\n        pane.navigate(\'chat\');\n    };\n});</pre>'
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
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */\n\n.folders { \n    background-color: #bbb; \n    list-style-type: none; \n    padding: 0; \n    margin: 0; \n    border-radius: 7px; \n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),\n                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); \n    margin: 10px 0 16px 0;\n    font-size: 0px;\n}\n\n.folders li:hover {\n     background-color: #ddd;\n}    \n\n.folders li:first-child {\n     border-left: none; \n     border-radius: 7px 0 0 7px;\n}\n\n.folders li {\n     font-size: 16px; \n     font-weight: bold; \n     display: inline-block; \n     padding: 0.5em 1.5em; \n     cursor: pointer; \n     color: #444; \n     text-shadow: #f7f7f7 0 1px 1px; \n     border-left: 1px solid #ddd; \n     border-right: 1px solid #888;\n}\n\n.folders li {\n     *display: inline !important;\n} /* IE7 only */\n\n.folders .selected {\n     background-color: #444 !important; \n     color: white; \n     text-shadow: none; \n     border-right-color: #aaa; \n     border-left: none; \n     box-shadow: inset 1px 2px 6px #070707;\n}    \n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- A simple list of the folder names.\n     Apply the "selected" CSS class to the selected folder.\n     On click, set the selected folder -->\n\n&lt;ul class="folders" data-bind="foreach: folders">\n    &lt;li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectedFolder">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">// Our model just contains a list of folders and\n// an observable to hold the selected folder.\n\nTC.registerModel(function (pane) {\n    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];\n    this.selectedFolder = ko.observable(\'Inbox\');\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'folders\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */\n\n.folders { \n    background-color: #bbb; \n    list-style-type: none; \n    padding: 0; \n    margin: 0; \n    border-radius: 7px; \n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),\n                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); \n    margin: 10px 0 16px 0;\n    font-size: 0px;\n}\n\n.folders li:hover {\n     background-color: #ddd;\n}    \n\n.folders li:first-child {\n     border-left: none; \n     border-radius: 7px 0 0 7px;\n}\n\n.folders li {\n     font-size: 16px; \n     font-weight: bold; \n     display: inline-block; \n     padding: 0.5em 1.5em; \n     cursor: pointer; \n     color: #444; \n     text-shadow: #f7f7f7 0 1px 1px; \n     border-left: 1px solid #ddd; \n     border-right: 1px solid #888;\n}\n\n.folders li {\n     *display: inline !important;\n} /* IE7 only */\n\n.folders .selected {\n     background-color: #444 !important; \n     color: white; \n     text-shadow: none; \n     border-right-color: #aaa; \n     border-left: none; \n     box-shadow: inset 1px 2px 6px #070707;\n}    \n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The click binding is now to the selectFolder function -->\n\n&lt;ul class="folders" data-bind="foreach: folders">\n    &lt;li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n    \n    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];\n    this.selectedFolder = ko.observable(pane.data.folder);\n\n    // We\'ve added a separate click handler to navigate\n    // when a folder is selected.\n    this.selectFolder = function (folder) {\n        self.selectedFolder(folder);\n        pane.navigate(\'mails\', { folder: folder });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The handlesNavigation binding tells Tribe to use that node for navigation. -->\n\n&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div>\n&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.mails {\n    width: 100%;\n    table-layout: fixed;\n    border-spacing: 0;\n}\n\n.mails th {\n    background-color: #bbb;\n    font-weight: bold;\n    color: #444;\n    text-shadow: #f7f7f7 0 1px 1px;\n}\n\n.mails tbody tr:hover {\n    cursor: pointer;\n    background-color: #68c !important;\n    color: White;\n}\n\n.mails th, .mails td {\n    text-align: left;\n    padding: 0.4em 0.3em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.mails td {\n    border: 0;\n}\n\n.mails th {\n    border: 0;\n    border-left: 1px solid #ddd;\n    border-right: 1px solid #888;\n    padding: 0.4em 0 0.3em 0.7em;\n}\n\n.mails th:nth-child(1), .mails td:nth-child(1) {\n    width: 20%;\n}\n\n.mails th:nth-child(2), .mails td:nth-child(2) {\n    width: 15%;\n}\n\n.mails th:nth-child(3), .mails td:nth-child(3) {\n    width: 45%;\n}\n\n.mails th:nth-child(4), .mails td:nth-child(4) {\n    width: 15%;\n}\n\n.mails th:last-child {\n    border-right: none;\n}\n\n.mails tr:nth-child(even) {\n    background-color: #EEE;\n}\n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;table class="mails" data-bind="with: data">\n    &lt;thead>\n        &lt;tr>\n            &lt;th>From&lt;/th>\n            &lt;th>To&lt;/th>\n            &lt;th>Subject&lt;/th>\n            &lt;th>Date&lt;/th>\n        &lt;/tr>\n    &lt;/thead>\n\n    &lt;tbody data-bind="foreach: mails">\n        &lt;tr>\n            &lt;td data-bind="text: from">&lt;/td>\n            &lt;td data-bind="text: to">&lt;/td>\n            &lt;td data-bind="text: subject">&lt;/td>\n            &lt;td data-bind="text: date">&lt;/td>\n        &lt;/tr>     \n    &lt;/tbody>\n&lt;/table></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = ko.observable();\n\n    // Load data using AJAX to our data property    \n    this.initialise = function() {\n        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */\n\n.folders { \n    background-color: #bbb; \n    list-style-type: none; \n    padding: 0; \n    margin: 0; \n    border-radius: 7px; \n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),\n                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); \n    margin: 10px 0 16px 0;\n    font-size: 0px;\n}\n\n.folders li:hover {\n     background-color: #ddd;\n}    \n\n.folders li:first-child {\n     border-left: none; \n     border-radius: 7px 0 0 7px;\n}\n\n.folders li {\n     font-size: 16px; \n     font-weight: bold; \n     display: inline-block; \n     padding: 0.5em 1.5em; \n     cursor: pointer; \n     color: #444; \n     text-shadow: #f7f7f7 0 1px 1px; \n     border-left: 1px solid #ddd; \n     border-right: 1px solid #888;\n}\n\n.folders li {\n     *display: inline !important;\n} /* IE7 only */\n\n.folders .selected {\n     background-color: #444 !important; \n     color: white; \n     text-shadow: none; \n     border-right-color: #aaa; \n     border-left: none; \n     box-shadow: inset 1px 2px 6px #070707;\n}    \n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="folders" data-bind="foreach: folders">\n    &lt;li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];\n    this.selectedFolder = ko.observable(pane.data.folder);\n\n    this.selectFolder = function (folder) {\n        self.selectedFolder(folder);\n        pane.navigate(\'mails\', { folder: folder });\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;!-- Dependencies and bootstrap -->\n    &lt;/head>\n\n    &lt;body data-bind="pane: \'layout\'">\n    &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div>\n&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.mails {\n    width: 100%;\n    table-layout: fixed;\n    border-spacing: 0;\n}\n\n.mails th {\n    background-color: #bbb;\n    font-weight: bold;\n    color: #444;\n    text-shadow: #f7f7f7 0 1px 1px;\n}\n\n.mails tbody tr:hover {\n    cursor: pointer;\n    background-color: #68c !important;\n    color: White;\n}\n\n.mails th, .mails td {\n    text-align: left;\n    padding: 0.4em 0.3em;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.mails td {\n    border: 0;\n}\n\n.mails th {\n    border: 0;\n    border-left: 1px solid #ddd;\n    border-right: 1px solid #888;\n    padding: 0.4em 0 0.3em 0.7em;\n}\n\n.mails th:nth-child(1), .mails td:nth-child(1) {\n    width: 20%;\n}\n\n.mails th:nth-child(2), .mails td:nth-child(2) {\n    width: 15%;\n}\n\n.mails th:nth-child(3), .mails td:nth-child(3) {\n    width: 45%;\n}\n\n.mails th:nth-child(4), .mails td:nth-child(4) {\n    width: 15%;\n}\n\n.mails th:last-child {\n    border-right: none;\n}\n\n.mails tr:nth-child(even) {\n    background-color: #EEE;\n}\n</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;table class="mails" data-bind="with: data">\n    &lt;thead>\n        &lt;tr>\n            &lt;th>From&lt;/th>\n            &lt;th>To&lt;/th>\n            &lt;th>Subject&lt;/th>\n            &lt;th>Date&lt;/th>\n        &lt;/tr>\n    &lt;/thead>\n\n    &lt;tbody data-bind="foreach: mails">\n        &lt;tr data-bind="click: $root.selectMail">\n            &lt;td data-bind="text: from">&lt;/td>\n            &lt;td data-bind="text: to">&lt;/td>\n            &lt;td data-bind="text: subject">&lt;/td>\n            &lt;td data-bind="text: date">&lt;/td>\n        &lt;/tr>     \n    &lt;/tbody>\n&lt;/table></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = ko.observable();\n\n    this.initialise = function () {\n        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);\n    };\n    \n    this.selectMail = function (mail) {\n        pane.navigate(\'viewMail\', mail);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.viewMail .mailInfo {\n    background-color: #dae0e8; \n    padding: 1em 1em 0.5em 1.25em; \n    border-radius: 1em;\n}\n\n.viewMail .mailInfo h1 {\n    margin-top: 0.2em; \n    font-size: 130%;\n}\n\n.viewMail .mailInfo label {\n    color: #777; \n    font-weight: bold; \n    min-width: 2.75em; \n    text-align:right; \n    display: inline-block;\n}\n\n.viewMail .message {\n    padding: 0 1.25em;\n}</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="viewMail" data-bind="with: data">\n    &lt;div class="mailInfo">\n        &lt;h1 data-bind="text: subject">&lt;/h1>\n        &lt;p>&lt;label>From&lt;/label>: &lt;span data-bind="text: from">&lt;/span>&lt;/p>\n        &lt;p>&lt;label>To&lt;/label>: &lt;span data-bind="text: to">&lt;/span>&lt;/p>\n        &lt;p>&lt;label>Date&lt;/label>: &lt;span data-bind="text: date">&lt;/span>&lt;/p>\n        &lt;div class="message">\n            &lt;p data-bind="html: messageContent" />            \n        &lt;/div>\n    &lt;/div>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n    \n    this.data = ko.observable();\n\n    this.initialise = function () {\n        $.getJSON(\'Data/mail/\' + pane.data.id, self.data);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data">\n    Thanks, \n    &lt;span data-bind="text: contact.name">&lt;/span>,\n    you are about to apply for a \n    &lt;span data-bind="text: type">&lt;/span> \n    credit card with a \n    $&lt;span data-bind="text: account.limit">&lt;/span> \n    limit.\n&lt;/p>\n&lt;p>\n    Please click \'Submit\' below to submit your application.  \n&lt;/p>\n&lt;button data-bind="click: submit">Submit&lt;/button>\n&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button>\n&lt;div data-bind="text: json">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = pane.data;\n    this.json = ko.observable();\n\n    this.submit = function () {\n        // Dump the details object on screen for our viewer\'s pleasure.\n        self.json(JSON.stringify(pane.data));\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Tribe.Forms gives us a way of building simple forms \n     without needing a JavaScript model -->\n&lt;p>Please enter some contact details.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }">&lt;/div>\n    &lt;div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'">&lt;/div>\n    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Tribe.Forms gives us a way of building simple forms \n     without needing a JavaScript model -->\n&lt;p>Please enter some details about the account.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2">&lt;/div>\n    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">PersonalFlow = function (flow) {\n    var details = { type: \'personal\' };         // An object to hold application details\n    \n    this.handles = {                            \n        onstart: flow.to(\'personal\'),\n        \'setAccount\': function(account) {       // As events occur, build up our details\n            details.account = account;          // object and flow through the process\n            flow.navigate(\'contact\');\n        },\n        \'setContact\': function(contact) {\n            details.contact = contact;\n            flow.navigate(\'confirm\', details);  // Our flow ends after navigating to the\n            flow.end();                         // confirmation pane.\n        }\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1>\n\n&lt;p>Welcome to the credit card application portal.&lt;/p>\n&lt;p>Click \'Start\' to begin.&lt;/p>\n\n&lt;button data-bind="click: start">Start&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.start = function () {\n        // panes expose a simple function for starting flows\n        pane.startFlow(PersonalFlow);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'limit\',\n                    displayText: \'Card limit (per card)\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 5">&lt;/div>\n    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter your business details.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'name\',\n                    displayText: \'Business name\', \n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'abn\',\n                    displayText: \'ABN\'">&lt;/div>\n    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'BusinessFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">BusinessFlow2 = function (flow) {\n    var details = { type: \'business\' };\n    \n    this.handles = {\n        onstart: flow.to(\'businessDetails\'),\n        \'setBusiness\': function(business) {\n            details.business = business;\n            flow.navigate(\'businessAccount\');\n        },\n        \'setAccount\': function(account) {\n            details.account = account;\n            flow.navigate(\'contact\');\n        },\n        \'setContact\': function(contact) {\n            details.contact = contact;\n            flow.navigate(\'confirm\', details);\n            flow.end();\n        }\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data">\n    Thanks, \n    &lt;span data-bind="text: contact.name">&lt;/span>,\n    you are about to apply for a \n    &lt;span data-bind="text: type">&lt;/span> \n    credit card with a \n    $&lt;span data-bind="text: account.limit">&lt;/span> \n    limit.\n&lt;/p>\n&lt;p>\n    Please click \'Submit\' below to submit your application.  \n&lt;/p>\n&lt;button data-bind="click: submit">Submit&lt;/button>\n&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button>\n&lt;div data-bind="text: json">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = pane.data;\n    this.json = ko.observable();\n\n    this.submit = function() {\n        self.json(JSON.stringify(pane.data));\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some contact details.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }">&lt;/div>\n    &lt;div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'">&lt;/div>\n    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2">&lt;/div>\n    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">PersonalFlow2 = function (flow) {\n    var details = { type: \'personal\' };\n    \n    this.handles = {\n        onstart: flow.to(\'personal\'),\n        \'setAccount\': function(account) {\n            details.account = account;\n            flow.navigate(\'contact\');\n        },\n        \'setContact\': function(contact) {\n            details.contact = contact;\n            flow.navigate(\'confirm\', details);\n            flow.end();\n        }\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1>\n\n&lt;p>Welcome to the credit card application portal.&lt;/p>\n&lt;p>Click the required account type to begin.&lt;/p>\n\n&lt;button data-bind="click: personal">Personal&lt;/button>\n&lt;button data-bind="click: business">Business&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.personal = function() {\n        pane.startFlow(PersonalFlow2);\n    };\n\n    this.business = function () {\n        pane.startFlow(BusinessFlow2);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'limit\',\n                    displayText: \'Card limit (per card)\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 5">&lt;/div>\n    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter your business details.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'name\',\n                    displayText: \'Business name\', \n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'abn\',\n                    displayText: \'ABN\'">&lt;/div>\n    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'BusinessFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">BusinessFlow3 = function (flow) {\n    var details = { type: \'business\' };\n    flow.startSaga(CreditCard, details);\n\n    this.handles = {\n        onstart: flow.to(\'businessDetails\'),\n        \'setBusiness\': flow.to(\'businessAccount\'),\n        \'setAccount\': flow.to(\'contact\'),\n        \'setContact\': flow.endsAt(\'confirm\', details)\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data">\n    Thanks, \n    &lt;span data-bind="text: contact.name">&lt;/span>,\n    you are about to apply for a \n    &lt;span data-bind="text: type">&lt;/span> \n    credit card with a \n    $&lt;span data-bind="text: account.limit">&lt;/span> \n    limit.\n&lt;/p>\n&lt;p>\n    Please click \'Submit\' below to submit your application.  \n&lt;/p>\n&lt;button data-bind="click: submit">Submit&lt;/button>\n&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button>\n&lt;div data-bind="text: json">&lt;/div>\n</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = pane.data;\n    this.json = ko.observable();\n\n    this.submit = function() {\n        self.json(JSON.stringify(pane.data));\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some contact details.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }">&lt;/div>\n    &lt;div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'">&lt;/div>\n    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'CreditCard.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">CreditCard = function (saga, details) {\n    this.handles = {\n        \'setAccount\': function (account) {\n            details.account = account;\n        },\n        \'setBusiness\': function (business) {\n            details.business = business;\n        },\n        \'setContact\': function (contact) {\n            details.contact = contact;\n        }\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2">&lt;/div>\n    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">PersonalFlow3 = function (flow) {\n    var details = { type: \'personal\' };\n    flow.startSaga(CreditCard, details);\n\n    this.handles = {\n        onstart: flow.to(\'personal\'),\n        \'setAccount\': flow.to(\'contact\'),\n        \'setContact\': flow.endsAt(\'confirm\', details)\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1>\n\n&lt;p>Welcome to the credit card application portal.&lt;/p>\n&lt;p>Click the required account type to begin.&lt;/p>\n\n&lt;button data-bind="click: personal">Personal&lt;/button>\n&lt;button data-bind="click: business">Business&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    this.personal = function() {\n        pane.startFlow(PersonalFlow3);\n    };\n\n    this.business = function () {\n        pane.startFlow(BusinessFlow3);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'limit\',\n                    displayText: \'Card limit (per card)\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 5">&lt;/div>\n    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter your business details.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'name\',\n                    displayText: \'Business name\', \n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'abn\',\n                    displayText: \'ABN\'">&lt;/div>\n    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data">\n    Thanks, \n    &lt;span data-bind="text: contact.name">&lt;/span>,\n    you are about to apply for a \n    &lt;span data-bind="text: type">&lt;/span> \n    credit card with a \n    $&lt;span data-bind="text: account.limit">&lt;/span> \n    limit.\n&lt;/p>\n&lt;p>\n    Please click \'Submit\' below to submit your application.  \n&lt;/p>\n&lt;button data-bind="click: submit">Submit&lt;/button>\n&lt;button data-bind="click: restart">Restart&lt;/button>\n&lt;div data-bind="text: json">&lt;/div>\n</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    var self = this;\n\n    this.data = pane.data;\n    this.json = ko.observable();\n\n    this.submit = function() {\n        self.json(JSON.stringify(pane.data));\n    };\n\n    this.restart = function() {\n        pane.startFlow(CreditCardFlow);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some contact details.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }">&lt;/div>\n    &lt;div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'">&lt;/div>\n    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'CreditCard.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">CreditCard = function (saga, details) {\n    this.handles = {\n        \'startBusiness\': function() {\n            details.type = \'business\';\n        },\n        \'startPersonal\': function() {\n            details.type = \'personal\';\n        },\n        \'setAccount\': function (account) {\n            details.account = account;\n        },\n        \'setBusiness\': function (business) {\n            details.business = business;\n        },\n        \'setContact\': function (contact) {\n            details.contact = contact;\n        }\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'CreditCardFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">CreditCardFlow = function (flow) {\n    var details = { };\n    flow.startSaga(CreditCard, details);\n\n    this.handles = {\n        onstart: flow.to(\'welcome\'),\n        \'startBusiness\': {\n            onstart: flow.to(\'businessDetails\'),\n            \'setBusiness\': flow.to(\'businessAccount\'),\n            \'setAccount\': flow.to(\'contact\'),\n        },\n        \'startPersonal\': {\n            onstart: flow.to(\'personal\'),\n            \'setAccount\': flow.to(\'contact\'),\n        },\n        \'setContact\': flow.endsAt(\'confirm\', details)\n    };\n};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'host.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    pane.startFlow(CreditCardFlow);\n});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p>\n&lt;div data-bind="form: {}, create: true">\n    &lt;div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }">&lt;/div>\n    &lt;div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2">&lt;/div>\n    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1>\n\n&lt;p>Welcome to the credit card application portal.&lt;/p>\n&lt;p>Click the required account type to begin.&lt;/p>\n\n&lt;button data-bind="publish: \'startPersonal\'">Personal&lt;/button>\n&lt;button data-bind="publish: \'startBusiness\'">Business&lt;/button>\n</pre>'
});