window.Article = {
    createHelpers: function(pubsub) {
        Article.show = function(section, topic) {
            return function() {
                pubsub.publish('article.show', { section: section, topic: topic });
            };
        };
    }
};function articleUrlProvider(options) {
    return {
        url: Navigation.isHome(options.data) ? '/' : '?section=' + encodeURI(options.data.section) + '&topic=' + encodeURI(options.data.topic)
    };
}Navigation = {
    isHome: function(article) {
        return article && article.section === 'About' && article.topic === 'index';
    },
    Guides: {
        'Guides': {
            'Features': 'features',
            'Getting Started': 'gettingStarted'
        }
    },
    Reference: {
        'API': {
            'Panes': 'panes',
            'Global Options': 'options',
            'Core': 'core',
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
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n&lt;input data-bind="value: task" />\n&lt;button data-bind="click: create">Create&lt;/button></pre>'
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
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Todos&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">\n            // all the configuration you need!\n            $(TC.run);\n        &lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'layout\'">&lt;/body>\n&lt;/html></pre>'
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
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n&lt;button data-bind="click: deleteTask">x&lt;/button>\n&lt;span data-bind="text: task">&lt;/span></pre>'
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
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n    &lt;head>\n        &lt;title>Todos&lt;/title>\n        &lt;script src="jquery.js">&lt;/script>\n        &lt;script src="knockout.js">&lt;/script>\n        &lt;script src="Tribe.js">&lt;/script>\n        \n        &lt;script type="text/javascript">\n            $(TC.run);\n        &lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'chat\'">&lt;/body>\n&lt;/html></pre>'
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
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Remember our chat pane from the previous example? -->\n&lt;ul class="rounded" data-bind="pane: \'../Chat/chat\'">\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html>\n&lt;html>\n  &lt;head>\n    &lt;title>Tribe Mobile&lt;/title>\n    &lt;meta name="viewport" \n      content="minimum-scale=1.0, width=device-width, \n               maximum-scale=1.0, user-scalable=no" />\n\n    &lt;script src="jquery.js">&lt;/script>\n    &lt;script src="knockout.js">&lt;/script>\n    &lt;script src="Tribe.js">&lt;/script>\n    &lt;script src="Tribe.Mobile.js">&lt;/script>\n        \n    &lt;script type="text/javascript">\n      $(TC.run);\n    &lt;/script>\n  &lt;/head>\n  &lt;body data-bind="pane: \'/Mobile/main\',\n                   data: { pane: \'welcome\' }">\n  &lt;/body>\n&lt;/html></pre>'
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
    filename: 'overlay.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul>\n    &lt;li>One&lt;/li>\n    &lt;li>Two&lt;/li>\n    &lt;li>Three&lt;/li>\n    &lt;li>Four&lt;/li>\n&lt;/ul>\n\n&lt;button class="white" data-bind="click: function() { pane.remove(); }">Close&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'welcome.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">ul.welcome li {\n    background: #103070;\n    color: white;\n    text-align: center;\n    text-shadow: 3px 3px 0 black, 5px 5px 5px rgba(0, 0, 0, 0.5);\n    font: bold 64pt \'Cambria\';\n}</pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="rounded welcome">\n    &lt;li>tribe&lt;/li>\n&lt;/ul>\n&lt;ul class="rounded">\n    &lt;li data-bind="click: samples">Samples&lt;/li>\n&lt;/ul>\n&lt;ul class="rounded">\n    &lt;li data-bind="click: chat">Chat&lt;/li>\n&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Mobile'] = Samples['Mobile'] || [];
Samples['Mobile'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {\n    TC.toolbar.defaults.back = true;\n\n    this.samples = function() {\n        pane.navigate(\'layout\');\n    };\n\n    this.chat = function () {\n        pane.navigate(\'chat\');\n    };\n});</pre>'
});$('<style/>')
    .attr('class', '__tribe')
    .text('.example3 .sample .samplePane{padding:0;width:320px;height:480px;left:22px;top:136px}.example3 .sample>*{height:711px}.example3 .sample .source{width:548px}.example3 .sample .result{width:365px;height:721px;border:none;background:url(\'../Images/device.mobile.png\');margin-left:15px}.example3 .sample .fileList{width:548px;height:auto}.example3 .sample .fileContent{width:548px;height:auto}.example3 .result .title{display:none}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.features{text-align:center;color:#081735;font-size:18px}.features.small{font-size:inherit}.features>*{vertical-align:top;display:inline-block;width:180px}.features.small>*{width:100px}.features strong{font-size:1.1em;height:50px;color:#701010;padding-bottom:10px}.features>* *{text-align:center;margin:0 auto;display:block}.features.small img{margin-bottom:5px}.features img{margin-bottom:20px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.knockout.block{text-align:center;background:center url(\'../Images/knockout/background.jpg\')}.knockout .features{display:inline-block;margin-left:50px;background-clip:padding-box;color:#b64838}.knockout .logo{color:#fff;vertical-align:top;margin-top:20px;display:inline-block;width:250px;font:inherit}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.masthead{color:#fff;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);background:#103070;text-align:center;padding-bottom:20px;border-bottom:1px #333 solid}.masthead h1{height:60px;font-size:96pt;padding:0}.masthead h2{font-size:18px}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.content{width:980px;position:relative;left:50%;margin-left:-490px!important}.logo{font-weight:bold;font-family:\'Cambria\'}.block{background:#fff;border:1px solid #aaa;margin-bottom:10px;margin-top:10px;border-radius:8px;box-sizing:border-box}.block p{margin:10px 20px;font-size:18px}.out .content.block{margin-top:0}.blockHeader{color:#fff;font-weight:bold;height:20px;border-top-left-radius:8px;border-top-right-radius:8px;padding:10px;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);background:#103070;background:-moz-linear-gradient(top,#103070 0%,#457ae4 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#103070),color-stop(100%,#457ae4));background:-webkit-linear-gradient(top,#103070 0%,#457ae4 100%);background:-o-linear-gradient(top,#103070 0%,#457ae4 100%);background:-ms-linear-gradient(top,#103070 0%,#457ae4 100%);background:linear-gradient(to bottom,#103070 0%,#457ae4 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#103070\',endColorstr=\'#457ae4\',GradientType=0)}.api.content pre{padding:0 50px}.api.content ul{list-style:none}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.footer{text-align:right;font-size:10pt;color:#888;text-shadow:1px 1px rgba(255,255,255,.2)}.footer a,.footer a:active,.footer a:visited,.footer a:link{text-decoration:none;color:#66f}.footer a:hover{color:#fff}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('.header{height:46px}.header .background{position:absolute;top:0;width:100%;height:45px;border-bottom:1px #333 solid;background:#45484d;background:-moz-linear-gradient(top,#45484d 0%,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#45484d),color-stop(100%,#000));background:-webkit-linear-gradient(top,#45484d 0%,#000 100%);background:-o-linear-gradient(top,#45484d 0%,#000 100%);background:-ms-linear-gradient(top,#45484d 0%,#000 100%);background:linear-gradient(to bottom,#45484d 0%,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#45484d\',endColorstr=\'#000000\',GradientType=0);z-index:-2}.header .logo{display:none;position:absolute;cursor:pointer;top:2px;left:20px;color:#fff;font-size:22pt;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5)}.header .buttons{text-align:center;position:absolute;right:0}.header .buttons span{font-size:.7em;float:left;color:#eee;text-shadow:2px 2px 0 black;padding:9px;cursor:pointer;background:rgba(32,96,224,.2);font-size:1.2em;width:110px;height:27px;margin:0;margin-left:-1px;border-left:1px solid #000;border-right:1px solid #000}.header .buttons span:hover{background:#fff;background:-moz-linear-gradient(top,#fff 0%,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#fff),color-stop(100%,#000));background:-webkit-linear-gradient(top,#fff 0%,#000 100%);background:-o-linear-gradient(top,#fff 0%,#000 100%);background:-ms-linear-gradient(top,#fff 0%,#000 100%);background:linear-gradient(to bottom,#fff 0%,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffffff\',endColorstr=\'#000000\',GradientType=0);color:#aaa}')
    .appendTo('head');
$('<style/>')
    .attr('class', '__tribe')
    .text('body{background:#ccc;font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif;padding:0;margin:0;overflow-y:scroll}h1,h2,h3{margin-top:0}.padded{padding:10px}.underline{text-decoration:underline}.clear{clear:both}a,a:active,a:visited,a:link{text-decoration:none;cursor:pointer;color:#1b50ba}a:hover{text-decoration:underline}')
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
    .append('<script type="text/template" id="template--Content-About-construction"><div class="content block">\n    <div class="blockHeader">Under Construction</div>\n    <p>The content for this article is still being created.</p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-example1"><div class="example1 block">\n    <div class="blockHeader">Show Me!</div>\n    \n    <p>\n        Tribe allows you to easily break your UI down into "panes" that can consist \n        of a JavaScript model, a HTML template and CSS stylesheet. \n    </p>\n    <p>\n        Simply create these files and refer to the pane by name. Tribe does the rest - loads\n        the resources, renders the template and binds an instance of the model to it. \n        No complex configuration required.\n    </p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Tasks\', initialFile: \'layout.htm\' }"></div>\n    \n    <p>\n        This is pretty trivial example. You can check out the <a href="" target="_blank">source</a> \n        to this site or the <a href="" target="_blank">samples</a>. \n    </p>\n    <p>\n        If you\'re using Chrome, head over to the <a href="debug.html">debug version</a> of the site \n        and look at the source in the developer tools.\n    </p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-example2"><div class="example2 block">\n    <div class="blockHeader">Seamless, Real Time Communication</div>\n    \n    <p>Connect your users in real time with just a few lines of code - messages you publish are seamlessly broadcast to other users or internal services.</p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Chat\', initialFile: \'chat.js\', rootPane: \'chat\' }"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-example3"><div class="example3 block">\n    <div class="blockHeader">Mobile App</div>\n    \n    <p>\n        Tribe makes it effortless to create mobile device apps that look and perform like native apps, using the same code as your web app.\n    </p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Mobile\', initialFile: \'index.html\', rootPane: { path: \'/Mobile/main\', data: { pane: \'/Samples/Mobile/welcome\' } } }"></div>\n    \n    <p>\n        Point your phone\'s browser at <a href="m.html" target="_blank">http://tribejs.com/m.html</a> to see the demo on your device.\n    </p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-features"><div class="block">\n    <div class="blockHeader">Key Features</div>\n    <div class="padded features">\n        <div>\n            <img src="Images/Features/composite.png" />\n            <strong>Composite UI</strong>\n            <span>Simple, powerful UI decomposition.</span>\n        </div>\n        <div>\n            <img src="Images/Features/resources.png" />\n            <strong>Resource Management</strong>\n            <span>Full lifecycle management. Powerful load optimisation.</span>\n        </div>\n        <div>\n            <img src="Images/Features/communication.png" />\n            <strong>Seamless Communication</strong>\n            <span>Broadcast messages to other users and internal services in real time.</span>\n        </div>\n        <div>\n            <img src="Images/Features/mobile.png" />\n            <strong>Mobile Devices</strong>\n            <span>Effortlessly target web and mobile platforms with a shared codebase.</span>\n        </div>\n        <div>\n            <img src="Images/Features/simple.png" />\n            <strong>Simple and Intuitive</strong>\n            <span>Flexible, intuitive file structure. No complex configuration.</span>\n        </div>\n    </div>\n    <div class="padded">\n        <a data-bind="click: Article.show(\'Guides\', \'features\')">Read more...</a>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-index"><div>\n    <div data-bind="pane: \'masthead\'"></div>\n\n    <div class="content">\n        <div data-bind="pane: \'knockout\'"></div>\n        <div data-bind="pane: \'features\'"></div>\n        <div data-bind="pane: \'example1\'"></div>\n        <div data-bind="pane: \'example2\'"></div>\n        <div data-bind="pane: \'example3\'"></div>\n\n        <!--<ul>\n                <li>Tribe comes with a set of UI components but integrates easily with others, like jQuery UI.</li>\n            </ul>-->\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-knockout"><div class="padded knockout block">\n    <div class="logo">\n        <span>Built with the power of</span>\n        <img src="Images/knockout/logo.png"/>\n    </div>\n    <div class="small padded features block">\n        <div>\n            <img src="Images/knockout/bindings.png" />\n            <span>Declarative Bindings</span>\n        </div>\n        <div>\n            <img src="Images/knockout/refresh.png" />\n            <span>Automatic UI Refresh</span>\n        </div>\n        <div>\n            <img src="Images/knockout/dependencies.png" />\n            <span>Dependency Tracking</span>\n        </div>\n        <div>\n            <img src="Images/knockout/templating.png" />\n            <span>Templating</span>\n        </div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-About-masthead"><div class="masthead">\n    <h1 class="logo">tribe</h1>            \n    <h2>Easy to build, fast, integrated web and mobile <span class="underline">systems</span>.</h2>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-features"><div class="content block">\n    <div class="blockHeader">Features</div>\n    <p>Under construction</p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-getStarted"><div class="content block">\n    <div class="blockHeader">Get Started</div>\n    <p>Under construction</p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Guides-Guides-index"><div class="content block">\n    <div class="blockHeader">Guides</div>\n    <p>Under construction</p>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-API-core"><div class="api content block">\n    <div class="blockHeader">Core API</div>\n\n    <pre>TC.run = function (resourcesToPreload, initialModel)</pre>\n    <p>\n        Start Tribe.Composite, ensuring the specified resources are loaded first.\n    </p>\n    <ul class="parameters">\n        <li>resourcesToPreload - array of strings containing URLs to required HTML, CSS or JS resources</li>\n        <li>initialModel - object to pass as the model to the initial ko.applyBindings call</li>\n    </ul>\n\n    <pre>TC.createNode = function (element, paneOptions, parentNode, context)</pre>\n    <p>\n        createNode creates a new Pane object and binds it to the specified element\n        with the specified pane options.\n    </p>\n    <ul class="parameters">\n        <li>element - selector | HTMLElement | Node | Pane</li>\n        <li>paneOptions - object containing pane options</li>\n        <li>parentNode - Node to be used as the parent node</li>\n        <li>context - Context object to be used</li>\n    </ul>\n\n    <pre>TC.appendNode = function (target, paneOptions, parentNode, context)</pre>\n    <p></p>\n    <ul class="parameters">\n        <li>element - selector | HTMLElement | Node | Pane</li>\n        <li>paneOptions - object containing pane options</li>\n        <li>parentNode - Node to be used as the parent node</li>\n        <li>context - Context object to be used</li>\n    </ul>\n\n    <pre>TC.insertNodeAfter = function (target, paneOptions, parentNode, context)</pre>\n    <p></p>\n    <ul class="parameters">\n        <li>element - selector | HTMLElement | Node | Pane</li>\n        <li>paneOptions - object containing pane options</li>\n        <li>parentNode - Node to be used as the parent node</li>\n        <li>context - Context object to be used</li>\n    </ul>\n\n    <pre>TC.nodeFor = function (element)</pre>\n    <p></p>\n    <ul class="parameters">\n        <li>element - selector | HTMLElement | Node | Pane</li>\n    </ul>\n\n    <pre>TC.registerModel = function (modelConstructor, options, resourcePath)</pre>\n    <p>\n        Registers a model in the repository. Either the TC.scriptEnvironment must be set first\n        or a resourcePath must be specified.\n    </p>\n    <ul class="parameters">\n        <li>element - selector | HTMLElement | Node | Pane</li>\n        <li>options - object</li>\n        <li>resourcePath - string</li>\n    </ul>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-API-index"><div class="content block">\n    <div class="blockHeader">Reference</div>\n    <p>Under construction</p>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-API-options"><div class="api content block">\n    <div class="blockHeader">Global Options</div>\n    <pre>\nTC.options = {\n    basePath: \'\',\n    synchronous: false,\n    splitScripts: false,\n    handleExceptions: true,\n    loadStrategy: \'adhoc\',\n    events: [\'loadResources\', \'createPubSub\', \'createModel\', \'initialiseModel\', \n        \'renderPane\', \'renderComplete\', \'active\', \'dispose\']\n}\n    </pre>\n    <ul>\n        <li>basePath - root path to load panes from</li>\n        <li>synchronous - perform load operations synchronously</li>\n        <li>splitScripts - split any loaded scripts on sourceURL tags and load individually</li>\n        <li>handleExceptions - handle exceptions raised - set to false in debug mode</li>\n        <li>loadStrategy - string containing the name of the registered load strategy to use</li>\n        <li>events - array of ordered event names to execute in the pane rendering pipeline</li>\n    </ul>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-API-panes"><div class="api content block">\n    <div class="blockHeader">Creating Panes</div>\n    <p>Panes can be created using the pane binding handler or with JavaScript using the core API functions.</p>\n    <pre>&lt;div data-bind="pane: paneOptions">&lt;/div></pre>\n    <p>paneOptions can either be a string representing the path to the pane, or an object with the following properties</p>\n    <pre>\n{\n    path: string,\n    data: any,\n    transition: string,\n    reverseTransitionIn: boolean,\n    handlesNavigation: string | navigationOptions,\n    id: any,\n    skipPath: boolean\n}\n    </pre>\n</div>\n\n<div class="api content block">\n    <div class="blockHeader">Models</div>\n    <p>Models must be declared with the following function:</p>\n    <pre>TC.registerModel(</pre>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Content-Reference-API-utilities"><div class="api content block">\n    <div class="blockHeader">Panes</div>\n    <div>\n        <pre>TC.Utils.getPaneOptions = function(value, otherOptions)</pre>\n        <p>Normalise the passed value and merge the other options.</p>\n\n        <pre>TC.Utils.bindPane = function (node, element, paneOptions, context)</pre>\n        <p>Load and bind the pane specified in paneOptions to the specified element and link it to the specified node.</p>\n\n        <pre>TC.Utils.insertPaneAfter = function (node, target, paneOptions, context)</pre>\n        <p>As bindPane, but create a new DIV element and insert it after the specified target.</p>\n    </div>\n</div>\n\n<div class="api content block">\n    <div class="blockHeader">Miscellaneous</div>\n    <pre>TC.Utils.try = function(func, args, handleExceptions, message)</pre>\n    <pre>TC.Utils.idGenerator = function () { return { next: function() }</pre>\n    <pre>TC.Utils.getUniqueId = function ()</pre>\n    <pre>TC.Utils.cleanElement = function (element)</pre>\n</div>\n\n<div class="api content block">\n    <div class="blockHeader">Objects</div>\n    <pre>TC.Utils.arguments = function (args)</pre>\n    <pre>TC.Utils.removeItem = function (array, item)</pre>\n    <pre>TC.Utils.inheritOptions = function(from, to, options)</pre>\n    <pre>TC.Utils.evaluateProperty = function(target, property)</pre>\n</div>\n\n<div class="api content block">\n    <div class="blockHeader">Embedded State</div>\n    <pre>TC.Utils.embedState = function (model, context, node)</pre>\n    <pre>TC.Utils.contextFor = function (element)</pre>\n    <pre>TC.Utils.extractContext = function (koBindingContext)</pre>\n    <pre>TC.Utils.extractNode = function (koBindingContext)</pre>\n</div>\n\n<div class="api content block">\n    <div class="blockHeader">Events</div>\n    <pre>TC.Utils.elementDestroyed = function (element) { return $.Deferred(); }</pre>\n    <pre>TC.Utils.raiseDocumentEvent = function (name, data)</pre>\n    <pre>TC.Utils.handleDocumentEvent = function (name, handler)</pre>\n    <pre>jQuery.Event("destroyed")</pre>\n</div>\n\n<div class="api content block">\n    <div class="blockHeader">Collections</div>\n    <pre>TC.Utils.each = function (collection, iterator)</pre>\n    <pre>TC.Utils.map = function (collection, iterator)</pre>\n    <pre>TC.Utils.filter = function(array, iterator)</pre>\n    <pre>$.complete = function (deferreds)</pre>\n</div>\n\n<div class="api content block">\n    <div class="blockHeader">Paths</div>\n    <pre>\n                Path = function(path) { return {\n                    withoutFilename: function() {\n                    filename: function() {\n                    extension: function() {\n                    withoutExtension: function() {\n                    combine: function (additionalPath) {\n                    isAbsolute: function() {\n                    makeAbsolute: function() {\n                    makeRelative: function() {\n                    asMarkupIdentifier: function() {\n                    setExtension: function(extension) {\n                    toString: function()\n                }\n            </pre>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Interface-content"><div data-bind="pane: panePath">\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-footer"><div class="footer content">\n    The Tribe platform and all resources on this website are licensed under the <a target="_blank" href="http://opensource.org/licenses/mit-license.php">MIT license</a>.\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-header"><div class="header">\n    <div class="background"></div>\n    \n    <div class="content">\n        <div class="logo" data-bind="click: Article.show(\'About\', \'index\')">tribe</div>\n        <div class="buttons">\n            <span data-bind="click: Article.show(\'Guides\', \'getStarted\')">Get Started</span>\n            <span data-bind="click: Article.show(\'Guides\', \'Guides/index\')">Guides</span>\n            <span data-bind="click: Article.show(\'Reference\', \'API/index\')">Reference</span>\n            <span data-bind="click: Article.show(\'About\', \'index\')">Tests</span>\n            <span data-bind="click: source">Source</span>\n        </div>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-layout"><div data-bind="pane: \'header\'"></div>\n<div data-bind="pane: \'main\'"></div>\n<div data-bind="pane: \'footer\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-main"><div data-bind="pane: \'navigation\'"></div>\n<div data-bind="pane: { path: \'content\', data: { section: \'About\', topic: \'index\' }, handlesNavigation: { transition: \'fade\', browser: articleUrlProvider } }"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-navigation"><div class="navigation">\n    <ul data-bind="foreach: items">\n        <li data-bind="click: $root.showSection, css: { selectedItem: $data.topic === $root.selectedTopic() }">\n            <span data-bind="text: $data.displayText"></span>\n        </li>\n        <ul data-bind="visible: $data.key === $root.selectedParent(), foreach: $data.items">\n            <li data-bind="click: $root.showArticle, text: $data.displayText, css: { selectedItem: $data.topic === $root.selectedTopic() }"></li>\n        </ul>\n    </ul>\n    <div class="clear"></div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Interface-sample"><div class="sample">\n    <div class="source">\n        <div class="title">Source</div>\n\n        <ul class="fileList" data-bind="foreach: files">\n            <li data-bind="click: $root.selectFile, css: { selectedFile: $root.selectedFile() === $data }">\n                <img data-bind="attr: { src: icon }" />\n                <span data-bind="text: filename"></span>\n            </li>\n        </ul>\n\n        <div class="fileContent" data-bind="html: selectedFile().content"></div>\n    </div>\n\n    <div class="result">\n        <div class="title">Result</div>\n        <div class="samplePane" data-bind="pane: samplePane"></div>\n    </div>\n</div>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Chat-chat"><div data-bind="pane: \'sender\'"></div>\n<div data-bind="pane: \'messages\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Chat-messages"><ul class="messages" data-bind="foreach: messages">\n    <li>\n        <span data-bind="text: name"></span>:\n        <span data-bind="text: message"></span>\n    </li>\n</ul>\n</script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Chat-sender"><div class="chat">\n    <div>\n        Name: <input data-bind="value: name" />    \n    </div>\n\n    <div>\n        <input data-bind="value: message" />\n        <button data-bind="click: send">Send</button>\n    </div>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile-chat"><!-- Remember our chat pane from the previous example? -->\n<ul class="rounded" data-bind="pane: \'../Chat/chat\'">\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile-layout"><div class="layout">\n    <ul class="rounded">\n        <li class="forward">Test1</li>\n        <li class="forward">Test2</li>\n        <li class="arrow" data-bind="click: function() {}">Test3</li>\n        <li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New Player...\', }"></li>\n    </ul>\n    \n    <div data-bind="pane: \'/Mobile/list\', data: listData"></div>\n    \n    <button class="white" data-bind="click: overlay">Overlay</button>\n    <button class="white" data-bind="click: toolbar">Toolbar</button>\n    <button class="white" data-bind="click: navigate">Navigate</button>\n</div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile-overlay"><ul>\n    <li>One</li>\n    <li>Two</li>\n    <li>Three</li>\n    <li>Four</li>\n</ul>\n\n<button class="white" data-bind="click: function() { pane.remove(); }">Close</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Mobile-welcome"><ul class="rounded welcome">\n    <li>tribe</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: samples">Samples</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: chat">Chat</li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-create"><!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n<input data-bind="value: task" />\n<button data-bind="click: create">Create</button></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-layout"><h1>Todos</h1>\n\n<!-- Creating panes is simple -->\n<div data-bind="pane: \'create\'"></div>\n<div data-bind="pane: \'list\'"></div></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-list"><!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n<ul class="taskList" data-bind="foreach: tasks">\n    <li data-bind="pane: \'task\', data: $data"></li>\n</ul></script>');
$('head')
    .append('<script type="text/template" id="template--Samples-Tasks-task"><!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n<button data-bind="click: deleteTask">x</button>\n<span data-bind="text: task"></span></script>');
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
    this.source = function() {

    };
    
    window.addEventListener('navigating', navigating);
    function navigating(e) {
        if (Navigation.isHome(e.data.options.data))
            hide();
        else
            show();
    }

    function show() {
        if (!$('.header .logo').is(':visible'))
            TC.transition('.header .logo', 'fade').in();
    }

    function hide() {
        if ($('.header .logo').is(':visible'))
            TC.transition('.header .logo', 'fade').out(false);
    }

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };
});
//@ sourceURL=tribe://Panes/Interface/header.js
TC.scriptEnvironment = { resourcePath: '/Interface/layout' };
TC.registerModel(function (pane) {
    Article.createHelpers(pane.pubsub);
});
//@ sourceURL=tribe://Panes/Interface/layout.js
TC.scriptEnvironment = { resourcePath: '/Interface/navigation' };
TC.registerModel(function (pane) {
    var self = this;
    var currentSection;

    this.items = ko.observableArray();
    this.selectedTopic = ko.observable();
    this.selectedParent = ko.computed(function () {
        var topic = self.selectedTopic();
        if (!topic) return null;
        var index = topic.indexOf('/');
        return index == -1 ? topic :
            topic.substr(0, index);
    });

    this.showSection = function (item) {
        self.selectedTopic(item.topic);
    };

    this.showArticle = function (item) {
        self.selectedTopic(item.topic);
        pane.pubsub.publish('article.show', { section: currentSection, topic: item.topic });
    };

    window.addEventListener('navigating', navigating);
    function navigating(e) {
        var data = e.data.options.data || {};
        self.selectedTopic(data.topic);
        
        if (currentSection !== data.section) {
            currentSection = data.section;
            var items = mapNavigation(data.section);
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

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };

    // maps the cleaner API navigation structure into a structure suitable for data bindings. could be refactored out.
    function mapNavigation(section) {
        return TC.Utils.map(Navigation[section], function (item, key) {
            return {
                displayText: key,
                section: section,
                key: key,
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
TC.scriptEnvironment = { resourcePath: '/Samples/Mobile/welcome' };
TC.registerModel(function (pane) {
    TC.toolbar.defaults.back = true;

    this.samples = function() {
        pane.navigate('layout');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});
//@ sourceURL=tribe://Panes/Samples/Mobile/welcome.js
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
