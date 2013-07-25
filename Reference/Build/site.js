function articleUrlProvider(options) {
    return {
        url: isHome() ? '/' : '?section=' + encodeURI(options.data.section) + '&topic=' + encodeURI(options.data.topic)
    };
    
    function isHome() {
        return options.data.section === 'About' && options.data.topic === 'index';
    }
}Navigation = {
    Components: {
        'Composite': {
            'Panes': 'panes',
            'Navigation': 'navigation',
            'Transitions': 'transitions',
            'Lifecycle': 'lifecycle',
            'Sagas': 'sagas',
            'Testing': 'testing'
        },
        'PubSub': {},
        'MessageHub': {},
        'Mobile': {},
        'Forms': {},
        'Components': {},
    },
    Reference: {
        'API': {
            'Core': 'core',
            'Binding Handlers': 'bindingHandlers',
            'Utilities': 'utilities'
        },
        'Types': {
            'History': 'History',
            'Loader': 'Loader',
            'Logger': 'Logger',
            'Models': 'Models',
            'Node': 'Node',
            'Operation': 'Operation',
            'Pane': 'Pane',
            'Pipeline': 'Pipeline',
            'Saga': 'Saga',
            'Templates': 'Templates'
        },
        'PubSub': {
            'Core': 'core',
            'Lifetimes': 'lifetimes'
        },
        'MessageHub': {
            'Configuration': 'configuration',
            'Client API': 'client',
        },
        'Mobile': {},
        'Forms': {},
        'Components': {}
    }
};Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;input data-bind="value: task" />\n&lt;button data-bind="click: create">Create&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">// Declare model constructors using this simple function.\n// Tribe creates an instance and binds it to the template.\n\nTC.registerModel(function (pane) {\n    var self = this;\n    \n    this.task = ko.observable();\n    \n    this.create = function() {\n        pane.pubsub.publish(\'task.create\', self.task());\n        self.task(\'\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Todos&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">\n            $(ko.applyBindings);\n        &lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'layout\'">&lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Todos&lt;/h1>\n\n&lt;!-- Creating panes is simple -->\n&lt;div data-bind="pane: \'create\'">&lt;/div>\n&lt;div data-bind="pane: \'list\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'list.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* CSS can be maintained alongside the \n   template it corresponds with */\n\n.taskList {\n    list-style: none;\n    padding: 0;\n}\n\n.taskList li {\n    padding: 5px;\n}</pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'list.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n&lt;ul class="taskList" data-bind="foreach: tasks">\n    &lt;li data-bind="pane: \'task\', data: $data">&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'list.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.tasks = ko.observableArray([\'Sample task\']);\n\n    // Using messages decouples your components.\n    // Tribe cleans up subscriptions automatically.\n    pane.pubsub.subscribe(\'task.create\', function(task) {\n        self.tasks.push(task);\n    });\n\n    pane.pubsub.subscribe(\'task.delete\', function (task) {\n        var index = self.tasks.indexOf(task);\n        self.tasks.splice(index, 1);\n    });\n});</pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'task.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;button data-bind="click: deleteTask">x&lt;/button>\n&lt;span data-bind="text: task">&lt;/span></pre>'
});Samples = window.Samples || {};
Samples['Tasks'] = Samples['Tasks'] || [];
Samples['Tasks'].push({
    filename: 'task.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.task = pane.data;\n    \n    this.deleteTask = function() {\n        pane.pubsub.publish(\'task.delete\', self.task);\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Chat'] = Samples['Chat'] || [];
Samples['Chat'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div data-bind="pane: \'sender\'">&lt;/div>\n&lt;div data-bind="pane: \'messages\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Chat'] = Samples['Chat'] || [];
Samples['Chat'].push({
    filename: 'chat.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    // Hook up our message hub and join a channel\n    TMH.initialise(pane.pubsub, \'signalr\');\n    TMH.joinChannel(\'chat\', {\n         serverEvents: [\'chat.*\']\n    });\n\n    // The dispose function is called automatically\n    // when the pane is removed from the DOM.\n    this.dispose = function() {\n        TMH.leaveChannel(\'chat\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Chat'] = Samples['Chat'] || [];
Samples['Chat'].push({
    filename: 'messages.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.messages {\n    list-style: none;\n    padding: 0;\n}\n\n.messages li {\n    padding: 5px;\n}</pre>'
});Samples = window.Samples || {};
Samples['Chat'] = Samples['Chat'] || [];
Samples['Chat'].push({
    filename: 'messages.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="messages" data-bind="foreach: messages">\n    &lt;li>\n        &lt;span data-bind="text: name">&lt;/span>:\n        &lt;span data-bind="text: message">&lt;/span>\n    &lt;/li>\n&lt;/ul>\n</pre>'
});Samples = window.Samples || {};
Samples['Chat'] = Samples['Chat'] || [];
Samples['Chat'].push({
    filename: 'messages.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.messages = ko.observableArray();\n\n    pane.pubsub.subscribe(\'chat.message\',\n        function (message) {\n            self.messages.push(message);\n        });\n});</pre>'
});Samples = window.Samples || {};
Samples['Chat'] = Samples['Chat'] || [];
Samples['Chat'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="chat">\n    &lt;div>\n        Name: &lt;input data-bind="value: name" />    \n    &lt;/div>\n\n    &lt;div>\n        &lt;input data-bind="value: message" />\n        &lt;button data-bind="click: send">Send&lt;/button>\n    &lt;/div>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Chat'] = Samples['Chat'] || [];
Samples['Chat'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {\n    var self = this;\n\n    this.name = ko.observable(\'Anonymous\');\n    this.message = ko.observable();\n\n    this.send = function() {\n        pane.pubsub.publish(\'chat.message\', {\n            name: self.name(),\n            message: self.message()\n        });\n        self.message(\'\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n  &lt;head>\n    &lt;title>Tribe Mobile&lt;/title>\n    &lt;meta name="viewport" \n      content="minimum-scale=1.0, width=device-width, \n               maximum-scale=1.0, user-scalable=no" />\n\n    &lt;script src="jquery.js">&lt;/script>\n    &lt;script src="knockout.js">&lt;/script>\n    &lt;script src="Tribe.js">&lt;/script>\n    &lt;script src="Tribe.Mobile.js">&lt;/script>\n        \n    &lt;script type="text/javascript">\n      $(ko.applyBindings);\n    &lt;/script>\n  &lt;/head>\n  &lt;body data-bind="pane: \'/Mobile/main\',\n                   data: { pane: \'welcome\' }">\n  &lt;/body>\n&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="layout">\n    &lt;ul class="rounded">\n        &lt;li class="forward">Test1&lt;/li>\n        &lt;li class="forward">Test2&lt;/li>\n        &lt;li class="arrow" data-bind="click: function() {}">Test3&lt;/li>\n        &lt;li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New Player...\', }">&lt;/li>\n    &lt;/ul>\n    \n    &lt;div data-bind="pane: \'/Mobile/list\', data: listData">&lt;/div>\n    \n    &lt;button class="white" data-bind="click: overlay">Overlay&lt;/button>\n    &lt;button class="white" data-bind="click: toolbar">Toolbar&lt;/button>\n    &lt;button class="white" data-bind="click: navigate">Navigate&lt;/button>\n&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'layout.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.title(\'Title!\');\n    TC.toolbar.options([\n        { text: \'test\', func: function () { alert(\'test\'); } },\n        { text: \'test2\', func: function () { alert(\'test2\'); } }\n    ]);\n\n    this.listData = {\n        items: [\n            { id: 1, name: \'test1\' },\n            { id: 2, name: \'test2\' },\n            { id: 3, name: \'test3\' }\n        ],\n        itemText: function (item) { return item.id + \': \' + item.name; },\n        headerText: \'Select Item:\',\n        itemClick: function(item) {\n        },\n        cssClass: \'rounded\'\n    };\n\n    this.overlay = function() {\n        TC.overlay(\'overlay\');\n    };\n\n    this.toolbar = function () {\n        TC.toolbar.visible(!TC.toolbar.visible());\n    };\n\n    this.navigate = function() {\n        pane.navigate(\'navigate\');\n    };\n});</pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'navigate.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="rounded">This is the pane you navigated to&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'navigate.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.title(\'Navigate!\');\n    TC.toolbar.back(true);\n});</pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'overlay.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul>\n    &lt;li>One&lt;/li>\n    &lt;li>Two&lt;/li>\n    &lt;li>Three&lt;/li>\n    &lt;li>Four&lt;/li>\n&lt;/ul>\n\n&lt;button class="white" data-bind="click: function() { pane.remove(); }">Close&lt;/button></pre>'
});window.Topic = {
    createHelpers: function(pubsub) {
        Topic.show = function(section, topic) {
            return function() {
                pubsub.publish('article.show', { section: section, topic: topic });
            };
        };
    }
};$('<style/>')
    .attr('class', '__tribe')
    .text('.example3 .sample .samplePane{padding:0;width:320px;height:480px;left:22px;top:136px}.example3 .sample>*{height:711px}.example3 .sample .source{width:548px}.example3 .sample .result{width:365px;height:721px;border:none;background:url(\'../Images/device.mobile.png\');margin-left:15px}.example3 .sample .fileList{width:548px;height:auto}.example3 .sample .fileContent{width:548px;height:auto}.example3 .result .title{display:none}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.features{text-align:center;font-family:Arial;color:#081735}.features>*{vertical-align:top;display:inline-block;width:188px}.features.small>*{width:100px}.features strong{height:50px;color:#701010}.features>* *{text-align:center;margin:0 auto;display:block}.features.small img{margin-bottom:5px}.features img{margin-bottom:20px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.knockout.block{text-align:center;background:center url(\'../Images/knockout/background.jpg\')}.knockout .features{display:inline-block;margin-left:50px;background-clip:padding-box;color:#b64838}.knockout .logo{color:#fff;vertical-align:top;margin-top:20px;display:inline-block;width:250px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.masthead{color:#fff;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);background:#103070;text-align:center;padding-bottom:20px;border-bottom:1px #333 solid}.masthead h1{height:60px;font:bold 96pt \'Cambria\';padding:0}.masthead h2{font-size:18px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.footer{text-align:right;font-size:10pt;color:#888;text-shadow:1px 1px rgba(255,255,255,.2)}.footer a,.footer a:active,.footer a:visited,.footer a:link{text-decoration:none;color:#66f}.footer a:hover{color:#fff}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.header{height:46px}.header .background{position:absolute;top:0;width:100%;height:45px;border-bottom:1px #333 solid;background:#45484d;background:-moz-linear-gradient(top,#45484d 0%,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#45484d),color-stop(100%,#000));background:-webkit-linear-gradient(top,#45484d 0%,#000 100%);background:-o-linear-gradient(top,#45484d 0%,#000 100%);background:-ms-linear-gradient(top,#45484d 0%,#000 100%);background:linear-gradient(to bottom,#45484d 0%,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#45484d\',endColorstr=\'#000000\',GradientType=0);z-index:-2}.header .buttons{text-align:center;position:absolute;right:0}.header .buttons span{font-size:.7em;float:left;color:#eee;text-shadow:2px 2px 0 black;padding:9px;cursor:pointer;background:rgba(32,96,224,.2);font-size:1.2em;width:90px;height:27px;margin:0;margin-left:-1px;border-left:1px solid #000;border-right:1px solid #000}.header .buttons span:hover{background:#fff;background:-moz-linear-gradient(top,#fff 0%,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#fff),color-stop(100%,#000));background:-webkit-linear-gradient(top,#fff 0%,#000 100%);background:-o-linear-gradient(top,#fff 0%,#000 100%);background:-ms-linear-gradient(top,#fff 0%,#000 100%);background:linear-gradient(to bottom,#fff 0%,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffffff\',endColorstr=\'#000000\',GradientType=0);color:#aaa}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('body{background:#ccc;font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif;padding:0;margin:0;overflow-y:scroll}.content{width:980px;position:relative;left:50%;margin-left:-490px!important}.block{background:#fff;border:1px solid #aaa;margin-bottom:10px;margin-top:10px;border-radius:8px;box-sizing:border-box}.block p{margin:10px 20px;font-size:14pt}.out .content.block{margin-top:0}.blockHeader{color:#fff;font-weight:bold;height:20px;border-top-left-radius:8px;border-top-right-radius:8px;padding:10px;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);background:#103070;background:-moz-linear-gradient(top,#103070 0%,#457ae4 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#103070),color-stop(100%,#457ae4));background:-webkit-linear-gradient(top,#103070 0%,#457ae4 100%);background:-o-linear-gradient(top,#103070 0%,#457ae4 100%);background:-ms-linear-gradient(top,#103070 0%,#457ae4 100%);background:linear-gradient(to bottom,#103070 0%,#457ae4 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#103070\',endColorstr=\'#457ae4\',GradientType=0)}h1,h2,h3{margin-top:0}.padded{padding:10px}.paddedVertical{padding-top:10px;padding-bottom:10px}.underline{text-decoration:underline}.clear{clear:both}a,a:active,a:visited,a:link{text-decoration:none;cursor:pointer;color:#103070}a:hover{text-decoration:underline}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.navigation{display:none;background:#eee;border:1px solid #000;box-sizing:border-box}.navigation ul{list-style:none}.navigation li{cursor:pointer}.navigation ul li:hover{background:#111;color:#eee}.navigation li.selectedItem{background:#ccc}.navigation>ul li{padding:2px 10px;font-weight:bold}.navigation ul ul li{margin:0;padding:2px 0 2px 20px;box-sizing:border-box;font-weight:normal}@media(max-width:1300px){.navigation{width:980px;position:relative;left:50%;margin-left:-490px!important;border-radius:8px;padding:10px;margin-top:10px}.navigation ul{margin:0;padding:0;width:33%}.navigation ul ul{position:absolute;top:10px;right:10px;width:66%}.navigation ul ul li{width:50%;float:left}}@media(min-width:1300px){.navigation{width:170px!important;position:fixed;left:0;top:56px;border-left:0;box-shadow:3px 3px 4px -1px rgba(0,0,0,.3);border-top-right-radius:8px;border-bottom-right-radius:8px}.navigation>ul{padding:0;margin:10px}.navigation ul ul{margin:0;padding:0}}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.sample{width:935px;margin:0 auto}.sample>*{display:inline-block;vertical-align:top;height:305px;border:1px solid #000;border-radius:8px;overflow:hidden;background:#fff}.sample .fileList,.sample .fileContent{float:left;height:300px;box-sizing:border-box}.sample ul.fileList{width:150px;list-style:none;margin:0;padding:0}.sample .fileList li{padding:2px;cursor:pointer}.sample .fileList li:hover{color:#fff;background:#000}.sample .selectedFile{color:#fff;background:grey}.sample .fileContent{padding:5px;width:515px;overflow:auto;height:272px}.sample .result{margin-left:5px;margin-bottom:5px;width:255px}.sample .title{background:#ccc;padding:5px;width:100%;box-sizing:border-box;border-top-left-radius:8px;border-top-right-radius:8px}.sample .samplePane{overflow:auto;padding:5px;height:262px;position:relative}.sample pre{margin:0}.sample pre.prettyprint{border:none}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.messages{list-style:none;padding:0}.messages li{padding:5px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('ul.welcome li{background:#103070;color:#fff;text-align:center;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);font:bold 64pt \'Cambria\'}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.taskList{list-style:none;padding:0}.taskList li{padding:5px}')
    .appendTo('head');
$('head')
    .append('<script type="text/template" id="template--Content-About-example1"><div class="example1 block">\n    <div class="blockHeader">Show Me!</div>\n    \n    <p>\n        Tribe allows you to easily break your UI down into "panes" \n        and communicate between these panes using a publish / subscribe message bus.\n    </p>\n    <p>\n        Each pane can consist of a JavaScript model, a HTML template and CSS stylesheet. \n        Simply create these files and refer to the pane by name. \n    </p>\n    <p>\n        Tribe does the rest - loads\n        the resources, renders the template and binds an instance of the model to it.\n    </p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Tasks\', initialFile: \'layout.htm\' }"></div>\n    \n    <p>\n        This is, of course, pretty trivial. Check out the samples or the source to\n        this site\n    </p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-example2"><div class="example2 block">\n    <div class="blockHeader">Seamless Communication</div>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Chat\', initialFile: \'chat.js\', rootPane: \'chat\' }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-example3"><div class="example3 block">\n    <div class="blockHeader">Mobile App</div>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Mobile\', initialFile: \'index.html\', rootPane: { path: \'/Mobile/main\', data: { pane: \'/Samples/Mobile/layout\' } } }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-features"><div class="block">\n    <div class="blockHeader">Key Features</div>\n    <div class="padded features">\n        <div>\n            <img src="Images/Features/composite.png" />\n            <strong>Composite UI</strong>\n            <span>Simple, powerful UI decomposition.</span>\n        </div>\n        <div>\n            <img src="Images/Features/resources.png" />\n            <strong>Resource Management</strong>\n            <span>Full lifecycle management. Powerful load optimisation.</span>\n        </div>\n        <div>\n            <img src="Images/Features/communication.png" />\n            <strong>Seamless Communication</strong>\n            <span>Broadcast messages to other users and internal services.</span>\n        </div>\n        <div>\n            <img src="Images/Features/mobile.png" />\n            <strong>Mobile Devices</strong>\n            <span>Effortlessly target web and all mobile platforms with a single codebase.</span>\n        </div>\n        <div>\n            <img src="Images/Features/simple.png" />\n            <strong>Simple and Intuitive</strong>\n            <span>Flexible, intuitive file structure. No complex configuration.</span>\n        </div>\n    </div>\n    <div class="padded">\n        <a data-bind="click: Topic.show(\'Guides\', \'features\')">Read more...</a>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-index"><div>\n    <div data-bind="pane: \'masthead\'"></div>\n\n    <div class="content">\n        <div data-bind="pane: \'knockout\'"></div>\n        <div data-bind="pane: \'features\'"></div>\n        <div data-bind="pane: \'example1\'"></div>\n        <div data-bind="pane: \'example2\'"></div>\n        <div data-bind="pane: \'example3\'"></div>\n\n        <!--<ul>\n                <li>Tribe comes with a set of UI components but integrates easily with others, like jQuery UI.</li>\n            </ul>-->\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-knockout"><div class="padded knockout block">\n    <div class="logo">\n        <span>Built with the power of</span>\n        <img src="Images/knockout/logo.png"/>\n    </div>\n    <div class="small padded features block">\n        <div>\n            <img src="Images/knockout/bindings.png" />\n            <span>Declarative Bindings</span>\n        </div>\n        <div>\n            <img src="Images/knockout/refresh.png" />\n            <span>Automatic UI Refresh</span>\n        </div>\n        <div>\n            <img src="Images/knockout/dependencies.png" />\n            <span>Dependency Tracking</span>\n        </div>\n        <div>\n            <img src="Images/knockout/templating.png" />\n            <span>Templating</span>\n        </div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-masthead"><div class="masthead">\n    <h1>tribe</h1>            \n    <h2>Easy to build, fast, integrated web and mobile <span class="underline">systems</span>.</h2>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-index"><h1>\n    Tribe Components\n</h1></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Components-index"><h1>Tribe.Components</h1></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Composite-index"><h1>Tribe.Composite</h1></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Composite-lifecycle"><h2>Pane Lifecycle</h2></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Composite-navigation"><h2>Navigation and History</h2></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Composite-panes"><h2>Panes</h2></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Composite-sagas"><div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Composite-testing"><h2>Testing</h2></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Composite-transitions"><h2>Transitions</h2></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Forms-index"><h1>Tribe.Forms</h1></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-MessageHub-index"><h1>Tribe.MessageHub</h1></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-Mobile-index"><h1>Tribe.Mobile</h1></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Components-PubSub-index"><h1>Tribe.PubSub</h1></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-features"><div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-index"><div class="content block">\n    <div class="blockHeader">Guides</div>\n    Under construction\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-index"><div class="content block">\n    <div class="blockHeader">Reference</div>\n    Under construction\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Components-index"><div>\n    Index\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Composite-index"><div>\n    Index\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Forms-index"><div>\n    Index\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-MessageHub-index"><div>\n    Index\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-Mobile-index"><div>\n    Index\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-PubSub-index"><div>\n    Index\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-content"><div data-bind="pane: panePath">\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-footer"><div class="footer content">\n    The Tribe platform and all resources on this website are licensed under the <a target="_blank" href="http://opensource.org/licenses/mit-license.php">MIT license</a>.\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-header"><div class="header">\n    <div class="background"></div>\n    \n    <div class="content">\n        <div class="buttons">\n            <span data-bind="click: showSection(\'About\')">About</span>\n            <span data-bind="click: showSection(\'Guides\')">Guides</span>\n            <span data-bind="click: showSection(\'Reference\')">Reference</span>\n            <span data-bind="click: source">Source</span>\n            <span>Fork Us!</span>\n        </div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-layout"><div data-bind="pane: \'header\'"></div>\n<div data-bind="pane: \'main\'"></div>\n<div data-bind="pane: \'footer\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-main"><div data-bind="pane: \'navigation\'"></div>\n<div data-bind="pane: { path: \'content\', data: { section: \'About\', topic: \'index\' }, handlesNavigation: { transition: \'fade\', browser: articleUrlProvider } }"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-navigation"><div class="navigation">\n    <ul data-bind="foreach: items">\n        <li data-bind="click: $root.showArticleIndex, css: { selectedItem: $data === $root.selectedItem() }">\n            <span data-bind="text: $data.displayText"></span>\n        </li>\n        <ul data-bind="visible: $data === $root.selectedParent(), foreach: $data.items">\n            <li data-bind="click: $root.showArticle, text: $data.displayText, css: { selectedItem: $data === $root.selectedItem() }"></li>\n        </ul>\n    </ul>\n    <div class="clear"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-sample"><div class="sample">\n    <div class="source">\n        <div class="title">Source</div>\n\n        <ul class="fileList" data-bind="foreach: files">\n            <li data-bind="click: $root.selectFile, css: { selectedFile: $root.selectedFile() === $data }">\n                <img data-bind="attr: { src: icon }" />\n                <span data-bind="text: filename"></span>\n            </li>\n        </ul>\n\n        <div class="fileContent" data-bind="html: selectedFile().content"></div>\n    </div>\n\n    <div class="result">\n        <div class="title">Result</div>\n        <div class="samplePane" data-bind="pane: samplePane"></div>\n    </div>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Chat-chat"><div data-bind="pane: \'sender\'"></div>\n<div data-bind="pane: \'messages\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Chat-messages"><ul class="messages" data-bind="foreach: messages">\n    <li>\n        <span data-bind="text: name"></span>:\n        <span data-bind="text: message"></span>\n    </li>\n</ul>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Chat-sender"><div class="chat">\n    <div>\n        Name: <input data-bind="value: name" />    \n    </div>\n\n    <div>\n        <input data-bind="value: message" />\n        <button data-bind="click: send">Send</button>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile-layout"><div class="layout">\n    <ul class="rounded">\n        <li class="forward">Test1</li>\n        <li class="forward">Test2</li>\n        <li class="arrow" data-bind="click: function() {}">Test3</li>\n        <li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New Player...\', }"></li>\n    </ul>\n    \n    <div data-bind="pane: \'/Mobile/list\', data: listData"></div>\n    \n    <button class="white" data-bind="click: overlay">Overlay</button>\n    <button class="white" data-bind="click: toolbar">Toolbar</button>\n    <button class="white" data-bind="click: navigate">Navigate</button>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile-navigate"><ul class="rounded">This is the pane you navigated to</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile-overlay"><ul>\n    <li>One</li>\n    <li>Two</li>\n    <li>Three</li>\n    <li>Four</li>\n</ul>\n\n<button class="white" data-bind="click: function() { pane.remove(); }">Close</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile2-chat"><ul class="rounded" data-bind="pane: \'../Chat/chat\'">\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile2-layout"><div>\n    <ul class="rounded">\n        <li class="arrow" data-bind="click: function() {}">Next</li>\n        <li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New...\', }"></li>\n    </ul>\n    \n    <div data-bind="pane: \'/Mobile/list\', data: listData"></div>\n    \n    <button class="white" data-bind="click: overlay">Overlay</button>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile2-overlay"><ul>\n    <li>One</li>\n    <li>Two</li>\n    <li>Three</li>\n    <li>Four</li>\n</ul>\n\n<button class="white" data-bind="click: function() { pane.remove(); }">Close</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile2-welcome"><ul class="rounded welcome">\n    <li>tribe</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: samples">Samples</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: chat">Chat</li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-create"><input data-bind="value: task" />\n<button data-bind="click: create">Create</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-layout"><h1>Todos</h1>\n\n<!-- Creating panes is simple -->\n<div data-bind="pane: \'create\'"></div>\n<div data-bind="pane: \'list\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-list"><!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n<ul class="taskList" data-bind="foreach: tasks">\n    <li data-bind="pane: \'task\', data: $data"></li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-task"><button data-bind="click: deleteTask">x</button>\n<span data-bind="text: task"></span></script>');
TC.scriptEnvironment = { resourcePath: '/Interface/content' };
TC.registerModel(function (pane) {
    this.panePath = panePath(pane.data);

    pane.pubsub.subscribe('article.show', function (article) {
        $(pane.element).css({ 'width': '100%' });
        pane.navigate({ path: '/Interface/content', data: article });
    });
    
    function panePath(article) {
        return '/Content/' + article.section + '/' + article.topic;
    }
});
//@ sourceURL=tribe://Panes/Interface/content.js
TC.scriptEnvironment = { resourcePath: '/Interface/header' };
TC.registerModel(function (pane) {
    this.showSection = function(section) {
        return function() {
            pane.pubsub.publish('article.show', { section: section, topic: 'index' });
        };
    };

    this.source = function() {

    };
});
//@ sourceURL=tribe://Panes/Interface/header.js
TC.scriptEnvironment = { resourcePath: '/Interface/main' };
TC.registerModel(function (pane) {
    var self = this;
    self.showLeftPanel = ko.observable(false);

    Topic.createHelpers(pane.pubsub);

    pane.pubsub.subscribe('ui.showLeftPanel', function (data) {
        self.showLeftPanel(data.show);
    });
});
//@ sourceURL=tribe://Panes/Interface/main.js
TC.scriptEnvironment = { resourcePath: '/Interface/navigation' };
TC.registerModel(function (pane) {
    var self = this;
    var currentSection;

    this.selectedParent = ko.observable();
    this.selectedItem = ko.observable();
    this.items = ko.observableArray();

    this.showArticleIndex = function (item) {
        self.selectedParent(item);
        self.selectedItem(item);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    this.showArticle = function(item) {
        self.selectedItem(item);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    window.addEventListener('navigating', navigating);
    function navigating(e) {
        var section = e.data.options.data && e.data.options.data.section;
        if (currentSection !== section) {
            currentSection = section;
            var items = mapNavigation(section);
            if (items.length > 0) {
                self.items(items);
                show();
            } else 
                hide();
        }
    }
    
    function show() {
        if (!$('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideRight').in();
    }
    
    function hide() {
        if ($('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideLeft').out(false);
    }
    
    this.dispose = function() {
        window.removeEventListener('navigating', navigating);
    };
    
    // maps the cleaner API navigation structure into a structure suitable for data bindings. could be refactored out.
    function mapNavigation(section) {
        return TC.Utils.map(Navigation[section], function(item, key) {
            return {
                displayText: key,
                topic: key + '/index',
                items: mapChildItems(key, item)
            };
        });        
    }
    
    function mapChildItems(parentKey, container) {
        return TC.Utils.map(container, function (item, key) {
            return {
                displayText: key,
                topic: parentKey + '/' + item
            };
        });
    }
});
//@ sourceURL=tribe://Panes/Interface/navigation.js
TC.scriptEnvironment = { resourcePath: '/Interface/sample' };
TC.registerModel(function (pane) {
    var self = this;
    var data = pane.data || {};

    var rootPane = data.rootPane || 'layout';
    this.samplePane = rootPane.constructor === String ? 
        '/Samples/' + data.name + '/' + rootPane : rootPane;
    this.files = Samples[pane.data.name];
    this.selectedFile = ko.observable(initialSelection());
    
    this.selectFile = function(file) {
        self.selectedFile(file);
        PR.prettyPrint();
    };

    this.renderComplete = function() {
        PR.prettyPrint();
    };
    
    function initialSelection() {
        if (!pane.data.initialFile)
            return self.files[0];
        for(var i = 0; i < self.files.length; i++)
            if (self.files[i].filename === pane.data.initialFile)
                return self.files[i];
    }
});
//@ sourceURL=tribe://Panes/Interface/sample.js
TC.scriptEnvironment = { resourcePath: '/Samples/Chat/chat' };
TC.registerModel(function (pane) {
    // Hook up our message hub and join a channel
    TMH.initialise(pane.pubsub, 'signalr');
    TMH.joinChannel('chat', {
         serverEvents: ['chat.*']
    });

    // The dispose function is called automatically
    // when the pane is removed from the DOM.
    this.dispose = function() {
        TMH.leaveChannel('chat');
    };
});
//@ sourceURL=tribe://Panes/Samples/Chat/chat.js
TC.scriptEnvironment = { resourcePath: '/Samples/Chat/messages' };
TC.registerModel(function(pane) {
    var self = this;

    this.messages = ko.observableArray();

    pane.pubsub.subscribe('chat.message',
        function (message) {
            self.messages.push(message);
        });
});
//@ sourceURL=tribe://Panes/Samples/Chat/messages.js
TC.scriptEnvironment = { resourcePath: '/Samples/Chat/sender' };
TC.registerModel(function(pane) {
    var self = this;

    this.name = ko.observable('Anonymous');
    this.message = ko.observable();

    this.send = function() {
        pane.pubsub.publish('chat.message', {
            name: self.name(),
            message: self.message()
        });
        self.message('');
    };
});
//@ sourceURL=tribe://Panes/Samples/Chat/sender.js
TC.scriptEnvironment = { resourcePath: '/Samples/Mobile/layout' };
TC.registerModel(function (pane) {
    TC.toolbar.title('Title!');
    TC.toolbar.options([
        { text: 'test', func: function () { alert('test'); } },
        { text: 'test2', func: function () { alert('test2'); } }
    ]);

    this.listData = {
        items: [
            { id: 1, name: 'test1' },
            { id: 2, name: 'test2' },
            { id: 3, name: 'test3' }
        ],
        itemText: function (item) { return item.id + ': ' + item.name; },
        headerText: 'Select Item:',
        itemClick: function(item) {
        },
        cssClass: 'rounded'
    };

    this.overlay = function() {
        TC.overlay('overlay');
    };

    this.toolbar = function () {
        TC.toolbar.visible(!TC.toolbar.visible());
    };

    this.navigate = function() {
        pane.navigate('navigate');
    };
});
//@ sourceURL=tribe://Panes/Samples/Mobile/layout.js
TC.scriptEnvironment = { resourcePath: '/Samples/Mobile/navigate' };
TC.registerModel(function (pane) {
    TC.toolbar.title('Navigate!');
    TC.toolbar.back(true);
});
//@ sourceURL=tribe://Panes/Samples/Mobile/navigate.js
TC.scriptEnvironment = { resourcePath: '/Samples/Mobile2/layout' };
TC.registerModel(function (pane) {
    TC.toolbar.title('Title!');
    TC.toolbar.options([
        { text: 'test', func: function () { alert('test'); } },
        { text: 'test2', func: function () { alert('test2'); } }
    ]);

    this.listData = {
        items: [
            { id: 1, name: 'test1' },
            { id: 2, name: 'test2' },
            { id: 3, name: 'test3' }
        ],
        itemText: function (item) { return item.id + ': ' + item.name; },
        headerText: 'Select Item:',
        itemClick: function(item) {
        },
        cssClass: 'rounded'
    };

    this.overlay = function() {
        TC.overlay('overlay');
    };

    this.toolbar = function () {
        TC.toolbar.visible(!TC.toolbar.visible());
    };
});
//@ sourceURL=tribe://Panes/Samples/Mobile2/layout.js
TC.scriptEnvironment = { resourcePath: '/Samples/Mobile2/welcome' };
TC.registerModel(function (pane) {
    TC.toolbar.defaults.back = true;

    this.samples = function() {
        pane.navigate('layout');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});
//@ sourceURL=tribe://Panes/Samples/Mobile2/welcome.js
TC.scriptEnvironment = { resourcePath: '/Samples/Tasks/create' };
// Declare model constructors using this simple function.
// Tribe creates an instance and binds it to the template.

TC.registerModel(function (pane) {
    var self = this;
    
    this.task = ko.observable();
    
    this.create = function() {
        pane.pubsub.publish('task.create', self.task());
        self.task('');
    };
});
//@ sourceURL=tribe://Panes/Samples/Tasks/create.js
TC.scriptEnvironment = { resourcePath: '/Samples/Tasks/list' };
TC.registerModel(function(pane) {
    var self = this;

    this.tasks = ko.observableArray(['Sample task']);

    // Using messages decouples your components.
    // Tribe cleans up subscriptions automatically.
    pane.pubsub.subscribe('task.create', function(task) {
        self.tasks.push(task);
    });

    pane.pubsub.subscribe('task.delete', function (task) {
        var index = self.tasks.indexOf(task);
        self.tasks.splice(index, 1);
    });
});
//@ sourceURL=tribe://Panes/Samples/Tasks/list.js
TC.scriptEnvironment = { resourcePath: '/Samples/Tasks/task' };
TC.registerModel(function(pane) {
    var self = this;

    this.task = pane.data;
    
    this.deleteTask = function() {
        pane.pubsub.publish('task.delete', self.task);
    };
});
//@ sourceURL=tribe://Panes/Samples/Tasks/task.js
