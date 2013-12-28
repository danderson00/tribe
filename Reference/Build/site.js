
// Infrastructure/Article.js

Article = {
    show: function (section, topic) {
        return function () {
            TC.nodeFor('.content').pane.pubsub.publish('article.show', { section: section, topic: topic });
        };
    }
};


// Infrastructure/articleUrlProvider.js

var articleUrlProvider = {
    urlDataFrom: function(options) {
        return {
            url: Navigation.isHome(options.data) ? window.location.pathname : '#section=' + encodeURI(options.data.section) + '&topic=' + encodeURI(options.data.topic)
        };
    },
    paneOptionsFrom: function (querystring) {
        if (querystring) {
            var options = TC.Utils.Querystring.parse(querystring);
            return {
                path: '/Interface/content',
                data: {
                    section: options.section,
                    topic: options.topic
                }
            };
        }
    }
};


// Infrastructure/navigation.js

Navigation = {
    isHome: function(article) {
        return article && article.section === 'About' && article.topic === 'home';
    },
    Guides: {
        'Introduction': {
            'Features': 'features',
            'Getting Started': 'getStarted'
        },
        'Tutorials': {
            'Working With Panes': 'panes',
            'Webmail Tutorial': 'webmail',
            'Deployment With PackScript': 'packscript',
            'Modelling Processes': 'creditcard'
        }
    },
    Reference: {
        'Core': {
            'Panes': 'panes',
            'Transitions': 'transitions',
            'API': 'api',
            'Binding Handlers': 'bindingHandlers',
            'Global Options': 'options'
        },
        'Types': {
            'Flow': 'Flow',
            'History': 'History',
            'Loader': 'Loader',
            'Logger': 'Logger',
            'Models': 'Models',
            'Node': 'Node',
            'Operation': 'Operation',
            'Pane': 'Pane',
            'Pipeline': 'Pipeline',
            'Templates': 'Templates'
        },
        'Utilities': {
            'Panes': 'panes',
            'Paths': 'paths',
            'Events': 'events',
            'Embedded State': 'embeddedState',
            'Objects': 'objects',
            'Collections': 'collections',
            'Miscellaneous': 'misc'
        },
        'PubSub': {
            'Core': 'core',
            'Message Envelopes': 'envelopes',
            'Global Options': 'options',
            'Sagas': 'Saga'
            },
        'MessageHub': {
            'Configuration': 'configuration',
            'Client API': 'client'
        },
        'PackScript': {
            'Operation': 'operation',
            'Packing': 'pack',
            'Synchronising': 'sync',
            'Compressing': 'zip',
            'Including Files': 'includes',
            'Templates': 'templates',
            'Built-in': 'builtins'
        }
        //'Mobile': {},
        //'Forms': {},
        //'Components': {}
    }
};


// Infrastructure/Reference.js

Reference = {
    Utilities: {},
    Types: {}
};

Tutorials = {};


// Infrastructure/samples.js

Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- Familiar knockout bindings. Any properties or functions<br/>     declared in the JS model are available for use --><br/><br/>&lt;input data-bind="value: task" /><br/>&lt;button data-bind="click: create">Create&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>// Declare model constructors using this simple function.<br/>// Tribe creates an instance and binds it to the template.<br/><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    this.task = ko.observable();<br/>    <br/>    this.create = function() {<br/>        pane.pubsub.publish(\'task.create\', self.task());<br/>        self.task(\'\');<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Todos&lt;/title><br/>        &lt;script src="jquery.js">&lt;/script><br/>        &lt;script src="knockout.js">&lt;/script><br/>        &lt;script src="Tribe.js">&lt;/script><br/>        <br/>        &lt;script type="text/javascript"><br/>            // all the configuration you need!<br/>            $(TC.run);<br/>        &lt;/script><br/>    &lt;/head><br/>    &lt;body data-bind="pane: \'layout\'">&lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;h1>Todos&lt;/h1><br/><br/>&lt;!-- Creating panes is simple --><br/>&lt;div data-bind="pane: \'create\'">&lt;/div><br/>&lt;div data-bind="pane: \'list\'">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>/* CSS can be maintained alongside the <br/>   template it corresponds with */<br/><br/>.taskList {<br/>    list-style: none;<br/>    padding: 0;<br/>}<br/><br/>.taskList li {<br/>    padding: 5px;<br/>}</pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!--Decompose your UI in a way that makes sense.<br/>    Panes can be nested as deep as you need. --><br/><br/>&lt;ul class="taskList" data-bind="foreach: tasks"><br/>    &lt;li data-bind="pane: \'task\', data: $data">&lt;/li><br/>&lt;/ul></pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.tasks = ko.observableArray([\'Sample task\']);<br/><br/>    // Using messages decouples your components.<br/>    // Tribe cleans up subscriptions automatically.<br/>    pane.pubsub.subscribe(\'task.create\', function(task) {<br/>        self.tasks.push(task);<br/>    });<br/><br/>    pane.pubsub.subscribe(\'task.delete\', function (task) {<br/>        var index = self.tasks.indexOf(task);<br/>        self.tasks.splice(index, 1);<br/>    });<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- Familiar knockout bindings. Any properties or functions<br/>     declared in the JS model are available for use --><br/><br/>&lt;button data-bind="click: deleteTask">x&lt;/button><br/>&lt;span data-bind="text: task">&lt;/span></pre>'
});
Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.task = pane.data;<br/>    <br/>    this.deleteTask = function() {<br/>        pane.pubsub.publish(\'task.delete\', self.task);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div data-bind="pane: \'sender\'">&lt;/div><br/>&lt;div data-bind="pane: \'messages\'">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    // Hook up our message hub and join a channel<br/>    TMH.initialise(pane.pubsub);<br/>    TMH.joinChannel(\'chat\', {<br/>         serverEvents: [\'chat.*\']<br/>    });<br/><br/>    // The dispose function is called automatically<br/>    // when the pane is removed from the DOM.<br/>    this.dispose = function() {<br/>        TMH.leaveChannel(\'chat\');<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Todos&lt;/title><br/>        &lt;script src="jquery.js">&lt;/script><br/>        &lt;script src="knockout.js">&lt;/script><br/>        &lt;script src="Tribe.js">&lt;/script><br/>        <br/>        &lt;script type="text/javascript"><br/>            $(TC.run);<br/>        &lt;/script><br/>    &lt;/head><br/>    &lt;body data-bind="pane: \'chat\'">&lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>.messages {<br/>    list-style: none;<br/>    padding: 0;<br/>}<br/><br/>.messages li {<br/>    padding: 5px;<br/>}</pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;ul class="messages" data-bind="foreach: messages"><br/>    &lt;li><br/>        &lt;span data-bind="text: name">&lt;/span>:<br/>        &lt;span data-bind="text: message">&lt;/span><br/>    &lt;/li><br/>&lt;/ul><br/></pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.messages = ko.observableArray();<br/><br/>    pane.pubsub.subscribe(\'chat.message\',<br/>        function (message) {<br/>            self.messages.push(message);<br/>        });<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div class="chat"><br/>    &lt;div><br/>        Name: &lt;input data-bind="value: name" />    <br/>    &lt;/div><br/><br/>    &lt;div><br/>        Message: &lt;input data-bind="value: message" /><br/>        &lt;button data-bind="click: send">Send&lt;/button><br/>    &lt;/div><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.name = ko.observable(\'Anonymous\');<br/>    this.message = ko.observable();<br/><br/>    this.send = function() {<br/>        pane.pubsub.publish(\'chat.message\', {<br/>            name: self.name(),<br/>            message: self.message()<br/>        });<br/>        self.message(\'\');<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- Let\'s reuse our panes from the previous example --><br/>&lt;ul class="rounded"><br/>    &lt;li data-bind="pane: \'../Chat/sender\'">&lt;/li><br/>    &lt;li data-bind="pane: \'../Chat/messages\'">&lt;/li><br/>&lt;/ul></pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>  &lt;head><br/>    &lt;title>Tribe Mobile&lt;/title><br/>    <br/>    &lt;!-- Some metadata for mobile browsers --><br/>    &lt;meta name="viewport"<br/>          content="minimum-scale=1.0, width=device-width, <br/>                   maximum-scale=1.0, user-scalable=no" /><br/>     <br/>    &lt;script src="jquery.js">&lt;/script><br/>    &lt;script src="knockout.js">&lt;/script><br/>    &lt;script src="Tribe.js">&lt;/script><br/><br/>    &lt;!-- Tribe.Mobile.js is all you need to load --><br/>    &lt;script src="Tribe.Mobile.js">&lt;/script><br/><br/>    &lt;script type="text/javascript"><br/>        $(TC.run);<br/>    &lt;/script><br/>  &lt;/head><br/><br/>  &lt;!-- Use /Mobile/main as your host pane --><br/>  &lt;body data-bind="pane: \'/Mobile/main\',<br/>                   data: { pane: \'welcome\' }"><br/>  &lt;/body><br/>&lt;/html><br/></pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'navigate.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;ul>&lt;li>You selected an item in the list...&lt;/li>&lt;/ul><br/>&lt;ul>&lt;li>Click the back button to go back.&lt;/li>&lt;/ul><br/></pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'overlay.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;ul><br/>    &lt;li>One&lt;/li><br/>    &lt;li>Two&lt;/li><br/>    &lt;li>Three&lt;/li><br/>    &lt;li>Four&lt;/li><br/>&lt;/ul><br/><br/>&lt;button class="white" <br/>        data-bind="click: function() { pane.remove(); }"><br/>    Close<br/>&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'samples.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div class="layout"><br/>    &lt;ul class="rounded"><br/>        &lt;li><br/>            Display any HTML in themed blocks<br/>        &lt;/li><br/>        &lt;li class="arrow" data-bind="click: navigate"><br/>            With arrow...<br/>        &lt;/li><br/>        &lt;li class="forward" data-bind="click: navigate"><br/>            Alternate arrow...<br/>        &lt;/li><br/>        &lt;li data-bind="pane: \'/Mobile/editable\',<br/>                       data: { initialText: \'New Item...\', }">&lt;/li><br/>    &lt;/ul><br/>    <br/>    &lt;div data-bind="pane: \'/Mobile/list\', data: listData">&lt;/div><br/>    <br/>    &lt;button class="white" data-bind="click: overlay"><br/>        Overlay<br/>    &lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'samples.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    TC.toolbar.title(\'Title!\');<br/>    <br/>    TC.toolbar.options([<br/>        { text: \'Option 1\', func: function () { } },<br/>        { text: \'Option 2\', func: function () { } }<br/>    ]);<br/><br/>    this.listData = {<br/>        items: [<br/>            { id: 1, name: \'Item 1\' },<br/>            { id: 2, name: \'Item 2\' }<br/>        ],<br/>        itemText: function(item) {<br/>             return item.id + \' - \' + item.name;<br/>        },<br/>        headerText: \'Select List\',<br/>        itemClick: function(item) { }<br/>    };<br/><br/>    this.overlay = function() {<br/>        TC.overlay(\'overlay\');<br/>    };<br/><br/>    this.navigate = function() {<br/>        pane.navigate(\'navigate\');<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>ul.welcome li {<br/>    background: #103070;<br/>    color: white;<br/>    text-align: center;<br/>    text-shadow: 3px 3px 0 black, 5px 5px 5px rgba(0, 0, 0, 0.5);<br/>    font: bold 64pt \'Cambria\';<br/>}</pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;ul class="rounded welcome"><br/>    &lt;li>tribe&lt;/li><br/>&lt;/ul><br/>&lt;ul class="rounded"><br/>    &lt;li data-bind="click: samples">Samples&lt;/li><br/>&lt;/ul><br/>&lt;ul class="rounded"><br/>    &lt;li data-bind="click: chat">Chat&lt;/li><br/>&lt;/ul></pre>'
});
Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    TC.toolbar.defaults.back = true;<br/><br/>    this.samples = function() {<br/>        pane.navigate(\'samples\');<br/>    };<br/><br/>    this.chat = function () {<br/>        pane.navigate(\'chat\');<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>/* Some CSS to make our heading pretty */<br/>.helloWorld h1 {<br/>    text-shadow: 3px 3px 0 #AAA;<br/>}</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div class="helloWorld"><br/>    &lt;h1>Hello, World!&lt;/h1><br/><br/>    &lt;!-- Bind our message property --><br/>    &lt;span data-bind="text: message">&lt;/span><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    // Model properties are available for <br/>    // data binding in your template.<br/>    this.message = "Message passed: " + pane.data.message;<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Creating Panes&lt;/title><br/>        &lt;script src="jquery.js">&lt;/script><br/>        &lt;script src="knockout.js">&lt;/script><br/>        &lt;script src="Tribe.js">&lt;/script><br/>        <br/>        &lt;script type="text/javascript">$(TC.run)&lt;/script><br/>    &lt;/head><br/>    <br/>    &lt;!-- Create a pane and pass it some data --><br/>    &lt;body data-bind="pane: \'helloWorld\',<br/>                     data: { message: \'Test message.\' }"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;button data-bind="click: createPane">Create Pane&lt;/button><br/><br/>&lt;!-- New panes will be appended to this element --><br/>&lt;div class="items">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var i = 0;<br/>    <br/>    // Dynamically insert a pane into the element<br/>    // with its class set to "items".<br/>    this.createPane = function() {<br/>        TC.appendNode(\'.items\', { path: \'item\', data: ++i });<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Creating Panes Dynamically&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'create\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div><br/>    This is pane number <br/><br/>    &lt;!-- If our pane doesn\'t have a model, you can access <br/>         the pane property in data bindings --><br/>    &lt;span data-bind="text: pane.data">&lt;/span>.<br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Communicating&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>.panels > div {<br/>    margin-bottom: 5px;<br/>    border: 1px solid black;<br/>}</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div class="panels"><br/>    &lt;!-- Pass the shared observable to child panes --><br/><br/>    &lt;div data-bind="pane: \'sender\',<br/>                    data: observable">&lt;/div><br/><br/>    &lt;div data-bind="pane: \'receiver\',<br/>                    data: observable">&lt;/div><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    // Create an observable to share between child panes<br/>    this.observable = ko.observable(\'Test\');<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div><br/>    Observable: &lt;span data-bind="text: observable">&lt;/span><br/>&lt;/div><br/><br/>&lt;div><br/>    Messages:<br/>    &lt;ul data-bind="foreach: messages"><br/>        &lt;li data-bind="text: message">&lt;/li><br/>    &lt;/ul><br/>&lt;/div><br/></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    // Our shared observable<br/>    this.observable = pane.data;<br/>    <br/>    // Listen for messages and push them onto <br/>    // an array as they arrive<br/>    this.messages = ko.observableArray();<br/>    pane.pubsub.subscribe(\'sample.message\', function (data) {<br/>        self.messages.push(data);<br/>    });<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div><br/>    Observable: &lt;input data-bind="value: observable" /><br/>&lt;/div><br/><br/>&lt;div><br/>    Message: &lt;input data-bind="value: message"/><br/>    &lt;button data-bind="click: send">Send&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    // Our shared observable<br/>    this.observable = pane.data;<br/>    <br/>    // The pubsub object is available through the pane object.<br/>    this.message = ko.observable();<br/>    this.send = function() {<br/>        pane.pubsub.publish(\'sample.message\',<br/>            { message: self.message() });<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;button data-bind="click: createPane">Create Pane&lt;/button><br/>&lt;div class="items">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var i = 0;<br/>    <br/>    this.createPane = function() {<br/>        TC.appendNode(pane.find(\'.items\'),<br/>            { path: \'item\', data: ++i });<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Pane Lifecycle&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'create\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div><br/>    This is pane number &lt;span data-bind="text: data">&lt;/span>.<br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    this.data = pane.data;<br/><br/>    // The initialise function is called before the pane<br/>    // is rendered. If you return a jQuery deferred object,<br/>    // Tribe will wait for it to resolve before continuing.<br/>    <br/>    this.initialise = function() {<br/>        var promise = $.Deferred();<br/>        setTimeout(promise.resolve, 500);<br/>        return promise;<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div><br/>    This is the first pane in our navigation stack.<br/>&lt;/div><br/>&lt;button data-bind="click: next">Next&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    this.next = function() {<br/>        pane.navigate(\'second\');<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Navigating&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- The handlesNavigation binding marks the underlying node<br/>     as the node that should transition on navigation --><br/><br/>&lt;div data-bind="pane: \'first\', handlesNavigation: \'fade\'"><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div><br/>    This is the second pane in our navigation stack.<br/>&lt;/div><br/>&lt;button data-bind="click: back">Back&lt;/button><br/>&lt;button data-bind="click: next">Next&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    this.back = function () {<br/>        pane.navigateBack();<br/>    };<br/><br/>    this.next = function () {<br/>        pane.navigate(\'third\');<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div><br/>    And the last one!<br/>&lt;/div><br/>&lt;button data-bind="click: back">Back&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    this.back = function() {<br/>        pane.navigateBack();<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>/* Some CSS to make our folder list pretty */<br/><br/>.folders { <br/>    background-color: #bbb; <br/>    list-style-type: none; <br/>    padding: 0; <br/>    margin: 0; <br/>    border-radius: 7px; <br/>    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),<br/>                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); <br/>    margin: 10px 0 16px 0;<br/>    font-size: 0px;<br/>}<br/><br/>.folders li:hover {<br/>     background-color: #ddd;<br/>}    <br/><br/>.folders li:first-child {<br/>     border-left: none; <br/>     border-radius: 7px 0 0 7px;<br/>}<br/><br/>.folders li {<br/>     font-size: 16px; <br/>     font-weight: bold; <br/>     display: inline-block; <br/>     padding: 0.5em 1.5em; <br/>     cursor: pointer; <br/>     color: #444; <br/>     text-shadow: #f7f7f7 0 1px 1px; <br/>     border-left: 1px solid #ddd; <br/>     border-right: 1px solid #888;<br/>}<br/><br/>.folders li {<br/>     *display: inline !important;<br/>} /* IE7 only */<br/><br/>.folders .selected {<br/>     background-color: #444 !important; <br/>     color: white; <br/>     text-shadow: none; <br/>     border-right-color: #aaa; <br/>     border-left: none; <br/>     box-shadow: inset 1px 2px 6px #070707;<br/>}    <br/></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- A simple list of the folder names.<br/>     Apply the "selected" CSS class to the selected folder.<br/>     On click, set the selected folder --><br/><br/>&lt;ul class="folders" data-bind="foreach: folders"><br/>    &lt;li data-bind="text: $data,<br/>                   css: { selected: $data === $root.selectedFolder() },<br/>                   click: $root.selectedFolder">&lt;/li><br/>&lt;/ul></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>// Our model just contains a list of folders and<br/>// an observable to hold the selected folder.<br/><br/>TC.registerModel(function (pane) {<br/>    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];<br/>    this.selectedFolder = ko.observable(\'Inbox\');<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'folders\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>/* Some CSS to make our folder list pretty */<br/><br/>.folders { <br/>    background-color: #bbb; <br/>    list-style-type: none; <br/>    padding: 0; <br/>    margin: 0; <br/>    border-radius: 7px; <br/>    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),<br/>                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); <br/>    margin: 10px 0 16px 0;<br/>    font-size: 0px;<br/>}<br/><br/>.folders li:hover {<br/>     background-color: #ddd;<br/>}    <br/><br/>.folders li:first-child {<br/>     border-left: none; <br/>     border-radius: 7px 0 0 7px;<br/>}<br/><br/>.folders li {<br/>     font-size: 16px; <br/>     font-weight: bold; <br/>     display: inline-block; <br/>     padding: 0.5em 1.5em; <br/>     cursor: pointer; <br/>     color: #444; <br/>     text-shadow: #f7f7f7 0 1px 1px; <br/>     border-left: 1px solid #ddd; <br/>     border-right: 1px solid #888;<br/>}<br/><br/>.folders li {<br/>     *display: inline !important;<br/>} /* IE7 only */<br/><br/>.folders .selected {<br/>     background-color: #444 !important; <br/>     color: white; <br/>     text-shadow: none; <br/>     border-right-color: #aaa; <br/>     border-left: none; <br/>     box-shadow: inset 1px 2px 6px #070707;<br/>}    <br/></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- The click binding is now to the selectFolder function --><br/><br/>&lt;ul class="folders" data-bind="foreach: folders"><br/>    &lt;li data-bind="text: $data,<br/>                   css: { selected: $data === $root.selectedFolder() },<br/>                   click: $root.selectFolder">&lt;/li><br/>&lt;/ul></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];<br/>    this.selectedFolder = ko.observable(pane.data.folder);<br/><br/>    // We\'ve added a separate click handler to navigate<br/>    // when a folder is selected.<br/>    this.selectFolder = function (folder) {<br/>        self.selectedFolder(folder);<br/>        pane.navigate(\'mails\', { folder: folder });<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- The handlesNavigation binding tells Tribe to use that node for navigation. --><br/><br/>&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div><br/>&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>.mails {<br/>    width: 100%;<br/>    table-layout: fixed;<br/>    border-spacing: 0;<br/>}<br/><br/>.mails th {<br/>    background-color: #bbb;<br/>    font-weight: bold;<br/>    color: #444;<br/>    text-shadow: #f7f7f7 0 1px 1px;<br/>}<br/><br/>.mails tbody tr:hover {<br/>    cursor: pointer;<br/>    background-color: #68c !important;<br/>    color: White;<br/>}<br/><br/>.mails th, .mails td {<br/>    text-align: left;<br/>    padding: 0.4em 0.3em;<br/>    white-space: nowrap;<br/>    overflow: hidden;<br/>    text-overflow: ellipsis;<br/>}<br/><br/>.mails td {<br/>    border: 0;<br/>}<br/><br/>.mails th {<br/>    border: 0;<br/>    border-left: 1px solid #ddd;<br/>    border-right: 1px solid #888;<br/>    padding: 0.4em 0 0.3em 0.7em;<br/>}<br/><br/>.mails th:nth-child(1), .mails td:nth-child(1) {<br/>    width: 20%;<br/>}<br/><br/>.mails th:nth-child(2), .mails td:nth-child(2) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:nth-child(3), .mails td:nth-child(3) {<br/>    width: 45%;<br/>}<br/><br/>.mails th:nth-child(4), .mails td:nth-child(4) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:last-child {<br/>    border-right: none;<br/>}<br/><br/>.mails tr:nth-child(even) {<br/>    background-color: #EEE;<br/>}<br/></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;table class="mails" data-bind="with: data"><br/>    &lt;thead><br/>        &lt;tr><br/>            &lt;th>From&lt;/th><br/>            &lt;th>To&lt;/th><br/>            &lt;th>Subject&lt;/th><br/>            &lt;th>Date&lt;/th><br/>        &lt;/tr><br/>    &lt;/thead><br/><br/>    &lt;tbody data-bind="foreach: mails"><br/>        &lt;tr><br/>            &lt;td data-bind="text: from">&lt;/td><br/>            &lt;td data-bind="text: to">&lt;/td><br/>            &lt;td data-bind="text: subject">&lt;/td><br/>            &lt;td data-bind="text: date">&lt;/td><br/>        &lt;/tr>     <br/>    &lt;/tbody><br/>&lt;/table></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = ko.observable();<br/><br/>    // Load data using AJAX to our data property    <br/>    this.initialise = function() {<br/>        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>/* Some CSS to make our folder list pretty */<br/><br/>.folders { <br/>    background-color: #bbb; <br/>    list-style-type: none; <br/>    padding: 0; <br/>    margin: 0; <br/>    border-radius: 7px; <br/>    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),<br/>                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); <br/>    margin: 10px 0 16px 0;<br/>    font-size: 0px;<br/>}<br/><br/>.folders li:hover {<br/>     background-color: #ddd;<br/>}    <br/><br/>.folders li:first-child {<br/>     border-left: none; <br/>     border-radius: 7px 0 0 7px;<br/>}<br/><br/>.folders li {<br/>     font-size: 16px; <br/>     font-weight: bold; <br/>     display: inline-block; <br/>     padding: 0.5em 1.5em; <br/>     cursor: pointer; <br/>     color: #444; <br/>     text-shadow: #f7f7f7 0 1px 1px; <br/>     border-left: 1px solid #ddd; <br/>     border-right: 1px solid #888;<br/>}<br/><br/>.folders li {<br/>     *display: inline !important;<br/>} /* IE7 only */<br/><br/>.folders .selected {<br/>     background-color: #444 !important; <br/>     color: white; <br/>     text-shadow: none; <br/>     border-right-color: #aaa; <br/>     border-left: none; <br/>     box-shadow: inset 1px 2px 6px #070707;<br/>}    <br/></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;ul class="folders" data-bind="foreach: folders"><br/>    &lt;li data-bind="text: $data,<br/>                   css: { selected: $data === $root.selectedFolder() },<br/>                   click: $root.selectFolder">&lt;/li><br/>&lt;/ul></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];<br/>    this.selectedFolder = ko.observable(pane.data.folder);<br/><br/>    this.selectFolder = function (folder) {<br/>        self.selectedFolder(folder);<br/>        pane.navigate(\'mails\', { folder: folder });<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint"><br/>&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div><br/>&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>.mails {<br/>    width: 100%;<br/>    table-layout: fixed;<br/>    border-spacing: 0;<br/>}<br/><br/>.mails th {<br/>    background-color: #bbb;<br/>    font-weight: bold;<br/>    color: #444;<br/>    text-shadow: #f7f7f7 0 1px 1px;<br/>}<br/><br/>.mails tbody tr:hover {<br/>    cursor: pointer;<br/>    background-color: #68c !important;<br/>    color: White;<br/>}<br/><br/>.mails th, .mails td {<br/>    text-align: left;<br/>    padding: 0.4em 0.3em;<br/>    white-space: nowrap;<br/>    overflow: hidden;<br/>    text-overflow: ellipsis;<br/>}<br/><br/>.mails td {<br/>    border: 0;<br/>}<br/><br/>.mails th {<br/>    border: 0;<br/>    border-left: 1px solid #ddd;<br/>    border-right: 1px solid #888;<br/>    padding: 0.4em 0 0.3em 0.7em;<br/>}<br/><br/>.mails th:nth-child(1), .mails td:nth-child(1) {<br/>    width: 20%;<br/>}<br/><br/>.mails th:nth-child(2), .mails td:nth-child(2) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:nth-child(3), .mails td:nth-child(3) {<br/>    width: 45%;<br/>}<br/><br/>.mails th:nth-child(4), .mails td:nth-child(4) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:last-child {<br/>    border-right: none;<br/>}<br/><br/>.mails tr:nth-child(even) {<br/>    background-color: #EEE;<br/>}<br/></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;table class="mails" data-bind="with: data"><br/>    &lt;thead><br/>        &lt;tr><br/>            &lt;th>From&lt;/th><br/>            &lt;th>To&lt;/th><br/>            &lt;th>Subject&lt;/th><br/>            &lt;th>Date&lt;/th><br/>        &lt;/tr><br/>    &lt;/thead><br/><br/>    &lt;tbody data-bind="foreach: mails"><br/>        &lt;tr data-bind="click: $root.selectMail"><br/>            &lt;td data-bind="text: from">&lt;/td><br/>            &lt;td data-bind="text: to">&lt;/td><br/>            &lt;td data-bind="text: subject">&lt;/td><br/>            &lt;td data-bind="text: date">&lt;/td><br/>        &lt;/tr>     <br/>    &lt;/tbody><br/>&lt;/table></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = ko.observable();<br/><br/>    this.initialise = function () {<br/>        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);<br/>    };<br/>    <br/>    this.selectMail = function (mail) {<br/>        pane.navigate(\'viewMail\', mail);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint"><br/>.viewMail .mailInfo {<br/>    background-color: #dae0e8; <br/>    padding: 1em 1em 0.5em 1.25em; <br/>    border-radius: 1em;<br/>}<br/><br/>.viewMail .mailInfo h1 {<br/>    margin-top: 0.2em; <br/>    font-size: 130%;<br/>}<br/><br/>.viewMail .mailInfo label {<br/>    color: #777; <br/>    font-weight: bold; <br/>    min-width: 2.75em; <br/>    text-align:right; <br/>    display: inline-block;<br/>}<br/><br/>.viewMail .message {<br/>    padding: 0 1.25em;<br/>}</pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;div class="viewMail" data-bind="with: data"><br/>    &lt;div class="mailInfo"><br/>        &lt;h1 data-bind="text: subject">&lt;/h1><br/>        &lt;p>&lt;label>From&lt;/label>: &lt;span data-bind="text: from">&lt;/span>&lt;/p><br/>        &lt;p>&lt;label>To&lt;/label>: &lt;span data-bind="text: to">&lt;/span>&lt;/p><br/>        &lt;p>&lt;label>Date&lt;/label>: &lt;span data-bind="text: date">&lt;/span>&lt;/p><br/>        &lt;div class="message"><br/>            &lt;p data-bind="html: messageContent" />            <br/>        &lt;/div><br/>    &lt;/div><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    this.data = ko.observable();<br/><br/>    this.initialise = function () {<br/>        $.getJSON(\'Data/mail/\' + pane.data.id, self.data);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function () {<br/>        // Dump the details object on screen for our viewer\'s pleasure.<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- Tribe.Forms gives us a way of building simple forms <br/>     without needing a JavaScript model --><br/>&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;!-- Tribe.Forms gives us a way of building simple forms <br/>     without needing a JavaScript model --><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>PersonalFlow = function (flow) {<br/>    var details = { type: \'personal\' };         // An object to hold application details<br/>    <br/>    this.handles = {                            <br/>        onstart: flow.to(\'personal\'),<br/>        \'setAccount\': function(account) {       // As events occur, build up our details<br/>            details.account = account;          // object and flow through the process<br/>            flow.navigate(\'contact\');<br/>        },<br/>        \'setContact\': function(contact) {<br/>            details.contact = contact;<br/>            flow.navigate(\'confirm\', details);  // Our flow ends after navigating to the<br/>            flow.end();                         // confirmation pane.<br/>        }<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click \'Start\' to begin.&lt;/p><br/><br/>&lt;button data-bind="click: start">Start&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    this.start = function () {<br/>        // panes expose a simple function for starting flows<br/>        pane.startFlow(PersonalFlow);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit (per card)\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 5">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter your business details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Business name\', <br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'abn\',<br/>                    displayText: \'ABN\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'BusinessFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>BusinessFlow2 = function (flow) {<br/>    var details = { type: \'business\' };<br/>    <br/>    this.handles = {<br/>        onstart: flow.to(\'businessDetails\'),<br/>        \'setBusiness\': function(business) {<br/>            details.business = business;<br/>            flow.navigate(\'businessAccount\');<br/>        },<br/>        \'setAccount\': function(account) {<br/>            details.account = account;<br/>            flow.navigate(\'contact\');<br/>        },<br/>        \'setContact\': function(contact) {<br/>            details.contact = contact;<br/>            flow.navigate(\'confirm\', details);<br/>            flow.end();<br/>        }<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function() {<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>PersonalFlow2 = function (flow) {<br/>    var details = { type: \'personal\' };<br/>    <br/>    this.handles = {<br/>        onstart: flow.to(\'personal\'),<br/>        \'setAccount\': function(account) {<br/>            details.account = account;<br/>            flow.navigate(\'contact\');<br/>        },<br/>        \'setContact\': function(contact) {<br/>            details.contact = contact;<br/>            flow.navigate(\'confirm\', details);<br/>            flow.end();<br/>        }<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click the required account type to begin.&lt;/p><br/><br/>&lt;button data-bind="click: personal">Personal&lt;/button><br/>&lt;button data-bind="click: business">Business&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    this.personal = function() {<br/>        pane.startFlow(PersonalFlow2);<br/>    };<br/><br/>    this.business = function () {<br/>        pane.startFlow(BusinessFlow2);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit (per card)\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 5">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter your business details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Business name\', <br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'abn\',<br/>                    displayText: \'ABN\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'BusinessFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>BusinessFlow3 = function (flow) {<br/>    var details = { type: \'business\' };<br/>    flow.startSaga(CreditCard, details);<br/><br/>    this.handles = {<br/>        onstart: flow.to(\'businessDetails\'),<br/>        \'setBusiness\': flow.to(\'businessAccount\'),<br/>        \'setAccount\': flow.to(\'contact\'),<br/>        \'setContact\': flow.endsAt(\'confirm\', details)<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div><br/></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function() {<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'CreditCard.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>CreditCard = function (saga, details) {<br/>    this.handles = {<br/>        \'setAccount\': function (account) {<br/>            details.account = account;<br/>        },<br/>        \'setBusiness\': function (business) {<br/>            details.business = business;<br/>        },<br/>        \'setContact\': function (contact) {<br/>            details.contact = contact;<br/>        }<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>PersonalFlow3 = function (flow) {<br/>    var details = { type: \'personal\' };<br/>    flow.startSaga(CreditCard, details);<br/><br/>    this.handles = {<br/>        onstart: flow.to(\'personal\'),<br/>        \'setAccount\': flow.to(\'contact\'),<br/>        \'setContact\': flow.endsAt(\'confirm\', details)<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click the required account type to begin.&lt;/p><br/><br/>&lt;button data-bind="click: personal">Personal&lt;/button><br/>&lt;button data-bind="click: business">Business&lt;/button></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    this.personal = function() {<br/>        pane.startFlow(PersonalFlow3);<br/>    };<br/><br/>    this.business = function () {<br/>        pane.startFlow(BusinessFlow3);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit (per card)\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 5">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter your business details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Business name\', <br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'abn\',<br/>                    displayText: \'ABN\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="click: restart">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div><br/></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function() {<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/><br/>    this.restart = function() {<br/>        pane.startFlow(CreditCardFlow);<br/>    };<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'CreditCard.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>CreditCard = function (saga, details) {<br/>    this.handles = {<br/>        \'startBusiness\': function() {<br/>            details.type = \'business\';<br/>        },<br/>        \'startPersonal\': function() {<br/>            details.type = \'personal\';<br/>        },<br/>        \'setAccount\': function (account) {<br/>            details.account = account;<br/>        },<br/>        \'setBusiness\': function (business) {<br/>            details.business = business;<br/>        },<br/>        \'setContact\': function (contact) {<br/>            details.contact = contact;<br/>        }<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'CreditCardFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>CreditCardFlow = function (flow) {<br/>    var details = { };<br/>    flow.startSaga(CreditCard, details);<br/><br/>    this.handles = {<br/>        onstart: flow.to(\'welcome\'),<br/>        \'startBusiness\': {<br/>            onstart: flow.to(\'businessDetails\'),<br/>            \'setBusiness\': flow.to(\'businessAccount\'),<br/>            \'setAccount\': flow.to(\'contact\')<br/>        },<br/>        \'startPersonal\': {<br/>            onstart: flow.to(\'personal\'),<br/>            \'setAccount\': flow.to(\'contact\')<br/>        },<br/>        \'setContact\': flow.endsAt(\'confirm\', details)<br/>    };<br/>};</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'host.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint"><br/>TC.registerModel(function(pane) {<br/>    pane.startFlow(CreditCardFlow);<br/>});</pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});
Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint"><br/>&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click the required account type to begin.&lt;/p><br/><br/>&lt;button data-bind="publish: \'startPersonal\'">Personal&lt;/button><br/>&lt;button data-bind="publish: \'startBusiness\'">Business&lt;/button><br/></pre>'
});


// Infrastructure/syntaxHighlightEvent.js

TC.Events.syntaxHighlight = function(pane) {
    pane.find();
};


// Panes/Content/Guides/Tutorials/CreditCard/tutorial.js


TC.scriptEnvironment = { resourcePath: '/Content/Guides/Tutorials/CreditCard/tutorial' };

Tutorials.creditCard = {
    frames: [
        'CreditCard/intro',
        'CreditCard/personal',
        'CreditCard/business',
        'CreditCard/saga',
        'CreditCard/combined'
    ]
}



// Panes/Content/Guides/Tutorials/Webmail/tutorial.js


TC.scriptEnvironment = { resourcePath: '/Content/Guides/Tutorials/Webmail/tutorial' };

Tutorials.webmail = {
    frames: [
        'Webmail/folders',
        'Webmail/mails',
        'Webmail/content'
    ]
}



// Panes/Content/Reference/Core/api.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Core/api' };

Reference.API = [
    {
        name: 'TC.run',
        description: 'Start Tribe.Composite, ensuring the specified resources are loaded first.',
        arguments: [
            { name: 'resourcesToPreload', type: '[String]', description: 'URLs to required HTML, CSS or JS resources.' },
            { name: 'initialModel', type: 'Any', description: 'The model supplied to the initial ko.applyBindings call.' }
        ],
        returns: 'undefined'
    },
    {
        name: 'TC.createNode',
        description: 'Creates a new Pane object and binds it to the specified element with the specified pane options, and encapsulates it in a Node object.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.appendNode',
        description: 'Same as createNode, but appends a new DIV element to the target element.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.insertNodeAfter',
        description: 'Same as createNode, but inserts a new DIV element after the target element.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' },
            { name: 'paneOptions', type: 'Object' },
            { name: 'parentNode', type: 'TC.Types.Node' },
            { name: 'context', type: 'TC.Types.Context' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.nodeFor',
        description: 'Find the Node object for the specified selector, Node or Pane.',
        arguments: [
            { name: 'element', type: 'selector | TC.Types.Node | TC.Types.Pane' }
        ],
        returns: 'TC.Types.Node'
    },
    {
        name: 'TC.registerModel',
        description: 'Registers a model in the repository. Either the TC.scriptEnvironment must be set first or a resourcePath must be specified.',
        arguments: [
            { name: 'modelConstructor', type: 'Function' },
            { name: 'options', type: 'Object' },
            { name: 'resourcePath', type: 'String' }
        ],
        returns: 'undefined'
    }
];



// Panes/Content/Reference/Core/bindingHandlers.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Core/bindingHandlers' };

Reference.BindingHandlers = [
    {
        name: 'publish',
        description: 'Publishes the specified message and data when the bound element is clicked.',
        bindings: [
            { Binding: 'publish', Type: 'String', Description: 'The message topic to publish.' },
            { Binding: 'data', Type: 'Any', Description: 'The data to publish.' }
        ],
        example: '<button data-bind="publish: \'messageTopic\', data: model.property">Click Me</button>'
    },
    {
        name: 'navigate',
        description: 'Navigates to the specified pane with the specified data when the bound element is clicked.',
        bindings: [
            { Binding: 'navigate', Type: 'String | Object', Description: 'The pane path or options to navigate to.' },
            { Binding: 'data', Type: 'Any', Description: 'The data to pass the target pane.' },
        ],
        example: '<button data-bind="navigate: \'/target/pane\', data: model.property">Click Me</button>'
    }
];



// Panes/Content/Reference/Core/panes.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Core/panes' };

Reference.Panes = {
    options: [
        { name: 'pane', type: 'String', description: 'Required. Relative paths will evaluate relative to the parent pane.' },
        { name: 'data', type: 'Any', description: 'Data to pass to the pane.' },
        { name: 'handlesNavigation', type: 'String | NavigationOptions', description: 'The underlying node is marked as the node to transition when child panes navigate.' },
        { name: 'transition', type: 'String', description: 'Transition to use when the pane is transitioned in or out.' },
        { name: 'reverseTransitionIn', type: 'Boolean', description: 'Use the reverse transition when transitioning in.' },
        { name: 'id', type: 'Any', description: 'An optional unique identifier for the pane.' },
        { name: 'skipPath', type: 'Boolean', description: 'When specified, the pane is skipped when determining the parent pane path.' }
    ],
    NavigationOptions: [
        { name: 'transition', type: 'String', description: 'The name of the transition to use.' },
        { name: 'browser', type: 'Boolean | UrlProvider', description: 'Attaches navigation to the browser\'s history using the default URL provider or the one specified.' }
    ]
};



// Panes/Content/Reference/Core/transitions.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Core/transitions' };

Reference.Transition = {
    name: 'TC.transition',
    description: 'Create an object with a set of functions for transition elements and nodes.',
    arguments: [
        { name: 'target', type: 'selector | TC.Types.Pane | TC.Types.Node', description: 'The target of the transition.' },
        { name: 'transition', type: 'String', description: 'The name of the transition registered in the TC.Transitions collection. If not specified, this will default to transition specified on the pane or node.<br/>Built-in transitions are fade, slideLeft, slideRight, slideUp and slideDown.' },
        { name: 'reverse', type: 'Boolean', description: 'Use the reverse transition to the one specified.' }
    ],
    returns: 'Object'
};

Reference.Transition.Functions = [
    {
        name: 'in',
        description: 'Transition the target into view. Returned promise resolves when transition is complete.',
        returns: 'jQuery.Deferred'
    },
    {
        name: 'out',
        description: 'Transition the target out of view. By default, the target is removed from the DOM after transitioning. Returned promise resolves when transition is complete.',
        arguments: [
            { name: 'remove', type: 'Boolean', description: 'Specify false to hide the target instead.' }
        ],
        returns: 'jQuery.Deferred'
    },
    {
        name: 'to',
        description: 'Transition the target to another pane. If the target is an element, a new node is created. Returned promise resolves when the render operation for the new pane is complete.',
        arguments: [
            { name: 'paneOptions', type: 'String | Object', description: 'The path to the new pane or an object containing path and data properties.' },
            { name: 'remove', type: 'Boolean', description: 'Specify false to hide the original target instead of removing.' }
        ],
        returns: 'jQuery.Deferred'
    }
];



// Panes/Content/Reference/MessageHub/client.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/MessageHub/client' };

Reference.MessageHub = [
    {
        name: 'TMH.initialise',
        description: 'Initialise the MessageHub client.',
        returns: 'undefined',
        arguments: [
            { name: 'pubsub', type: 'Tribe.PubSub', description: 'The PubSub object to attach to.' },
            { name: 'url', type: 'String', description: 'The URL of the SignalR instance. Usually "signalr".' }
        ]
    },
    {
        name: 'TMH.joinChannel',
        description: 'Join the specified channel.',
        returns: '{ leave: function () { } }',
        arguments: [
            { name: 'id', type: 'String', description: 'The channel identifier.' },
            { name: 'options', type: 'Object', description: 'A hashtable of options, described below.' }
        ]
    },
    {
        name: 'TMH.leaveChannel',
        description: 'Leave the specified channel.',
        returns: 'undefined',
        arguments: [
            { name: 'id', type: 'String', description: 'The channel identifier.' }
        ]
    },
    {
        name: 'TMH.publishToServer',
        description: 'Publish a message to the server. This is called internally when a message topic specified in joinChannel is published.',
        returns: 'undefined',
        arguments: [
            { name: 'channelId', type: 'String', description: 'The channel identifier.' },
            { name: 'envelope', type: 'Object', description: 'The PubSub message envelope. See the PubSub reference for more information.' },
            { name: 'record', type: 'Boolean', description: 'Request the server to record the message.' }
        ]
    }
];

Reference.MessageHub.ChannelOptions = [
    { name: 'serverEvents', type: '[String]', description: 'An array of message topics to publish to the server. Wildcards can be used.' },
    { name: 'record', type: 'Boolean', description: 'Request the server to record messages published to this channel.' },
    { name: 'replay', type: 'Boolean', description: 'Request the server to replay messages previously published to this channel.' }
];



// Panes/Content/Reference/MessageHub/configuration.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/MessageHub/configuration' };

Reference.MessageHub.Server = [
    {
        name: 'TopicResolver',
        description: 'Specify a function to resolve message types to a topic names.',
        arguments: [
            { name: 'resolver', type: 'Func<Type, string>', description: 'A function that resolves a message type to a topic name.' }
        ]
    },
    {
        name: 'TopicResolver<T>',
        description: 'Specify a type to resolve message types to a topic names. The default uses the type name as the client message topic.',
        arguments: [
            { name: '', type: 'IMessageTopicResolver', description: 'A type that implements IMessageTopicResolver.' }
        ]
    },
    {
        name: 'MessageSerialiser<T>',
        description: 'Specify a type to serialise messages. The default is JsonMessageSerialiser.',
        arguments: [
            { name: '', type: 'IMessageSerialiser', description: 'A type that implements IMessageSerialiser.' }
        ]
    },
    {
        name: 'MessageBus<T>',
        description: 'Specify a type that handles translation of client and server side messages.',
        arguments: [
            { name: '', type: 'IMessageBus', description: 'A type that implements IMessageBus.' }
        ]
    },
    {
        name: 'MessagesFrom',
        description: 'Use incoming and outgoing message types from the specified assemblies.',
        arguments: [
            { name: 'assemblies', type: 'params Assembly[]', description: 'A parameter array of assemblies.' }
        ]
    },
    {
        name: 'HostStarter<T>',
        description: 'Specify a type that can initialise and start the MessageHub host. The default is the IisHostStarter.',
        arguments: [
            { name: '', type: 'IHostStarter', description: 'A type that implements IHostStarter.' }
        ]
    },
    {
        name: 'ChannelAuthoriser<T>',
        description: 'Specify a type that can authorise channel requests.',
        arguments: [
            { name: '', type: 'IChannelAuthoriser', description: 'A type that implements IChannelAuthoriser.' }
        ]
    },
    {
        name: 'SqlServerPersistence',
        description: 'Store recorded messages in a SQL Server database. Requires a reference to the Tribe.MessageHub.ChannelPersisters.SqlServer assembly.',
        arguments: [
            { name: 'connectionStringOrName', type: 'String', description: 'A literal connection string or the name of a connection string defined in the configuration file.' }
        ]
    },
    {
        name: 'NServiceBus',
        description: 'Use NServiceBus as the server side messaging infrastructure. Requires a reference to the Tribe.MessageHub.Buses.NServiceBus assembly.',
        arguments: [
            { name: 'bus', type: 'NServiceBus.IBus', description: 'A configured instance of the NServiceBus IBus interface.' }
        ]
    },
];



// Panes/Content/Reference/PackScript/packscript.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/PackScript/packscript' };

Reference.PackScript = {
    options: [
        { Name: 'watch', Type: 'Boolean', Description: 'Makes PackScript stay active and watch for file changes.', Default: 'false' },
        { Name: 'logLevel', Type: 'String', Description: 'Logging verbosity. Can be debug, info, warn or error.', Default: 'debug' },
        { Name: 'packFileFilter', Type: 'String', Description: 'A filespec pattern to match pack files.', Default: '*pack.js' },
        { Name: 'configurationFileFilter', Type: 'String', Description: 'A filespec pattern to match configuration files.', Default: '*pack.config.js' },
        { Name: 'templateFileExtension', Type: 'String', Description: 'The file extension for template files.', Default: '.template.*' },
        { Name: 'resourcePath', Type: 'String', Description: 'An additional path to scan for templates and configuration files.', Default: 'undefined' },
        { Name: 'excludedDirectories', Type: 'String', Description: 'A semi-colon delimited list of folder names to exclude.', Default: 'csx;bin;obj' },
        { Name: 'rubyPath', Type: 'String', Description: 'The path to ruby.exe. Required for SASS integration.', Default: 'undefined' }
    ],
    pack: [
        { name: 'to', type: 'String', description: 'Destination path and filename for the output file.' },
        { name: 'include', type: 'include options', description: 'The set of files to include in the output. See "Including Files" for more details.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'template', type: 'template options', description: 'A template or array of templates to apply to each included file. See "Templates" reference for more details.' },
        { name: 'outputTemplate', type: 'template options', description: 'A template or array of templates to apply to the output.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'prioritise', type: 'String | Array', description: 'Specified file(s) will be included at the top of the output file.' },
        { name: 'first', type: 'String | Array', description: 'Alias for prioritise.' },
        { name: 'last', type: 'String | Array', description: 'Specified file(s) will be included at the bottom of the output file.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' },
        { name: 'json', type: 'Any', description: 'Stringifies the provided object as the output. Overrides the output of any included files.' },
        { name: 'minify', type: 'Boolean', description: 'Minify resources using the configured minifier.' },        
        { name: 'sass', type: 'Boolean', description: 'Compile included SASS resources using the configured compiler.' },
        { name: 'xdt', type: 'String | Array', description: 'Apply specified XDT transformations to included files.' }
    ],
    sync: [
        { name: 'to', type: 'String', description: 'Destination path to synchronise files to.' },
        { name: 'include', type: 'include options', description: 'The set of files to synchronise.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' }
    ],
    zip: [
        { name: 'to', type: 'String', description: 'Destination path and filename for the output ZIP file.' },
        { name: 'include', type: 'include options', description: 'The set of files to include in the ZIP file.' },
        { name: 'exclude', type: 'include options', description: 'A set of files to explicitly exclude.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'includeConfigs', type: 'Boolean', description: 'PackScript configuration files are excluded by default. Overrides this behaviour.' }
    ],
    includeOptions: [
        { name: 'files', type: 'String', description: 'File specification of files to include.' },
        { name: 'recursive', type: 'Boolean', description: 'Recurse through directories by default when including files.' },
        { name: 'prioritise', type: 'String | Array', description: 'Specified file(s) will be included at the top of the output file.' },
        { name: 'first', type: 'String | Array', description: 'Alias for prioritise.' },
        { name: 'last', type: 'String | Array', description: 'Specified file(s) will be included at the bottom of the output file.' },
        { name: 'template', type: 'template options', description: 'A template or array of templates to apply to each included file. See templates reference for more details.' }
    ],
    functions: [
        { name: 'pack', description: 'Combine, minify, embed and transform into a single output file.' },
        { name: 'sync', description: 'Synchronise a set of files to a target directory.' },
        { name: 'zip', description: 'Compress a set of files into a single ZIP format archive.' }
    ],
    templateProperties: [
        { name: 'content', type: 'String', description: 'The content of the included file.' },
        { name: 'path', type: 'String', description: 'The full path to the included file.' },
        { name: 'configPath', type: 'String', description: 'The full path to the configuration file that is using the template.' },
        { name: 'pathRelativeToConfig', type: 'String', description: 'The path of the included file relative to the configuration file.' },
        { name: 'includePath', type: 'String', description: 'The full path to the path specified in the include option.' },
        { name: 'pathRelativeToInclude', type: 'String', description: 'The path of the included file relative to the path specified in the include option.' },
        { name: 'data', type: 'Any', description: 'The data object passed in the configuration file, or an empty object if not specified.' },
        { name: 'output', type: 'Output', description: 'The output configuration.' },
        { name: 'target', type: 'Container', description: 'The current output target.' }
    ],
    Builtin: {
        functions: [
            {
                Name: 'T.panes',
                Description: 'Package models, templates and styles for panes from the specified path.'
            },
            {
                Name: 'T.scripts',
                Description: 'Package JavaScript files with an extension of \'js\' from the specified path.'
            },
            {
                Name: 'T.templates',
                Description: 'Package HTML templates with an extension of \'htm\' from the specified path.'
            },
            {
                Name: 'T.styles',
                Description: 'Package CSS styles files with an extension of \'css\' from the specified path.'
            },
            {
                Name: 'T.models',
                Description: 'Package pane models from the specified path.'
            }
        ],
        arguments: [
            { Name: 'pathOrOptions', Type: 'String | Object', Description: 'Either the path containing relevant files or an object containing options.' },
            { Name: 'debug', Type: 'Boolean', Description: 'Use debug templates to enhance the debugging experience. You can also specify this using debug: true in your output configuration.' }
        ],
        options: [
            { name: 'path', type: 'String', description: 'Can either be a directory name or filespec containing the appropriate extension.' },
            { name: 'debug', type: 'Boolean', description: 'Use debug templates to enhance the debugging experience.' },
            { name: 'prefix', type: 'String', description: 'Prefix the resource path applied to models and templates.' },
            { name: 'domain', type: 'String', description: 'Specifies the domain to apply to each script in the debugger.' },
            { name: 'protocol', type: 'String', description: 'Specifies the protocol to apply to each script in the debugger.' },
            { name: 'recursive', type: 'Boolean', description: 'Set to false to override the default behaviour.' }
        ],
        helpers: [
            { Name: 'T.webTargets', Returns: 'target options', Description: 'Pass to the \'to\' function. Creates .js, .min.js and .debug.js outputs.' },
            { Name: 'T.webDependency', Returns: 'include options', Description: 'Returns an include with the appropriate extension, .js, .min.js or .debug.js.' }
        ]
    }
};



// Panes/Content/Reference/PubSub/core.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/PubSub/core' };

Reference.PubSub = {
    name: 'Tribe.PubSub',
    description: 'A fully featured publish / subscribe engine.',
    constructor: {
        arguments: [
            { name: 'options', type: 'Object', description: 'A hashtable of options. These are the same as and override those specified in global options.' }
        ]
    },
    functions: [
        {
            name: 'publish',
            description: 'Publish the specified message to the bus.',
            arguments: [
                { name: 'topicOrEnvelope', type: 'String | Object', description: 'A string message topic or a message envelope object.' },
                { name: 'data', type: 'Any', description: 'Data to attach to the message envelope.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'publishSync',
            description: 'Publish the specified message to the bus synchronously.',
            arguments: [
                { name: 'topic', type: 'String', description: 'The message topic.' },
                { name: 'data', type: 'Any', description: 'Data to attach to the message envelope.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'subscribe',
            description: 'Subscribe to one or more message topics. Returns numeric token(s) that can be used to unsubscribe message handlers.',
            arguments: [
                { name: 'topic', type: 'String | [String] | Object', description: 'A single message topic, array of topics or object map of topic names to handler functions.' },
                { name: 'func', type: 'Function(data, envelope)', description: 'The message handler function.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'subscribeOnce',
            description: 'Subscribe to one or more message topics with a handler that is executed once only.',
            arguments: [
                { name: 'topic', type: 'String | [String] | Object', description: 'A single message topic, array of topics or object map of topic names to handler functions.' },
                { name: 'handler', type: 'Function(data, envelope)', description: 'The message handler function.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'unsubscribe',
            description: 'Unsubscribe one or more message handlers.',
            arguments: [
                { name: 'tokens', type: 'Number | [Number]', description: 'A single subscription token or array of tokens to unsubscribe. Returns the token(s) that were successfully unsubscribed.' }
            ],
            returns: 'Number | [Number]'
        },
        {
            name: 'createLifetime',
            description: 'Create a child PubSub object where all subscriptions can be removed by calling .end().',
            returns: 'Object'
        },
        {
            name: 'startSaga',
            description: 'Start a saga with the specified definition.',
            arguments: [
                { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'TC.Types.Saga'
        }

    ],
    properties: [
        {
            name: 'owner',
            description: 'The root PubSub object. Child lifetimes will refer back to the owning PubSub object.',
            type: 'Tribe.PubSub'
        },
        {
            name: 'sync',
            description: 'True if the PubSub object is operating synchronously.',
            type: 'Boolean'
        },
        {
            name: 'subscribers',
            description: 'A managed collection of message subscribers. Use get(\'*\') to retrieve all subscribers.',
            type: 'Tribe.PubSub.SubscriberList'
        }
    ]
};



// Panes/Content/Reference/PubSub/envelopes.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/PubSub/envelopes' };

Reference.PubSub.Envelopes = [
    { name: 'topic', type: 'String', description: 'The message topic.' },
    { name: 'data', type: 'Any', description: 'The message data.' },
    { name: 'sync', type: 'Boolean', description: 'Publish the message synchronously.' },
    { name: 'server', type: 'Boolean', description: 'True if the message originated from a Tribe.MessageHub host.' }
];



// Panes/Content/Reference/PubSub/Saga.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/PubSub/Saga' };

Reference.PubSub.Saga = {
    name: 'Tribe.PubSub.Saga',
    description: 'Manages a long running process by maintaining state and handling specific messages.',
    constructor: {
        arguments: [
            { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
            { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
        ]
    },
    functions: [
        {
            name: 'start',
            description: 'Subscribes provided message handlers to messages published on the pane\'s pubsub engine.',
            arguments: [
                { name: 'data', type: 'Constructor', description: 'Data that is passed to the onstart handler.' }
            ],
            returns: 'Tribe.PubSub.Saga'
        },
        {
            name: 'startChild',
            description: 'Starts a new saga. The lifetime of the new saga is bound to the current saga.',
            arguments: [
                { name: 'child', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'Tribe.PubSub.Saga'
        },
        {
            name: 'end',
            description: 'Unsubscribes message handlers for this and all child sagas.',
            arguments: [
                { name: 'data', type: 'Any', description: 'Data that is passed to the onend handler.' }
            ],
            returns: 'Tribe.PubSub.Saga'
        }
    ],
    properties: [
        { name: 'pubsub', type: 'Tribe.PubSub', description: 'The PubSub instance used for subscriptions.' },
        { name: 'children', type: '[TC.Types.Saga]', description: 'An array of sagas added through handler definitions or startChild.' }
    ],
    Definition: {
        arguments: [
            { Argument: 'saga', Type: 'TC.Types.Flow', Description: 'The Saga object that is consuming the definition.' },
            { Argument: 'args, ...', Type: 'Any', Description: 'The additional arguments that were passed to the Saga constructor.' }
        ],
        properties: [
            { Argument: 'handles', Type: 'Object', Description: 'A hashtable pairing message topics with handler functions. Can be nested.' },
            { Argument: 'endsChildrenExplicitly', Type: 'Boolean', Description: 'Setting to true causes child sagas to remain active if a message is received on the parent saga.' }
        ]
    }
};



// Panes/Content/Reference/Types/Flow.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Flow' };

Reference.Types.Flow = {
    name: 'TC.Types.Flow',
    description: 'Manages a navigation flow by maintaining state and handling specific messages.',
    constructor: {
        arguments: [
            { name: 'navigationSource', type: 'TC.Types.Pane | TC.Types.Node', description: 'The flow attaches to the navigation node of the pane or node specified.' },
            { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Flow definition or its constructor.' },
            { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
        ]
    },
    functions: [
        {
            name: 'start',
            description: 'Subscribes provided message handlers to messages published on the pane\'s pubsub engine.',
            arguments: [
                { name: 'data', type: 'Constructor', description: 'Data that is passed to the onstart handler.' }
            ],
            returns: 'TC.Types.Flow'
        },
        {
            name: 'startChild',
            description: 'Starts a new saga. The lifetime of the new saga is bound to the current saga.',
            arguments: [
                { name: 'definition', type: 'Constructor', description: 'The constructor for the object that contains the Flow definition.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'TC.Types.Flow'
        },
        {
            name: 'end',
            description: 'Unsubscribes message handlers for this and all child sagas.',
            arguments: [
                { name: 'data', type: 'Constructor', description: 'Data that is passed to the onend handler.' }
            ],
            returns: 'TC.Types.Flow'
        },
        {
            name: 'startSaga',
            description: 'Creates a Saga that is bound to the flow\'s lifetime.',
            arguments: [
                { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Saga definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'Tribe.PubSub.Saga'
        },
        {
            name: 'navigate',
            description: 'Perform a navigation operation on the stored navigation node.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        }
    ],
    helpers: [
        {
            name: 'to',
            description: 'Navigate to the specified pane when the specified message is received.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'function () { }'
        },
        {
            name: 'endsAt',
            description: 'Navigate to the specified pane and end the flow when the specified message is received.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'function () { }'
        },
        {
            name: 'start',
            description: 'Start a child flow when the specified message is received.',
            arguments: [
                { name: 'flow', type: 'Object | Constructor', description: 'The object that contains the Flow definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'function () { }'
        }
    ],
    properties: [
        { name: 'node', type: 'TC.Types.Node', description: 'The node being used for navigation.' },
        { name: 'pubsub', type: 'Tribe.PubSub', description: 'The PubSub instance used for subscriptions.' },
        { name: 'saga', type: 'Tribe.PubSub.Saga', description: 'The underlying Saga instance.' },
        { name: 'sagas', type: '[TC.Types.Saga]', description: 'Array of Sagas started with the startSaga function.' }
    ],
    Definition: {
        arguments: [
            { Argument: 'flow', Type: 'TC.Types.Flow', Description: 'The Flow object that is consuming the definition.' },
            { Argument: 'args, ...', Type: 'Any', Description: 'The additional arguments that were passed to the Flow constructor.' }
        ],
        properties: [
            { Argument: 'handles', Type: 'Object', Description: 'A hashtable pairing message topics with handler functions. Can be nested.' },
            { Argument: 'endsChildrenExplicitly', Type: 'Boolean', Description: 'Setting to true causes child flows to remain active if a message is received on the parent flow.' }
        ]
    }
};



// Panes/Content/Reference/Types/History.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/History' };

Reference.Types.History = {
    name: 'TC.Types.History',
    description: 'Maintains the state of the browser history stack, including URL data.',
    constructor: {
        arguments: [
            { name: 'history', type: 'window.History', description: 'An object that exposes an interface matching that of the window.History object.' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Load a history entry onto the stack.',
            arguments: [
                { name: 'urlOptions', type: 'Object', description: 'An object containing url and title properties.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'go',
            description: 'Move the current stack frame forward or back the specified number of frames, triggering the browser.go document event.',
            arguments: [
                { name: 'frameCount', type: 'Number' }
            ],
            returns: 'undefined'
        },
        {
            name: 'update',
            description: 'Move the current stack frame forward or back the specified number of frames, WITHOUT triggering the browser.go document event.',
            arguments: [
                { name: 'frameCount', type: 'Number' }
            ],
            returns: 'undefined'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the History object.',
            returns: 'undefined'
        }
    ]
};



// Panes/Content/Reference/Types/Loader.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Loader' };

Reference.Types.Loader = {
    name: 'TC.Types.Loader',
    description: 'Ensures URLs are only loaded once. Concurrent requests return the same promise. The actual loading of resources is performed by specific LoadHandlers.',
    functions: [
        {
            name: 'get',
            description: 'Load the specified URL using the LoadHandler that corresponds with the file extension. Returns the result of executing the LoadHandler, usually a jQuery.Deferred.',
            arguments: [
                { name: 'url', type: 'String', description: 'The URL to load.' },
                { name: 'resourcePath', type: 'String', description: 'The resource path to pass to the LoadHandler.' },
                { name: 'context', type: 'Any', description: 'A context object to pass to the LoadHandler.' }
            ],
            returns: 'jQuery.Deferred'
        }
    ]
};



// Panes/Content/Reference/Types/Logger.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Logger' };

Reference.Types.Logger = {
    name: 'TC.Types.Logger',
    description: 'Provides a unified API for logging functionality',
    functions: [
        {
            name: 'debug',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'info',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'warn',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'error',
            description: '',
            arguments: [
                { name: 'message', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setLogLevel',
            description: '',
            arguments: [
                { name: 'level', type: 'Number', description: 'Number corresponding with the desired log level - 0 = debug, 4 = none.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'setLogger',
            description: 'Set the underlying logging mechanism registed in the TC.Loggers collection. Default is \'console\'.',
            arguments: [
                { name: 'newLogger', type: 'String' }
            ],
            returns: 'undefined'
        }
    ]
};



// Panes/Content/Reference/Types/Models.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Models' };

Reference.Types.Models = {
    name: 'TC.Types.Models',
    description: 'Managed collection of pane models.',
    functions: [
        {
            name: 'register',
            description: 'Register a model model with the collection. Registered models can be accessed as properties on the collection, keyed by resource path.',
            arguments: [
                { name: 'resourcePath', type: 'String', description: 'Associated pane path.' },
                { name: 'constructor', type: 'Function', description: 'Constructor function for the model.' },
                { name: 'options', type: 'Object', description: 'Options hashtable to store with the model.' }
            ],
            returns: ''
        }
    ]
};



// Panes/Content/Reference/Types/Node.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Node' };

Reference.Types.Node = {
    name: 'TC.Types.Node',
    description: 'A Node object is a placeholder for a pane within the UI structure. Nodes can be transitioned to display different panes using the navigate or transitionTo functions.',
    constructor: {
        arguments: [
            { name: 'parent', type: 'TC.Types.Node' },
            { name: 'pane', type: 'TC.Types.Pane' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Find the navigation node for the current node and transition it to the specified pane, updating the history stack.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'navigateBack',
            description: 'Find the navigation node for the current node and transition it to the previous pane in the history stack.',
            returns: 'undefined'
        },
        {
            name: 'findNavigation',
            description: 'Find the node that handles navigation for the current node. Usually the closest parent that has been marked with handlesNavigation, unless overridden.',
            returns: 'TC.Types.Navigation'
        },
        {
            name: 'transitionTo',
            description: 'Transition the pane for the current node to the specified pane.',
            arguments: [
                { name: 'paneOptions', type: 'Object', description: 'An object containined path and data properties.' },
                { name: 'transition', type: 'String', description: 'The transition to use.' },
                { name: 'reverse', type: 'Boolean', description: 'Use the reverse transition.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'startFlow',
            description: 'Start a flow with the specified definition.',
            arguments: [
                { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Flow definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'TC.Types.Flow'
        },
        {
            name: 'setPane',
            description: 'Sets the pane on the current node.',
            arguments: [
                { name: 'pane', type: 'TC.Types.Pane' }
            ],
            returns: 'undefined'
        },
        {
            name: 'nodeForPath',
            description: 'Find the node to use for inheriting paths from.',
            returns: 'TC.Types.Node'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the node.',
            returns: 'undefined'
        }
    ],
    properties: [
        {
            name: 'parent',
            type: 'TC.Types.Node'
        },
        {
            name: 'children',
            type: '[TC.Types.Node]'
        },
        {
            name: 'root',
            description: 'The root node of the current node tree.',
            type: 'TC.Types.Node'
        },
        {
            name: 'id',
            description: 'A unique numeric identifier for the current node.',
            type: 'Number'
        },
        {
            name: 'pane',
            type: 'TC.Types.Pane'
        },
        {
            name: 'navigation',
            description: 'The Navigation object for the current node, if any.',
            type: 'TC.Types.Navigation'
        },
        {
            name: 'defaultNavigation',
            description: 'The default Navigation object to use for the current node. Set on the root node so that all nodes in the tree can access the navigation node.',
            type: 'TC.Types.Node'
        }
    ]
};



// Panes/Content/Reference/Types/Operation.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Operation' };

Reference.Types.Operation = {
    name: 'TC.Types.Operation',
    description: 'Encapsulates an operation involving several child operations, keyed by an id. Child operations can be added cumulatively. Promise resolves when the all child operations complete.',
    functions: [
        {
            name: 'add',
            description: 'Add an id corresponding with a child operation',
            arguments: [
                { name: 'id', type: 'Any' }
            ],
            returns: 'undefined'
        },
        {
            name: 'complete',
            description: 'Mark the specified id is being complete',
            arguments: [
                { name: 'id', type: 'Any' }
            ],
            returns: 'undefined'
        }
    ],
    properties: [
        {
            name: 'promise',
            description: 'The promise object representing the state of the operation.',
            type: 'jQuery.Deferred'
        },
    ]
};



// Panes/Content/Reference/Types/Pane.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Pane' };

Reference.Types.Pane = {
    name: 'TC.Types.Pane',
    description: 'A pane is a single user interface component within an application. It can consist of a HTML template, a JavaScript model and a CSS stylesheet. Panes can be nested within other panes.',
    constructor: {
        arguments: [
            { name: 'options', type: 'Object', description: 'Hashtable of options for the pane.' }
        ]
    },
    functions: [
        {
            name: 'navigate',
            description: 'Navigate the node containing the pane to the specified pane.',
            arguments: [
                { name: 'pathOrOptions', type: 'String | Object', description: 'An object containing path and data properties, or the path to the target pane.' },
                { name: 'data', type: 'Any', description: 'Data to pass to the target pane.' }
            ],
            returns: 'undefined'
        },
        {
            name: 'startFlow',
            description: 'Start a flow with the specified definition.',
            arguments: [
                { name: 'definition', type: 'Object | Constructor', description: 'The object that contains the Flow definition or its constructor.' },
                { name: 'args, ...', type: 'Any', description: 'Arguments to pass to the definition constructor.' }
            ],
            returns: 'TC.Types.Flow'
        },
        {
            name: 'remove',
            description: 'Remove the pane from the DOM.',
            returns: 'undefined'
        },
        {
            name: 'find',
            description: 'Find elements contained within the pane.',
            arguments: [
                { name: 'selector', type: 'selector' }
            ],
            returns: 'jQuery'
        },
        {
            name: 'inheritPathFrom',
            description: 'If the pane\'s current path is relative, inherit the absolute path from the specified node.',
            arguments: [
                { name: 'node', type: 'TC.Types.Node' }
            ],
            returns: 'undefined'
        },
        {
            name: 'startRender',
            description: 'Adds a CSS class to identify the pane as currently being rendered.',
            returns: 'undefined'
        },
        {
            name: 'endRender',
            description: 'Remvoes the CSS class used to identify the pane as currently being rendered.',
            returns: 'undefined'
        },
        {
            name: 'dispose',
            description: 'Clean up resources used by the pane.',
            returns: 'undefined'
        },
        {
            name: 'toString',
            description: 'Returns a human readable identifier for the pane.',
            returns: 'String'
        }
    ],
    properties: [
        {
            name: 'path',
            type: 'String'
        },
        {
            name: 'data',
            type: 'Any'
        },
        {
            name: 'element',
            type: 'HTMLElement'
        },
        {
            name: 'transition',
            description: 'Transition to use when the pane is rendered and removed.',
            type: ''
        },
        {
            name: 'reverseTransitionIn',
            description: 'Use the reverse transition when rendering.',
            type: ''
        },
        {
            name: 'handlesNavigation',
            description: 'The pane has been marked as handling navigation.',
            type: ''
        },
        {
            name: 'pubsub',
            type: 'Tribe.PubSub'
        },
        {
            name: 'id',
            type: 'Any'
        },
        {
            name: 'skipPath',
            description: 'Skip this pane when determining the parent path to inherit from.',
            type: 'Boolean'
        },
        {
            name: 'is.rendered',
            description: '',
            type: ''
        },
        {
            name: 'is.disposed',
            description: '',
            type: ''
        },
    ]
};



// Panes/Content/Reference/Types/Pipeline.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Pipeline' };

Reference.Types.Pipeline = {
    name: 'TC.Types.Pipeline',
    description: 'Manages the step by step execution of a number of named events. Each step will only execute after the promise returned by the previous step resolves. A rejected promise will halt execution of the pipeline.',
    constructor: {
        arguments: [
            { name: 'events', type: 'Object', description: 'Hashtable of event handler functions, keyed by the event name.' },
            { name: 'context', type: 'Any', description: 'Context data that is passed to each event function.' }
        ]
    },
    functions: [
        {
            name: 'execute',
            description: 'Execute the specified events against the specified target.',
            arguments: [
                { name: 'eventsToExecute', type: '[String]', description: 'Ordered array of events to execute against the target.' },
                { name: 'target', type: 'Object', description: 'Target object to pass to each event handler function.' }
            ],
            returns: 'jQuery.Deferred'
        }
    ]
};



// Panes/Content/Reference/Types/Templates.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Types/Templates' };

Reference.Types.Templates = {
    name: 'TC.Types.Templates',
    description: 'Managed collection of HTML templates.',
    functions: [
        {
            name: 'store',
            description: 'Store the specified template, keyed by the specified path',
            arguments: [
                { name: 'template', type: 'String' },
                { name: 'path', type: 'String' }
            ],
            returns: 'undefined'
        },
        {
            name: 'loaded',
            description: 'Checks whether the template for the specified path has been loaded',
            arguments: [
                { name: 'path', type: 'String' }
            ],
            returns: 'Boolean'
        },
        {
            name: 'render',
            description: 'Render the template for the specified path to the specified target',
            arguments: [
                { name: 'target', type: 'selector' },
                { name: 'path', type: 'string' }
            ],
            returns: 'undefined'
        }
    ]
};



// Panes/Content/Reference/Utilities/collections.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/collections' };

Reference.Utilities.Collections = [
    { name: 'TC.Utils.each', description: '', arguments: [{ name: 'collection' }, { name: 'iterator' }] },
    { name: 'TC.Utils.map', description: '', arguments: [{ name: 'collection' }, { name: 'iterator' }] },
    { name: 'TC.Utils.reduce', description: '', arguments: [{ name: 'collection' }, { name: 'initialValue' }, { name: 'iterator' }] },
    { name: 'TC.Utils.filter', description: '', arguments: [{ name: 'array' }, { name: 'iterator' }] },
    { name: 'TC.Utils.pluck', description: '', arguments: [{ name: 'array' }, { name: 'iterator' }] }
];



// Panes/Content/Reference/Utilities/embeddedState.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/embeddedState' };

Reference.Utilities.EmbeddedState = [
    { name: 'TC.Utils.embedState', description: '', arguments: [{ name: 'model' }, { name: 'context' }, { name: 'node' }] },
    { name: 'TC.Utils.contextFor', description: '', arguments: [{ name: 'element' }] },
    { name: 'TC.Utils.extractContext', description: '', arguments: [{ name: 'koBindingContext' }] },
    { name: 'TC.Utils.extractNode', description: '', arguments: [{ name: 'koBindingContext' }] }
];



// Panes/Content/Reference/Utilities/events.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/events' };

Reference.Utilities.Events = [
    { name: 'TC.Utils.elementDestroyed', description: '', arguments: [{ name: 'element' }], returns: 'jQuery.Deferred' },
    { name: 'TC.Utils.raiseDocumentEvent', description: '', arguments: [{ name: 'name' }, { name: 'data' }] },
    { name: 'TC.Utils.handleDocumentEvent', description: '', arguments: [{ name: 'name' }, { name: 'handler' }] },
    { name: '$.complete', description: '', arguments: [{ name: 'deferreds' }] },
    { name: 'jQuery.Event("destroyed")' }
];




// Panes/Content/Reference/Utilities/misc.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/misc' };

Reference.Utilities.Misc = [
    { name: 'TC.Utils.try', description: '', arguments: [{ name: 'func' }, { name: 'args' }, { name: 'handleExceptions' }, { name: 'message' }] },
    { name: 'TC.Utils.idGenerator', description: '', returns: '{ next: function() }' },
    { name: 'TC.Utils.getUniqueId', description: '' },
    { name: 'TC.Utils.cleanElement', description: '', arguments: [{ name: 'element' }] }
];




// Panes/Content/Reference/Utilities/objects.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/objects' };

Reference.Utilities.Objects = [
    { name: 'TC.Utils.arguments', description: '', arguments: [{ name: 'args' }] },
    { name: 'TC.Utils.removeItem', description: '', arguments: [{ name: 'array' }, { name: 'item' }] },
    { name: 'TC.Utils.inheritOptions', description: '', arguments: [{ name: 'from' }, { name: 'to' }, { name: 'options' }] },
    { name: 'TC.Utils.evaluateProperty', description: '', arguments: [{ name: 'target' }, { name: 'property' }] },
    { name: 'TC.Utils.cloneData', description: '', arguments: [{ name: 'from' }, { name: 'except' }] }
];




// Panes/Content/Reference/Utilities/packScript.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/packScript' };

Reference.Utilities.PackScript = [
];



// Panes/Content/Reference/Utilities/panes.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/panes' };

Reference.Utilities.Panes = [
    {
        name: 'TC.Utils.getPaneOptions',
        description: 'Normalise the passed value and merge the other options.',
        arguments: [{ name: 'value' }, { name: 'otherOptions' }]
    },
    {
        name: 'TC.Utils.bindPane',
        description: 'Load and bind the pane specified in paneOptions to the specified element and link it to the specified node.',
        arguments: [{ name: 'node' }, { name: 'element' }, { name: 'paneOptions' }, { name: 'context' }]
    },
    {
        name: 'TC.Utils.insertPaneAfter',
        description: 'As bindPane, but create a new DIV element and insert it after the specified target.',
        arguments: [{ name: 'node' }, { name: 'target' }, { name: 'paneOptions' }, { name: 'context' }]
    }
];



// Panes/Content/Reference/Utilities/paths.js


TC.scriptEnvironment = { resourcePath: '/Content/Reference/Utilities/paths' };

Reference.Path = [
    {
        name: 'TC.Path',
        description: 'The Path function accepts a string containing a path, normalises the path and returns an object with several manipulation functions attached.',
        arguments: [{ name: 'path', type: 'String' }],
        returns: 'TC.Path',
        examples: [{
            description: 'Most functions can be chained',
            code: "TC.Path('Folder').makeAbsolute().combine('file.ext').withoutExtension().toString()",
            result: '/Folder/file'
        }]
    }
];

Reference.Path.Functions = [
    { name: 'withoutFilename', description: '', returns: 'TC.Path' },
    { name: 'filename', description: '', returns: 'TC.Path' },
    { name: 'extension', description: '', returns: 'String' },
    { name: 'withoutExtension', description: '', returns: 'TC.Path' },
    { name: 'combine', description: '', arguments: [{ name: 'additionalPath' }], returns: 'TC.Path' },
    { name: 'isAbsolute', description: '', returns: 'Boolean' },
    { name: 'makeAbsolute', description: '', returns: 'TC.Path' },
    { name: 'makeRelative', description: '', returns: 'TC.Path' },
    { name: 'asMarkupIdentifier', description: '', returns: 'String' },
    { name: 'setExtension', description: '', arguments: [{ name: 'extension' }], returns: 'TC.Path' },
    { name: 'toString', description: '', returns: 'String' }
];



// Panes/Interface/content.js


TC.scriptEnvironment = { resourcePath: '/Interface/content' };

TC.registerModel(function (pane) {
    this.panePath = panePath(pane.data);

    this.renderComplete = function() {
        pane.find('pre').each(function() {
            $(this).html(PR.prettyPrintOne($(this).html()));
        });
    };

    pane.pubsub.subscribe('article.show', function (article) {
        $(pane.element).css({ 'width': '100%' });
        pane.navigate({ path: '/Interface/content', data: article });
    });
    
    function panePath(article) {
        return '/Content/' + article.section + '/' + article.topic;
    }
});



// Panes/Interface/feedback.js


TC.scriptEnvironment = { resourcePath: '/Interface/feedback' };

TC.registerModel(function (pane) {
    var self = this;
    
    this.email = ko.observable().extend({ email: 'This' });
    this.comments = ko.observable().extend({ required: true });
    this.success = ko.observable();
    
    this.paneRendered = function() {
        $('<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>')
            .insertAfter(pane.find('.twitter-mention-button'));
    };

    this.submit = function() {
        $.post('Feedback/Send', {
            url: window.location.href,
            email: self.email(),
            content: self.comments()
        }).done(done).fail(fail);
    };

    this.close = function() {
        pane.remove();
    };
    
    function done() {
        self.success(true);
        setTimeout(self.close, 3000);
    }
    
    function fail() {
        self.success(false);
    }
});



// Panes/Interface/header.js


TC.scriptEnvironment = { resourcePath: '/Interface/header' };

TC.registerModel(function (pane) {
    TC.Utils.handleDocumentEvent('navigating', navigating);
    function navigating(e) {
        if (Navigation.isHome(e.eventData.options.data))
            hide();
        else
            show();
    }

    this.renderComplete = function() {
        if (!Navigation.isHome(pane.node.findNavigation().node.pane.data))
            show();
    };

    function show() {
        if (!$('.header .logo').is(':visible'))
            TC.transition('.header .logo', 'fade')['in']();
    }

    function hide() {
        if ($('.header .logo').is(':visible'))
            TC.transition('.header .logo', 'fade').out(false);
    }

    this.feedback = function () {
        TC.transition(
            TC.appendNode('body', { path: '/Interface/feedback' }),
            'fade')['in']();
    };

    this.dispose = function () {
        window.removeEventListener('navigating', navigating);
    };
});



// Panes/Interface/navigation.js


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

    // it would be nice to use the article.show message for this,
    // but that won't work with browser back and forward buttons
    TC.Utils.handleDocumentEvent('navigating', navigating);
    function navigating(e) {
        var data = e.eventData.options.data || {};
        updateCurrentArticle(data);
    }
    
    // this is to handle bookmarks / refresh
    // need to come up with a better way of doing this
    this.renderComplete = function() {
        updateCurrentArticle(pane.node.findNavigation().node.pane.data);
    };

    function updateCurrentArticle(data) {
        if (data.section && data.topic) {
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
    }

    function show() {
        if (!$('.navigation').is(':visible'))
            TC.transition('.navigation', 'slideRight')['in']();
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



// Panes/Interface/navigationContainer.js


TC.scriptEnvironment = { resourcePath: '/Interface/navigationContainer' };

TC.registerModel(function (pane) {
    pane.node.skipPath = true;
    pane.node.root = pane.node;

    var currentFrame = 0;
    this.initialPane = pane.data.frames[currentFrame];
    this.atStart = ko.observable(true);
    this.atEnd = ko.observable(false);

    this.back = function() {
        pane.navigateBack();
        currentFrame--;
        this.atEnd(false);
        this.atStart(currentFrame === 0);
    };

    this.next = function() {
        pane.navigate(pane.data.frames[++currentFrame]);
        this.atEnd(currentFrame === pane.data.frames.length - 1);
        this.atStart(false);
    };
    
    
});



// Panes/Interface/sample.js


TC.scriptEnvironment = { resourcePath: '/Interface/sample' };

TC.registerModel(function (pane) {
    var self = this;
    var data = pane.data || {};
    var rootPane = data.rootPane || 'layout';

    // this is a hack to make samples navigate as if they were the root pane
    pane.node.root = pane.node;

    this.samplePane = rootPane.constructor === String ? 
        '/Samples/' + data.name + '/' + rootPane : rootPane;
    this.files = Samples[pane.data.name];
    this.selectedFile = ko.observable(initialSelection());
    this.handleNavigation = data.handleNavigation;
    
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



// Panes/Interface/API/constructor.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/constructor' };

TC.registerModel(function (pane) {    
    this.func = $.extend({ name: 'new ' + pane.data.name }, pane.data.constructor);
});



// Panes/Interface/API/function.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/function' };

TC.registerModel(function(pane) {
    this.f = pane.data;

    this.argumentNames = TC.Utils.pluck(pane.data.arguments, 'name').join(', ');
});



// Panes/Interface/API/table.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/table' };

TC.registerModel(function(pane) {
    this.columns = mapColumns();
    this.rows = mapRows();
    
    function mapColumns() {
        return TC.Utils.map(pane.data[0], function(value, key) {
            return key;
        });
    }
    
    function mapRows() {
        return TC.Utils.map(pane.data, function (row) {
            return TC.Utils.map(row, function(value) {
                return value.toString();
            });
        });
    }
});



// Panes/Interface/API/type.js


TC.scriptEnvironment = { resourcePath: '/Interface/API/type' };

TC.registerModel(function(pane) {
    this.t = pane.data;
});



// Panes/Samples/mobile.js


TC.scriptEnvironment = { resourcePath: '/Samples/mobile' };

TC.registerModel(function(pane) {
    TMH.initialise(pane.pubsub, 'signalr');
    TMH.joinChannel('chat', { serverEvents: ['chat.*'] });
});



// Panes/Samples/About/Chat/chat.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Chat/chat' };

TC.registerModel(function (pane) {
    // Hook up our message hub and join a channel
    TMH.initialise(pane.pubsub);
    TMH.joinChannel('chat', {
         serverEvents: ['chat.*']
    });

    // The dispose function is called automatically
    // when the pane is removed from the DOM.
    this.dispose = function() {
        TMH.leaveChannel('chat');
    };
});



// Panes/Samples/About/Chat/messages.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Chat/messages' };

TC.registerModel(function(pane) {
    var self = this;

    this.messages = ko.observableArray();

    pane.pubsub.subscribe('chat.message',
        function (message) {
            self.messages.push(message);
        });
});



// Panes/Samples/About/Chat/sender.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Chat/sender' };

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



// Panes/Samples/About/Mobile/samples.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Mobile/samples' };

TC.registerModel(function (pane) {
    TC.toolbar.title('Title!');
    
    TC.toolbar.options([
        { text: 'Option 1', func: function () { } },
        { text: 'Option 2', func: function () { } }
    ]);

    this.listData = {
        items: [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' }
        ],
        itemText: function(item) {
             return item.id + ' - ' + item.name;
        },
        headerText: 'Select List',
        itemClick: function(item) { }
    };

    this.overlay = function() {
        TC.overlay('overlay');
    };

    this.navigate = function() {
        pane.navigate('navigate');
    };
});



// Panes/Samples/About/Mobile/welcome.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Mobile/welcome' };

TC.registerModel(function (pane) {
    TC.toolbar.defaults.back = true;

    this.samples = function() {
        pane.navigate('samples');
    };

    this.chat = function () {
        pane.navigate('chat');
    };
});



// Panes/Samples/About/Tasks/create.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Tasks/create' };

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



// Panes/Samples/About/Tasks/list.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Tasks/list' };

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



// Panes/Samples/About/Tasks/task.js


TC.scriptEnvironment = { resourcePath: '/Samples/About/Tasks/task' };

TC.registerModel(function(pane) {
    var self = this;

    this.task = pane.data;
    
    this.deleteTask = function() {
        pane.pubsub.publish('task.delete', self.task);
    };
});



// Panes/Samples/CreditCard/1-Personal/confirm.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/1-Personal/confirm' };

TC.registerModel(function (pane) {
    var self = this;

    this.data = pane.data;
    this.json = ko.observable();

    this.submit = function () {
        // Dump the details object on screen for our viewer's pleasure.
        self.json(JSON.stringify(pane.data));
    };
});



// Panes/Samples/CreditCard/1-Personal/PersonalFlow.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/1-Personal/PersonalFlow' };

PersonalFlow = function (flow) {
    var details = { type: 'personal' };         // An object to hold application details
    
    this.handles = {                            
        onstart: flow.to('personal'),
        'setAccount': function(account) {       // As events occur, build up our details
            details.account = account;          // object and flow through the process
            flow.navigate('contact');
        },
        'setContact': function(contact) {
            details.contact = contact;
            flow.navigate('confirm', details);  // Our flow ends after navigating to the
            flow.end();                         // confirmation pane.
        }
    };
};



// Panes/Samples/CreditCard/1-Personal/welcome.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/1-Personal/welcome' };

TC.registerModel(function(pane) {
    this.start = function () {
        // panes expose a simple function for starting flows
        pane.startFlow(PersonalFlow);
    };
});



// Panes/Samples/CreditCard/2-Business/BusinessFlow.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/2-Business/BusinessFlow' };

BusinessFlow2 = function (flow) {
    var details = { type: 'business' };
    
    this.handles = {
        onstart: flow.to('businessDetails'),
        'setBusiness': function(business) {
            details.business = business;
            flow.navigate('businessAccount');
        },
        'setAccount': function(account) {
            details.account = account;
            flow.navigate('contact');
        },
        'setContact': function(contact) {
            details.contact = contact;
            flow.navigate('confirm', details);
            flow.end();
        }
    };
};



// Panes/Samples/CreditCard/2-Business/confirm.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/2-Business/confirm' };

TC.registerModel(function (pane) {
    var self = this;

    this.data = pane.data;
    this.json = ko.observable();

    this.submit = function() {
        self.json(JSON.stringify(pane.data));
    };
});



// Panes/Samples/CreditCard/2-Business/PersonalFlow.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/2-Business/PersonalFlow' };

PersonalFlow2 = function (flow) {
    var details = { type: 'personal' };
    
    this.handles = {
        onstart: flow.to('personal'),
        'setAccount': function(account) {
            details.account = account;
            flow.navigate('contact');
        },
        'setContact': function(contact) {
            details.contact = contact;
            flow.navigate('confirm', details);
            flow.end();
        }
    };
};



// Panes/Samples/CreditCard/2-Business/welcome.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/2-Business/welcome' };

TC.registerModel(function(pane) {
    this.personal = function() {
        pane.startFlow(PersonalFlow2);
    };

    this.business = function () {
        pane.startFlow(BusinessFlow2);
    };
});



// Panes/Samples/CreditCard/3-Saga/BusinessFlow.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/3-Saga/BusinessFlow' };

BusinessFlow3 = function (flow) {
    var details = { type: 'business' };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('businessDetails'),
        'setBusiness': flow.to('businessAccount'),
        'setAccount': flow.to('contact'),
        'setContact': flow.endsAt('confirm', details)
    };
};



// Panes/Samples/CreditCard/3-Saga/confirm.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/3-Saga/confirm' };

TC.registerModel(function (pane) {
    var self = this;

    this.data = pane.data;
    this.json = ko.observable();

    this.submit = function() {
        self.json(JSON.stringify(pane.data));
    };
});



// Panes/Samples/CreditCard/3-Saga/CreditCard.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/3-Saga/CreditCard' };

CreditCard = function (saga, details) {
    this.handles = {
        'setAccount': function (account) {
            details.account = account;
        },
        'setBusiness': function (business) {
            details.business = business;
        },
        'setContact': function (contact) {
            details.contact = contact;
        }
    };
};



// Panes/Samples/CreditCard/3-Saga/PersonalFlow.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/3-Saga/PersonalFlow' };

PersonalFlow3 = function (flow) {
    var details = { type: 'personal' };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('personal'),
        'setAccount': flow.to('contact'),
        'setContact': flow.endsAt('confirm', details)
    };
};



// Panes/Samples/CreditCard/3-Saga/welcome.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/3-Saga/welcome' };

TC.registerModel(function(pane) {
    this.personal = function() {
        pane.startFlow(PersonalFlow3);
    };

    this.business = function () {
        pane.startFlow(BusinessFlow3);
    };
});



// Panes/Samples/CreditCard/4-Combined/confirm.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/4-Combined/confirm' };

TC.registerModel(function (pane) {
    var self = this;

    this.data = pane.data;
    this.json = ko.observable();

    this.submit = function() {
        self.json(JSON.stringify(pane.data));
    };

    this.restart = function() {
        pane.startFlow(CreditCardFlow);
    };
});



// Panes/Samples/CreditCard/4-Combined/CreditCard.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/4-Combined/CreditCard' };

CreditCard = function (saga, details) {
    this.handles = {
        'startBusiness': function() {
            details.type = 'business';
        },
        'startPersonal': function() {
            details.type = 'personal';
        },
        'setAccount': function (account) {
            details.account = account;
        },
        'setBusiness': function (business) {
            details.business = business;
        },
        'setContact': function (contact) {
            details.contact = contact;
        }
    };
};



// Panes/Samples/CreditCard/4-Combined/CreditCardFlow.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/4-Combined/CreditCardFlow' };

CreditCardFlow = function (flow) {
    var details = { };
    flow.startSaga(CreditCard, details);

    this.handles = {
        onstart: flow.to('welcome'),
        'startBusiness': {
            onstart: flow.to('businessDetails'),
            'setBusiness': flow.to('businessAccount'),
            'setAccount': flow.to('contact')
        },
        'startPersonal': {
            onstart: flow.to('personal'),
            'setAccount': flow.to('contact')
        },
        'setContact': flow.endsAt('confirm', details)
    };
};



// Panes/Samples/CreditCard/4-Combined/host.js


TC.scriptEnvironment = { resourcePath: '/Samples/CreditCard/4-Combined/host' };

TC.registerModel(function(pane) {
    pane.startFlow(CreditCardFlow);
});



// Panes/Samples/Panes/Communicating/layout.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Communicating/layout' };

TC.registerModel(function (pane) {
    // Create an observable to share between child panes
    this.observable = ko.observable('Test');
});



// Panes/Samples/Panes/Communicating/receiver.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Communicating/receiver' };

TC.registerModel(function(pane) {
    var self = this;

    // Our shared observable
    this.observable = pane.data;
    
    // Listen for messages and push them onto 
    // an array as they arrive
    this.messages = ko.observableArray();
    pane.pubsub.subscribe('sample.message', function (data) {
        self.messages.push(data);
    });
});



// Panes/Samples/Panes/Communicating/sender.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Communicating/sender' };

TC.registerModel(function (pane) {
    var self = this;
    
    // Our shared observable
    this.observable = pane.data;
    
    // The pubsub object is available through the pane object.
    this.message = ko.observable();
    this.send = function() {
        pane.pubsub.publish('sample.message',
            { message: self.message() });
    };
});



// Panes/Samples/Panes/Creating/helloWorld.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Creating/helloWorld' };

TC.registerModel(function (pane) {
    // Model properties are available for 
    // data binding in your template.
    this.message = "Message passed: " + pane.data.message;
});



// Panes/Samples/Panes/Dynamic/create.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Dynamic/create' };

TC.registerModel(function (pane) {
    var i = 0;
    
    // Dynamically insert a pane into the element
    // with its class set to "items".
    this.createPane = function() {
        TC.appendNode('.items', { path: 'item', data: ++i });
    };
});



// Panes/Samples/Panes/Lifecycle/create.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Lifecycle/create' };

TC.registerModel(function (pane) {
    var i = 0;
    
    this.createPane = function() {
        TC.appendNode(pane.find('.items'),
            { path: 'item', data: ++i });
    };
});



// Panes/Samples/Panes/Lifecycle/item.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Lifecycle/item' };

TC.registerModel(function (pane) {
    this.data = pane.data;

    // The initialise function is called before the pane
    // is rendered. If you return a jQuery deferred object,
    // Tribe will wait for it to resolve before continuing.
    
    this.initialise = function() {
        var promise = $.Deferred();
        setTimeout(promise.resolve, 500);
        return promise;
    };
});



// Panes/Samples/Panes/Navigating/first.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Navigating/first' };

TC.registerModel(function(pane) {
    this.next = function() {
        pane.navigate('second');
    };
});



// Panes/Samples/Panes/Navigating/second.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Navigating/second' };

TC.registerModel(function(pane) {
    this.back = function () {
        pane.navigateBack();
    };

    this.next = function () {
        pane.navigate('third');
    };
});



// Panes/Samples/Panes/Navigating/third.js


TC.scriptEnvironment = { resourcePath: '/Samples/Panes/Navigating/third' };

TC.registerModel(function(pane) {
    this.back = function() {
        pane.navigateBack();
    };
});



// Panes/Samples/Webmail/1-Folders/folders.js


TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/1-Folders/folders' };

// Our model just contains a list of folders and
// an observable to hold the selected folder.

TC.registerModel(function (pane) {
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable('Inbox');
});



// Panes/Samples/Webmail/2-Mails/folders.js


TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/2-Mails/folders' };

TC.registerModel(function (pane) {
    var self = this;
    
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable(pane.data.folder);

    // We've added a separate click handler to navigate
    // when a folder is selected.
    this.selectFolder = function (folder) {
        self.selectedFolder(folder);
        pane.navigate('mails', { folder: folder });
    };
});



// Panes/Samples/Webmail/2-Mails/mails.js


TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/2-Mails/mails' };

TC.registerModel(function (pane) {
    var self = this;

    this.data = ko.observable();

    // Load data using AJAX to our data property    
    this.initialise = function() {
        $.getJSON('Data/folder/' + pane.data.folder, self.data);
    };
});



// Panes/Samples/Webmail/3-Content/folders.js


TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/3-Content/folders' };

TC.registerModel(function (pane) {
    var self = this;

    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    this.selectedFolder = ko.observable(pane.data.folder);

    this.selectFolder = function (folder) {
        self.selectedFolder(folder);
        pane.navigate('mails', { folder: folder });
    };
});



// Panes/Samples/Webmail/3-Content/mails.js


TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/3-Content/mails' };

TC.registerModel(function (pane) {
    var self = this;

    this.data = ko.observable();

    this.initialise = function () {
        $.getJSON('Data/folder/' + pane.data.folder, self.data);
    };
    
    this.selectMail = function (mail) {
        pane.navigate('viewMail', mail);
    };
});



// Panes/Samples/Webmail/3-Content/viewMail.js


TC.scriptEnvironment = { resourcePath: '/Samples/Webmail/3-Content/viewMail' };

TC.registerModel(function (pane) {
    var self = this;
    
    this.data = ko.observable();

    this.initialise = function () {
        $.getJSON('Data/mail/' + pane.data.id, self.data);
    };
});



//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<div class="browsers block">\n    <h1>Browser Support</h1>\n    <div class="small padded features block">\n        <div>\n            <img src="Images/Browsers/chrome.png" />\n            <span>Chrome</span>\n        </div>\n        <div>\n            <img src="Images/Browsers/ie.png" />\n            <span>IE 7+</span>\n        </div>\n        <div>\n            <img src="Images/Browsers/firefox.png" />\n            <span>Firefox</span>\n        </div>\n        <div>\n            <img src="Images/Browsers/safari.png" />\n            <span>Safari</span>\n        </div>\n        <div>\n            <img src="Images/Browsers/opera.png" />\n            <span>Opera</span>\n        </div>\n    </div>\n    <div class="clear"></div>\n</div>', 'template--Content-About-browsers');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Contribute</h1>\n    <h2>Tribe needs you!</h2>\n    <p>\n        There are many cool things on the roadmap for the Tribe platform like mobile device skins for each platform,\n        seamless scale-out of the MessageHub component, better distributed event sourcing support, Azure Mobile Services \n        integration and much more.\n    </p>\n    <p>\n        If you\'d like to get involved, feel free to fork the github repository and submit pull requests. If you\'d \n        like to be part of the project, please email <a href="mailto:tribejs@gmail.com">tribejs@gmail.com</a>,\n        tweet <a href="http://twitter.com/tribejs" target="_blank">@tribejs</a> \n        or use the feedback button at the top of the page.\n    </p>\n</div>', 'template--Content-About-contribute');

//
window.__appendTemplate('\n<div class="example1 block">\n    <h1>Show Me!</h1>\n    \n    <p>\n        If you\'re not familiar with knockout, we recommend you have a quick \n        run through the excellent tutorials at\n        <a href="http://learn.knockoutjs.com/" target="_blank">http://learn.knockoutjs.com/</a>.        \n    </p>\n    <p>\n        Tribe allows you to easily break your UI down into "panes" that can consist \n        of a JavaScript model, HTML template and CSS stylesheet. \n    </p>\n    <p>\n        Simply create these files and refer to the pane by name. No complex configuration is required.\n    </p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'About/Tasks\', initialFile: \'layout.htm\' }"></div>\n    \n    <p>\n        Tribe gives you an awesome debugging experience. Using the developer tools built in to Google Chrome, \n        your file structure is preserved and each individual JavaScript file is fully debuggable.\n    </p>\n    <p>\n        To see this in action, head over to the <a href="debug.html">debug version</a> of the site using\n        Chrome and check out the "Sources" tab in the developer tools.\n    </p>\n    <p>\n        For more practical examples, check out the \n        <a data-bind="click: Article.show(\'Guides\', \'Guides/webmail\')">webmail tutorial</a>, or the \n        <a href="https://github.com/danderson00/Tribe" target="_blank">source</a> \n        to this site.\n    </p>\n</div>', 'template--Content-About-example1');

//
window.__appendTemplate('\n<div class="example2 block">\n    <h1>Seamless, Real Time Communication</h1>\n    \n    <p>Connect your users in real time with just a few lines of code - messages you publish are seamlessly broadcast to other users or internal services.</p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'About/Chat\', initialFile: \'chat.js\', rootPane: \'chat\' }"></div>\n</div>', 'template--Content-About-example2');

//
window.__appendTemplate('\n<div class="example3 block">\n    <h1>Mobile App</h1>\n    \n    <p>\n        Tribe makes it effortless to create mobile device apps that look and perform like native apps, using the same code as your web app.\n    </p>\n\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'About/Mobile\', initialFile: \'index.html\', rootPane: { path: \'/Mobile/main\', data: { pane: \'/Samples/About/Mobile/welcome\' } } }"></div>\n    \n    <p>\n        Point your phone\'s browser at <a href="m.html" target="_blank" data-bind="text: window.location.origin + \'/m.html\'"></a> to see the demo on your device.\n    </p>\n</div>', 'template--Content-About-example3');

//
window.__appendTemplate('\n<div class="block">\n    <h1>Key Features</h1>\n    <div class="features">\n        <div>\n            <img src="Images/Features/composite.jpg" />\n            <strong>Composite UI</strong>\n            <span>Simple, powerful UI decomposition.</span>\n        </div>\n        <div>\n            <img src="Images/Features/resources.jpg" />\n            <strong>Resource Management</strong>\n            <span>Full lifecycle management. Powerful load optimisation.</span>\n        </div>\n        <div>\n            <img src="Images/Features/communication.jpg" />\n            <strong>Seamless Communication</strong>\n            <span>Broadcast messages to other users and internal services in real time.</span>\n        </div>\n        <div>\n            <img src="Images/Features/mobile.jpg" />\n            <strong>Mobile Devices</strong>\n            <span>Effortlessly target web and mobile platforms with a shared codebase.</span>\n        </div>\n        <div>\n            <img src="Images/Features/simple.jpg" />\n            <strong>Simple and Intuitive</strong>\n            <span>Flexible, intuitive file structure. No complex configuration.</span>\n        </div>\n    </div>\n    <div class="clear"></div>\n    <div>\n        <a data-bind="click: Article.show(\'Guides\', \'Introduction/features\')">Read more...</a>\n    </div>\n</div>', 'template--Content-About-features');

//
window.__appendTemplate('\n<div class="guides content block">\n    <h1>Guides</h1>\n    <ul>\n        <li data-bind="click: Article.show(\'Guides\', \'Introduction/features\')">\n            <h2>Features</h2>\n            <p>Describes the individual components of Tribe and the features they offer.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Introduction/getStarted\')">\n            <h2>Get Started</h2>\n            <p>How to obtain the Tribe libraries and start your project.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Tutorials/panes\')">\n            <h2>Working With Panes</h2>\n            <p>How to create panes, communicate between them and navigate around.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Tutorials/webmail\')">\n            <h2>Webmail Tutorial</h2>\n            <p>A step by step tutorial for building a simple webmail app.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Tutorials/packscript\')">\n            <h2>Deployment - Packing Your Apps for Maximum Performance</h2>\n            <p>How to use PackScript to combine and minify your resources for deployment.</p>\n        </li>\n        <li data-bind="click: Article.show(\'Guides\', \'Tutorials/creditcard\')">\n            <h2>Modelling Your Navigation Flow and Business Processes</h2>\n            <p>Using flows and sagas to model your navigation and business processes and promote loose coupling.</p>\n            <p>We\'ll also give you a crash course in Tribe.Forms.</p>\n        </li>\n        \n        <h1>Coming Soon!</h1>\n        <li> <!--data-bind="click: Article.show(\'Guides\', \'Guides/nservicebus\')">-->\n            <h2>NServiceBus Integration</h2>\n            <p>Transparently send messages from the client to internal services and publish internal events to client channels.</p>\n        </li>\n    </ul>\n</div>', 'template--Content-About-guides');

//
window.__appendTemplate('\n<div>\n    <div data-bind="pane: \'masthead\'"></div>\n\n    <div class="content">\n        <div data-bind="pane: \'knockout\'"></div>\n        <div data-bind="pane: \'features\'"></div>\n        <div data-bind="pane: \'example1\'"></div>\n        <div data-bind="pane: \'example2\'"></div>\n        <div data-bind="pane: \'example3\'"></div>\n        <div data-bind="pane: \'browsers\'"></div>\n        <div data-bind="pane: \'contribute\'"></div>\n    </div>\n</div>', 'template--Content-About-home');

//
window.__appendTemplate('\n<div class="padded knockout block">\n    <div class="logo">\n        <span>Built with the power of</span>\n        <img src="Images/knockout/logo.png"/>\n    </div>\n    <div class="small padded features block">\n        <div>\n            <img src="Images/knockout/bindings.png" />\n            <span>Declarative Bindings</span>\n        </div>\n        <div>\n            <img src="Images/knockout/refresh.png" />\n            <span>Automatic UI Refresh</span>\n        </div>\n        <div>\n            <img src="Images/knockout/dependencies.png" />\n            <span>Dependency Tracking</span>\n        </div>\n        <div>\n            <img src="Images/knockout/templating.png" />\n            <span>Templating</span>\n        </div>\n    </div>\n    <div class="clear"></div>\n</div>', 'template--Content-About-knockout');

//
window.__appendTemplate('\n<div class="masthead">\n    <h1 class="logo">tribe</h1>            \n    <h2>Easy to build, fast, integrated web and mobile <span class="underline">systems</span>.</h2>\n    \n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=Tribe&type=watch" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=Tribe&type=fork" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n    <a href="https://twitter.com/tribejs" class="twitter-follow-button" data-show-count="false">Follow @tribejs</a>\n    <script src="http://platform.twitter.com/widgets.js"></script>    \n</div>\n', 'template--Content-About-masthead');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Features</h1>\n    \n    <div class="child">\n        <h1>Comprehensively Tested</h1>\n        <p>Tribe has a comprehensive suite of hundreds of unit and integration tests.</p>\n        <p>\n            You can see the JavaScript tests online for\n            <a href="tests.html" target="_blank">Tribe</a> and <a href="http://danderson00.github.io/PackScript/PackScript.Tests/" target="_blank">PackScript</a>.\n        </p>\n        <p>\n            More C# unit and integration tests are available in the <a href="https://github.com/danderson00/Tribe" target="_blank">source</a>.\n        </p>\n    </div>\n\n    <div class="child">\n        <h1>Composite</h1>\n        <img src="Images/Features/composite.jpg" />\n        <ul>\n            <li>Built on the power of <a href="http://knockoutjs.com/" target="_blank">knockout</a> - <b>declarative data binding</b>, <b>observables</b> and more.</li>\n            <li>Break your UI down into reusable pieces in a way that makes sense to you.</li>\n            <li>Simply and easily model <b>navigation flow</b> and <b>business processes</b>.</li>\n            <li>Smooth, <b>hardware accelerated transitions</b> - a core part of Tribe.Composite.</li>\n            <li>Full <b>resource lifecycle management</b> - Tribe manages the lifecycle of panes from load through to disposal.</li>\n            <li><b>Simple and intuitive</b> - structure your project how you need <b>without complex configuration</b>.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>MessageBus</h1>\n        <img src="Images/Features/communication.jpg" />\n        <ul>\n            <li>Built on <b>reliable</b>, <b>highly scalable</b>, proven technology (Microsoft SignalR).</li>\n            <li><b>Transparently broadcast messages</b> to other users on both web and mobile devices.</li>\n            <li>Seamlessly translate messages into server side messaging technology, like <b>NServiceBus</b> or <b>Azure queues</b>.</li>\n            <li>Built in <b>record and replay semantics</b> - event sourcing out of the box.</li>\n            <li><b>Secure channels</b> with simple and extensible authorisation.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Mobile</h1>\n        <img src="Images/Features/mobile.jpg" />\n        <ul>\n            <li>Target <b>mobile devices</b> with the <b>same codebase</b> as your web application.</li>\n            <li>Easily customisable <b>pre-built themes</b> and <b>UI components</b> - focus on building your app.</li>\n        </ul>\n        <br/><br/>\n    </div>\n\n    <div class="child">\n        <h1>PackScript</h1>\n        <img src="Images/Features/simple.jpg" />\n        <ul>\n            <li>Powerful resource building system for combining and minifying resources.</li>\n            <li><b>Combine, minify, transform, template, compile</b> and more.</li>\n            <li>Simple <b>JavaScript configuration</b> API.</li>\n            <li><b>"Watch" mode</b> to update your build every time you save a file.</li>\n            <li>Easily integrates with <b>continuous integration</b> tools.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Forms</h1>\n        <ul>\n            <li>Simple, themable set of templates for creating forms.</li>\n            <li>Model-based validation without any additional markup.</li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Components</h1>\n        <ul>\n            <li>A basic set of reusable user interface components including:\n                <ul>\n                    <li>Grid</li>\n                    <li>Graph</li>\n                    <li>Dialog</li>\n                    <li>Expander</li>\n                    <li>Tab panel</li>\n                    <li>Tooltip</li>\n                    <li>Google Map</li>\n                </ul>\n            </li>\n        </ul>\n    </div>\n</div>\n', 'template--Content-Guides-Introduction-features');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Get Started</h1>\n    <p>There are three easy ways to get started with the Tribe platform.</p>\n\n    <div class="tip">\n        <img src="Images/icon.tip.64.png"/>\n        <p>\n            If you\'re using Chrome and running Tribe from a \n            <span class="filename">file://</span> URL, you must start Chrome with the\n            <span class="filename">--allow-file-access-from-files</span> option.\n        </p>\n        <div class="clear"></div>\n    </div>\n\n    <div class="child">\n        <h1>Online Resources</h1>\n        <p>Use the following HTML for your bootstrapper:</p>\n        <div class="example">\n            <pre>\n&lt;!DOCTYPE HTML>\n&lt;html>\n    &lt;head>\n        &lt;title>&lt;/title>\n        &lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">&lt;/script>        \n        &lt;script src="http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1.js">&lt;/script>\n        &lt;script src="http://danderson00.github.io/Tribe/Build/Tribe.min.js">&lt;/script>\n        &lt;script>$(TC.run)&lt;/script>\n    &lt;/head>\n    &lt;body data-bind="pane: \'layout\'">&lt;/body>\n&lt;/html></pre>\n        </div>\n        <p>Replace \'layout\' with the path to your starting pane.</p>\n    </div>\n\n    <div class="child">\n        <h1>NuGet Packages</h1>\n        <img class="topRight" style="margin-top: 10px !important" src="Images/Features/nuget.jpg"/>\n        <p>If you\'re a Visual Studio user, the easiest way to get started is to install one of the Tribe NuGet packages.</p>\n        <ul>\n            <li>\n                <a href="https://www.nuget.org/packages/Tribe.Composite/" target="_blank">Tribe</a>\n                 - Everything you need for complete Composite and MessageHub functionality.\n            </li>\n            <li>\n                <a href="https://www.nuget.org/packages/Tribe/" target="_blank">Tribe.Template</a>\n                 - Everything in the Tribe package plus a basic starter template.\n            </li>\n            <li>\n                <a href="https://www.nuget.org/packages/Tribe.Template/" target="_blank">Tribe.Composite</a>\n                 - Tribe.Composite, Mobile, Forms and Components.\n            </li>\n        </ul>\n    </div>\n\n    <div class="child">\n        <h1>Download</h1>\n        <a href="http://danderson00.github.io/Tribe/Tribe.zip"><img class="topRight" src="Images/download.png" /></a>\n        <p><a href="http://danderson00.github.io/Tribe/Tribe.zip">Download a ZIP file</a> containing</p>\n        <ul>\n            <li>Production, uncompressed and debug versions of the Tribe libraries</li>\n            <li>Tribe.MessageHub binaries (currently requires IIS, self-hosting server coming soon!)</li>\n            <li>The Tribe test suite</li>\n            <!--<li>A starter template</li>-->\n        </ul>\n    </div>\n</div>', 'template--Content-Guides-Introduction-getStarted');

//
window.__appendTemplate('\n<div class="creditcard content block">\n    <h1>Modelling Navigation and Business Processes</h1>\n    <div data-bind="pane: \'/Interface/navigationContainer\', data: Tutorials.creditCard"></div>\n</div>', 'template--Content-Guides-Tutorials-creditcard');

//
window.__appendTemplate('\n<div>\n</div>', 'template--Content-Guides-Tutorials-nservicebus');

//
window.__appendTemplate('\n<div class="content block">\n    <img src="Images/logo.packscript.gif" class="logo" />\n\n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=PackScript&type=watch" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n    <iframe src="http://ghbtns.com/github-btn.html?user=danderson00&repo=PackScript&type=fork" allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>\n\n    <p>\n        PackScript is a powerful open source (<a href="http://opensource.org/licenses/mit-license.php" target="_blank">MIT license</a>) \n        resource build system that combines, minifies and transforms your JavaScript, HTML and CSS files based on JavaScript configuration files.\n    </p>\n\n    <p>\n        PackScript contains APIs to minify JavaScript, synchronise files, create ZIP files, compile SASS and apply XDT transformations\n        and is easy to extend with both JavaScript and .NET.\n    </p>\n\n    <p>Using PackScript is as simple as creating files named <span class="filename">pack.js</span> that contain intuitive commands.</p>\n    <pre class="example">\npack(\'Scripts/*.js\').to(\'site.js\');</pre>\n    \n    <pre class="example">\npack({\n    to: \'site.js\',\n    include: [\'Scripts/*.js\', \'Libraries/*.js\'],\n    exclude: \'*.debug.js\',\n    recursive: true,\n    minify: true\n});</pre>\n\n    <p>PackScript can easily create multiple versions of your files for production and development scenarios.</p>\n    <pre class="example">\npack({\n    include: [\'Scripts/*.js\', \'Libraries/*.js\'],\n    recursive: true\n}).to({\n    \'site.js\': { exclude: \'*.debug\', minify: true },\n    \'site.debug.js\': { template: \'embedPath\' },\n});</pre>\n    \n    <p>\n        Transform your files with <a href="http://underscorejs.org/#template" target="_blank">underscore.js templates</a>, \n        allowing you to enhance your debugging experience, embed stylesheets and templates and much more - any transformation you can think of.\n    </p>\n    \n    <p>Creating a template is as simple as creating a file that matches the pattern <span class="filename">*.template.*</span>.</p>\n    \n    <p>Let\'s create the \'embedPath\' template from the example above. Create a file called <span class="filename">embedPath.template.js</span>:</p>\n    <pre class="example">\n// <%= pathRelativeToConfig %>\n<%= content %>\n</pre>\n    \n    <p>Now each file will have a simple header containing the original path of the script, making it much easier to debug.</p>\n    \n    <p>Configuration is pure JavaScript - you can create variables and functions to reuse configuration and create conventions.</p> \n    \n    <p>PackScript comes with a number of built-in functions and templates to greatly simplify the packaging of your application.</p>\n    \n    <pre class="example">\npack([\n    T.panes(\'Panes\'),\n    T.scripts(\'Infrastructure\'),\n    T.styles(\'Styles\'),\n    T.templates(\'Templates\')\n]).to(T.webTargets(\'Build/site\');\n</pre>\n    \n    <p>\n        This example creates a set of three files, site.js, site.min.js and site.debug.js, a special debug version that recreates your\n        filesystem in supported browsers (Google Chrome and partial support for FireFox). Each file contains embedded Tribe panes, \n        infrastructure scripts, CSS and HTML templates.\n    </p>\n\n    <div class="tip">\n        <img src="Images/icon.tip.64.png"/>\n        <p>Why would I want to embed templates and stylesheets in JavaScript?</p>\n        <p>This provides a consistent way of loading resources and removes the need for you to write code to load templates.</p>\n        <p>\n            Perhaps more importantly, it allows you to deploy your resources to any server with no cross-domain issues. \n            You can even deploy your resources to a content delivery network (CDN) to maximise performance.\n        </p>\n        <div class="clear"></div>\n    </div>\n\n    <p>For more information, see the <a data-bind="click: Article.show(\'Reference\', \'PackScript/builtins\')">built-in functions reference</a>.</p>\n    \n    <p>\n        For a complete reference check out the <a data-bind="click: Article.show(\'Reference\', \'PackScript/operation\')">PackScript reference</a> or \n        <a href="http://packscript.com/" target="_blank">http://packscript.com/</a>.\n    </p>\n</div>', 'template--Content-Guides-Tutorials-packscript');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Creating Panes</h1>\n    \n    <p>\n        Panes can consist of a JavaScript model, HTML template and CSS stylesheet. Creating new panes is as\n        simple as creating files with corresponding extensions and referring to them by name.\n    </p>\n    \n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Creating\', initialFile: \'index.html\', rootPane: { path: \'/Samples/Panes/Creating/helloWorld\', data: { message: \'Test message.\' } } }"></div>\n    \n    <h2>Dynamically Injecting Panes</h2>\n    <p>Panes can be injected into the DOM dynamically. Here, we are creating a new pane every time the button is clicked.</p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Dynamic\', initialFile: \'create.js\', rootPane: \'create\' }"></div>\n    <p>For a full list of API functions, check out the <a data-bind="click: Article.show(\'Reference\', \'Core/api\')">API reference</a>.</p>\n</div>\n\n<div class="content block">\n    <h1>Communicating</h1>\n    <p>\n        Tribe provides a publish / subscribe engine for communication between panes and other components.\n    </p>\n    <p>\n        Using messages to communicate allows you to create autonomous, loosely decoupled components that\n        are extensible and easy to maintain.\n    </p>\n    <p>\n        You can also share observable objects between panes.\n    </p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Communicating\', initialFile: \'sender.js\', rootPane: \'layout\' }"></div>\n    <p>\n        \n    </p>\n    <div data-bind="pane: \'/Interface/tip\', data: { tip: \'Use \\\'namespaces\\\' in your message topics to prevent collisions as your application expands.\' }"></div>\n</div>\n\n<div class="content block">\n    <h1>Pane Lifecycle</h1>\n    <p>Each pane goes through a defined set of steps from ensuring resources are loaded, rendering and binding panes through to disposal.</p>\n    <p>You can perform actions when some of these events occur by declaring functions on your model.</p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Lifecycle\', initialFile: \'item.js\', rootPane: \'create\' }"></div>\n    <p>\n        For a full description of the pane lifecycle and events you can hook in to, check out the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/panes\')">panes reference</a>.\n    </p>\n</div>\n\n<div class="content block">\n    <h1>Navigating</h1>\n    <p>The Tribe navigation mechanism gives you a simple way to transition panes using smooth, hardware accelerated CSS transitions.</p>\n    <p>A navigation stack is maintained, allowing you to navigate back and forth through the stack.</p>\n    <div data-bind="pane: \'/Interface/sample\', data: { name: \'Panes/Navigating\', initialFile: \'layout.htm\', rootPane: \'layout\' }"></div>\n    <p>\n        You can easily hook into the browser history and provide custom URLs. See the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/panes\')">panes reference</a> for more information.\n    </p>\n    <p>\n        Any element or pane can be transitioned. See the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/transitions\')">transitions reference</a> for more information.\n    </p>\n</div>\n\n', 'template--Content-Guides-Tutorials-panes');

//
window.__appendTemplate('\n<div class="webmail content block">\n    <h1>Webmail Tutorial</h1>\n    <div data-bind="pane: \'/Interface/navigationContainer\', data: Tutorials.webmail"></div>\n</div>', 'template--Content-Guides-Tutorials-webmail');

//
window.__appendTemplate('\n<h2>Adding a Flow for Business Customers</h2>\n<p>Let\'s follow the same pattern we did for personal customers. It sure would be nice to reuse that contact pane!</p>\n\n<div data-bind="pane: \'/Interface/sample\', data: { name: \'CreditCard/2-Business\', initialFile: \'BusinessFlow.js\', rootPane: \'welcome\', handleNavigation: true }"></div>\n\n<p>\n    Success! Our business customer flow simply navigates to the <span class="filename">contact</span> pane and\n    handles the message it publishes.\n</p>\n\n<p>\n    Things are starting to look a little messy though, and we\'re clearly dealing with two separate concerns in our flows -\n    maintaining our business object and navigation.\n</p>\n\n<p>Next, we\'ll look at separating those concerns with some elegant results.</p>', 'template--Content-Guides-Tutorials-CreditCard-business');

//
window.__appendTemplate('\n<h2>Child Flows</h2>\n<p>Tribe gives us a neat way of expressing alternate flows.</p>\n\n<div data-bind="pane: \'/Interface/sample\', data: { name: \'CreditCard/4-Combined\', initialFile: \'CreditCardFlow.js\', rootPane: \'host\', handleNavigation: true }"></div>\n\n<p>\n    Our flow now encapsulates the entire navigation flow for the \n    application proces, started in the\n    <span class="filename">host</span> pane.\n</p>\n<p>\n    The new\n    <span class="filename">startBusiness</span> and\n    <span class="filename">startPersonal</span> messages,\n    published from the\n    <span class="filename">welcome</span> pane,\n    trigger alternate child flows within our main flow.\n    By default, these child flows will be ended whenever messages\n    are handled in the main flow.\n</p>\n\n<p>\n    We could also have modelled our main navigation flow this way\n    and kept our child flows separate by using the\n    <span class="filename">start</span> flow helper:\n</p>\n\n<div class="example"><span class="str">\'startBusiness\'</span><span class="pun">:</span><span class="pln"> flow</span><span class="pun">.</span><span class="pln">start</span><span class="pun">(</span><span class="typ">BusinessFlow</span><span class="pun">,</span><span class="pln"> details</span><span class="pun">)</span></div>\n\n<p>That\'s it for now! For more information, check out the\n    <a data-bind="click: Article.show(\'Reference\', \'PubSub/Saga\')">Saga</a> and\n    <a data-bind="click: Article.show(\'Reference\', \'Types/Flow\')">Flow</a> reference pages.\n</p>', 'template--Content-Guides-Tutorials-CreditCard-combined');

//
window.__appendTemplate('\n<p>\n    In this tutorial, we\'ll show you a simple and elegant way to model your navigation flow and business <br/>\n    processes while maximising reuse of your panes. We recommend you have a quick run through the <br/>\n    <a data-bind="click: Article.show(\'Guides\', \'Guides/webmail\')">webmail tutorial</a>\n    if you haven\'t already.\n</p>\n\n<h2>Message Driven Models</h2>\n<p>\n    Using message or event driven models gives us the ability to decouple our UI components from \n    concerns like navigation and other processes. Components can be expressed as small, autonomous \n    units, making them simpler to test and maintain.\n</p>\n\n<p>\n    It also gives us an ideal way of managing long running processes, and Tribe provides two mechanisms \n    for this - Sagas and Flows.\n</p>\n\n<h2>Sagas</h2>\n<p>\n    Sagas are roughly based around \n    <a href="http://support.nservicebus.com/customer/portal/articles/860458-sagas-in-nservicebus">NServiceBus sagas</a>\n    and provide a mechanism for maintaining state across processes that involve multiple application \n    events or messages.\n</p>\n\n<pre class="example">\nShoppingCartSaga = function (saga) {\n    var order = { products: [] };\n    this.handles = {\n        \'setCustomer\': function (customer) { order.customer = customer; },\n        \'addProduct\': function (product) { order.products.push(product); },\n        \'addPayment\': function (receipt) { \n            order.paymentReceipt = receipt;\n            saga.pubsub.publish(\'despatchOrder\', order);\n            saga.end();\n        },\n    };\n};</pre>\n\n<p>\n    Tribe also gives us the unique ability to seamlessly distribute messages across clients, allowing\n    synchronisation of these Sagas across multiple clients, both web and mobile.\n</p>\n\n<p>\n    Flows are special versions of sagas that attach to the closest navigation node in your application \n    and provide an additional API for modelling navigation flows.\n</p>\n\n<p>Let\'s build a simple application that captures details for credit card applications.</p>\n<p>Click the \'Next\' button in the top right to continue.</p>', 'template--Content-Guides-Tutorials-CreditCard-intro');

//
window.__appendTemplate('\n<h2>Our First Flow - Handling Personal Customers</h2>\n<p>For our first iteration, we\'ll have a go at adding a basic flow for personal customers.</p>\n\n<div data-bind="pane: \'/Interface/sample\', data: { name: \'CreditCard/1-Personal\', initialFile: \'PersonalFlow.js\', rootPane: \'welcome\', handleNavigation: true }"></div>\n\n<p>\n    Our application consists of our flow and a number of simple panes for \n    capturing and displaying data. The flow is relatively simple - handle\n    messages published by the data capture panes, attach the data to an \n    object and flow to the next pane in the process.\n</p>\n<p>\n    You\'ll notice the fourth line of code in PersonalFlow.js, \n    <span class="example">onstart: flow.to(\'personal\')</span>.    \n    flow.to is a special function called a <strong>flow helper</strong> \n    that you can use when defining your handlers. It delays a call to \n    navigate until the specified message is received. onstart and onend \n    are special properties you can add to your handlers. We\'ll see more \n    of these later. \n</p>\n<p>\n    You\'ll also notice in our two data collection panes, \n    <span class="filename">personal</span> and\n    <span class="filename">contact</span>, don\'t have a JavaScript model. \n    Tribe.Forms allows us to create forms that construct objects and \n    publish the result, complete with validation.\n</p>\n<p>\n    Next up, let\'s add a flow for business customers.\n</p>', 'template--Content-Guides-Tutorials-CreditCard-personal');

//
window.__appendTemplate('\n<h2>Separating Navigation and Business Processes</h2>\n<p>This time around, we\'ll separate the logic that manipulates our business object into a separate saga.</p>\n\n<div data-bind="pane: \'/Interface/sample\', data: { name: \'CreditCard/3-Saga\', initialFile: \'BusinessFlow.js\', rootPane: \'welcome\', handleNavigation: true }"></div>\n\n<p>\n    Our business customer flow is starting to look pretty nice. There\'s\n    another flow helper in there, <span class="filename">endsAt</span>.\n</p>\n<p>\n    You\'ll notice our flow is starting our \n    <span class="filename">CreditCard</span> saga. Additional arguments\n    we specify here are passed to the saga\'s constructor. This saga\'s lifetime\n    is bound to the flow and will end when the flow is ended.\n</p>\n\n<p>Looking at \n    <span class="filename">CreditCard.js</span>, you\'ll see the task of \n    maintaining our business object is neatly separated into it\'s own saga.\n    This is a powerful design that allows business objects to be seamlessly \n    synchronised across multiple clients, both web and mobile, with Tribe.MessageHub.\n</p>\n\n<p>\n    Flows give us some neat flexibility in how we structure our handlers.\n    Next, we\'ll combine our personal and business customer flows into\n    a single flow.\n</p>\n', 'template--Content-Guides-Tutorials-CreditCard-saga');

//
window.__appendTemplate('\n<h2>Navigating to Mail Content</h2>\n<p>Let\'s add a pane for displaying mail content that is displayed when an email is clicked.</p>\n<div class="fixedHeight" data-bind="pane: \'/Interface/sample\', data: { name: \'Webmail/3-Content\', initialFile: \'mails.js\', rootPane: \'layout\' }"></div>\n\n<p>\n    That\'s it! To find out more about modelling your navigation flows and other business processes,\n    check out the <a data-bind="click: Article.show(\'Guides\', \'Tutorials/creditcard\')">process modelling tutorial</a>.\n</p>', 'template--Content-Guides-Tutorials-Webmail-content');

//
window.__appendTemplate('\n<h2></h2>\n<p>\n    In this tutorial, we will create a simple webmail system that loads JSON data from a server.\n</p>\n<p>\n    If you are not familiar with <a href="http://knockoutjs.com" target="_blank">knockout</a>, \n    we highly recommend you check out the <a href="http://learn.knockoutjs.com" target="_blank">tutorials.</a>\n</p>\n\n<h2>Folder Navigation Bar</h2>\n<p>First up, let\'s create a simple horizontal folder list to sit at the top of the screen.</p>\n<div data-bind="pane: \'/Interface/sample\', data: { name: \'Webmail/1-Folders\', initialFile: \'folders.js\', rootPane: \'folders\' }"></div>', 'template--Content-Guides-Tutorials-Webmail-folders');

//
window.__appendTemplate('\n<h2>Adding a List of Mail</h2>\n<p>Let\'s add a pane called \'mails\' to display the list of mails in the selected folder and a layout pane.</p>\n<div class="fixedHeight" data-bind="pane: \'/Interface/sample\', data: { name: \'Webmail/2-Mails\', initialFile: \'layout.htm\', rootPane: \'layout\' }"></div>\n', 'template--Content-Guides-Tutorials-Webmail-mails');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Core API</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.API }"></div>\n</div>', 'template--Content-Reference-Core-api');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Binding Handlers</h1>\n    <p>As well as the <span class="filename">pane</span> binding handler, Tribe provides the following additional handlers:</p>\n\n    <div data-bind="foreach: Reference.BindingHandlers">\n        <div class="child">\n            <h1 data-bind="text: name"></h1>\n            <p data-bind="text: description"></p>\n            <div data-bind="pane: \'/Interface/API/table\', data: bindings"></div>\n            <h2>Example</h2>\n            <pre class="example" data-bind="text: example"></pre>\n        </div>\n    </div>    \n</div>', 'template--Content-Reference-Core-bindingHandlers');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Global Options</h1>\n    <p>Global options can be set on the TC.options object.</p>\n    <pre class="example">TC.options.basePath = \'Panes\';</pre>\n    <table>\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Type</th>\n                <th>Default</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>basePath</td>\n                <td>String</td>\n                <td></td>\n                <td>Root path to load panes from</td>\n            </tr>\n            <tr>\n                <td>synchronous</td>\n                <td>Boolean</td>\n                <td>false</td>\n                <td>Load resources and execute message subscribers synchronously</td>\n            </tr>\n            <tr>\n                <td>handleExceptions</td>\n                <td>Boolean</td>\n                <td>true</td>\n                <td>Handle exceptions within the framework</td>\n            </tr>\n            <tr>\n                <td>loadStrategy</td>\n                <td>String</td>\n                <td>adhoc</td>\n                <td>Name of the registered load strategy to use</td>\n            </tr>\n            <tr>\n                <td>events</td>\n                <td>[String]</td>\n                <td><a data-bind="click: Article.show(\'Reference\', \'Core/panes\')">See reference</a></td>\n                <td>Array of ordered event names to execute in the pane rendering pipeline</td>\n            </tr>\n        </tbody>\n    </table>\n</div>', 'template--Content-Reference-Core-options');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Pane Options</h1>\n    <p>\n        Panes can be created using the pane binding handler or with JavaScript using the \n        <a data-bind="click: Article.show(\'Reference\', \'Core/api\')">core API functions</a>.\n    </p>\n    <pre class="example">&lt;div data-bind="pane: \'path/to/pane\', data: { value: 1 }, handlesNavigation: true">&lt;/div></pre>\n    <p>\n        When created this way, each pane is encapsulated within a Node object that is\n        inserted into the appropriate position in an underlying node tree.\n    </p>\n\n    <p>The following bindings can be used:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.Panes.options }"></div>\n\n    <p>When using API functions, pass these options as an object and provide a path property:</p>\n    <pre class="example">TC.createNode(\'body\', { path: \'path/to/pane\', data: { value: 1 }, handlesNavigation: true });</pre>\n\n    <div class="tip">\n        <img src="Images/icon.tip.64.png"/>\n        <p>\n            If you\'re using Chrome and running Tribe from a \n            <span class="filename">file://</span> URL, you must start Chrome with the\n            <span class="filename">--allow-file-access-from-files</span> options.\n        </p>\n        <div class="clear"></div>\n    </div>\n</div>\n\n<div class="content block">\n    <h1>Navigation Panes</h1>\n    <p>\n        By default, when <span class="filename">pane.navigate</span> is called,\n        the root node is transitioned. You can specify which node to transition\n        by using the handlesNavigation pane option.\n    </p>\n    <p>\n        Passing a string to the handlesNavigation pane option specifies the name\n        of the transition to use.\n    </p>\n    <pre class="example">&lt;div data-bind="pane: \'path/to/pane\', handlesNavigation: \'fade\'">&lt;/div></pre>\n    <p>When passing an object, the following options can be used:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.Panes.NavigationOptions }"></div>\n    <pre class="example">&lt;div data-bind="pane: \'path/to/pane\', handlesNavigation: { transition: \'slideLeft\', browser: true }">&lt;/div></pre>\n    <p>\n        Multiple navigation nodes can be specified. The closest parent navigation\n        node will be transitioned on navigation. However, the \n        <span class="filename">browser</span> option can only be specified once \n        per application.\n    </p>\n</div>\n\n<div class="content block">\n    <h1>Pane Lifecycle</h1>\n    <p>The following events are executed in order against each pane:</p>\n    <table>\n        <thead>\n            <tr>\n                <th>Event</th>\n                <th>Description</th>\n                <th>Model Function</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>loadResources</td>\n                <td>HTML, JS and CSS resources for the pane are loaded if required</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>createPubSub</td>\n                <td>A Tribe.PubSub object is created and attached to the pane</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>createModel</td>\n                <td>The appropriate model is instantiated and attached to the pane</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>initialiseModel</td>\n                <td>The initialise function is called on the pane</td>\n                <td>initialise</td>\n            </tr>\n            <tr>\n                <td>renderPane</td>\n                <td>The pane template is rendered in the target element and the model is bound</td>\n                <td>paneRendered</td>\n            </tr>\n            <tr>\n                <td>renderComplete</td>\n                <td>The renderComplete function is called on the pane when all panes in the render operation have been rendered</td>\n                <td>renderComplete</td>\n            </tr>\n            <tr>\n                <td>active</td>\n                <td>The pane is active</td>\n                <td></td>\n            </tr>\n            <tr>\n                <td>dispose</td>\n                <td>The pane\'s element has been removed from the DOM. Resources for the pane such as pubsub subscriptions are cleaned up</td>\n                <td>dispose</td>\n            </tr>\n        </tbody>\n    </table>\n    <p>The specified model functions are executed at the end of the event when they are implemented on pane models.</p>\n</div>', 'template--Content-Reference-Core-panes');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Transitions</h1>\n\n    <p>Use the TC.transition function to perform transitions:</p>\n    <div data-bind="pane: \'/Interface/API/function\', data: Reference.Transition"></div>\n\n    <p>The returned object can be used to transition the target in, out or to another pane:</p>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Transition.Functions }"></div>\n    \n    <div class="tip">\n        <img src="Images/icon.tip.64.png"/>\n        <p>To support Internet Explorer 8 and below, the <span class="filename">in</span> function must be called using the syntax in the example below.</p>\n        <div class="clear"></div>\n    </div>\n\n    <div class="child">\n        <h1>Examples</h1>\n\n        <p>Fade the first element with a class of "target" out of view and remove it from the DOM</p>\n        <pre class="example">\nTC.transition(\'.target\', \'fade\').out();</pre>\n\n        <p>Transition the node containing the element with a class of "target" to a new pane</p>\n        <pre class="example">\nTC.transition(TC.nodeFor(\'.target\')).to(\'path/to/pane\');</pre>\n\n        <p>This can also be expressed as:</p>\n        <pre class="example">\nTC.nodeFor(\'.target\').transitionTo(\'path/to/pane\');</pre>\n\n        <p>Supporting IE8 and below:</p>\n        <pre class="example">\nTC.transition(\'.target\')[\'in\']();</pre>\n    </div>\n</div>', 'template--Content-Reference-Core-transitions');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>MessageHub Client API</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.MessageHub }"></div>\n    <div class="child">\n        <h1>joinChannel Options</h1>\n        <p>An object containing any of the following options can be passed to the TMH.joinChannel function.</p>\n        <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.MessageHub.ChannelOptions }"></div>\n    </div>\n</div>', 'template--Content-Reference-MessageHub-client');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>MessageHub Server Configuration API</h1>\n    \n    <p>\n        Configuration must start with ConfigureHub.With() followed by a container configuration.\n        Currently only Unity is supported.\n    </p>\n    <pre class="example">\nusing Tribe.MessageHub.Core.Configuration;\nusing Tribe.MessageHub.Containers.Unity;\n\nConfigureHub.With().Unity(container).StartHub();</pre>\n    \n    <p>The following extension methods are then provided, all chainable:</p>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.MessageHub.Server }"></div>\n    \n    <pre class="example">\nusing Tribe.MessageHub.Core.Configuration;\nusing Tribe.MessageHub.Containers.Unity;\nusing Tribe.MessageHub.ChannelPersisters.SqlServer;\nusing Tribe.MessageHub.Buses.NServiceBus;\n\nConfigureHub.With()\n    .Unity(container)\n    .ChannelAuthoriser&lt;MyChannelAuthoriser>()\n    .SqlServerPersistence("Data Source=.;Initial Catalog=Tribe.Channels;Integrated Security=true")\n    .NServiceBus(bus)\n    .MessagesFrom(typeof(ExampleMessage).Assembly)\n    .StartHub();</pre>\n</div>', 'template--Content-Reference-MessageHub-configuration');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Built-in Functions and Templates</h1>\n    <p>\n        PackScript provides a number of built-in configuration functions and templates to make\n        building and debugging your Tribe applications much easier.\n    </p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.Builtin.functions"></div>\n    \n    <p>Each of these functions accepts the following arguments:</p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.Builtin.arguments"></div>\n\n    <p>An object consisting of the following properties can be passed to these functions:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.Builtin.options }"></div>\n    \n    <p>\n        PackScript also provides a number of other helper functions that help you deal with different versions of files.\n        Pass these functions a file path but omit the extension. The appropriate extensions will be added.\n    </p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.Builtin.helpers"></div>\n    \n    <h2>Examples</h2>\n    <p>\n        A simple project structure. This creates three files, site.js, site.min.js and site.debug.js. \n        It merges in the appropriate version of a script located in the Libraries directory -\n        either dependency.js, dependency.min.js or dependency.debug.js.\n    </p>\n    <pre class="example">\npack([\n    T.panes(\'Panes\'),\n    T.scripts(\'Infrastructure\'),\n    T.templates(\'Templates\'),\n    T.styles(\'Css\'),\n    T.webDependency(\'Libraries/dependency\')\n]).to(T.webTargets(\'Build/site\');</pre>\n</div>', 'template--Content-Reference-PackScript-builtins');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Including and Excluding Sets of Files</h1>\n    <p>\n        The include and exclude options are available when using the pack, sync or zip commands.\n        Files can be specified as simple string specifications, as an object or an array of both.\n        Options available are:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.includeOptions }"></div>\n    <p>Options such as recursive and template override the values set in the main configuration.</p>\n\n    <h2>Examples</h2>\n    <p>A simple string specification.</p>\n    <pre class="example">\ninclude: \'Scripts/*.js\'</pre>\n\n    <p>As an object that specifies additional options.</p>\n    <pre class="example">\ninclude: { files: \'Templates/*.htm\', template: \'embedTemplate\' }</pre>\n\n    <p>A more complex example.</p>\n    <pre class="example">\npack({\n    to: \'Build/site.js\',\n    include: [\n        { \n            files: \'Scripts/*.js\', \n            template: { name: \'sourceUrl\', data: { prefix: \'/Source/\' } },\n            first: \'intro.js\',\n            last: \'outro.js\',\n            recursive: false\n        }, {\n        { \n            files: \'Templates/*.htm\', \n            template: \'embedTemplate\' \n        }, {\n            files: \'Styles/*.css\',\n            template: \'embedCss\'\n        }\n    ],\n    exclude: \'*.debug.js\',\n    outputTemplate: \'license\',\n    recursive: true,\n    minify: true\n});</pre>\n</div>', 'template--Content-Reference-PackScript-includes');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Running PackScript</h1>\n    <p>\n        PackScript is distributed as a Windows console application. A node.js version will be released in\n        the near future. PackScript binaries can be obtained from \n        <a href="https://github.com/danderson00/PackScript" target="_blank">github</a> and\n        are included in the Tribe <a href="http://danderson00.github.io/Tribe/Tribe.zip">download</a>.\n    </p>\n    \n    <p>\n        PackScript.exe has the following command line syntax:\n    </p>\n\n    <pre class="example">PackScript.exe ["Directory\\To\\Process"] [/option[:value]]</pre>\n    \n    <p>The following options can be specified:</p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PackScript.options"></div>\n    <p>If a value is not provided for an option, true will be used.</p>\n    <p>If no directory is specified, the current working directory is used.</p>\n    <p>Options can also be specified as appSettings in PackScript.exe.config.</p>\n    <p>All options specified are available in JavaScript through the pack.options object.</p>\n    <p>When in watch mode, the console can also be used to interrogate or execute JavaScript members.</p>\n\n    <h2>Configuration Files</h2>\n    <p>\n        PackScript scans recursively through the target directory structure and finds all files \n        fitting the following specifications:\n    </p>\n    <table>\n        <tbody>\n            <tr>\n                <td>*pack.config.js</td>\n                <td>JavaScript configuration files. These are executed before any other file is processed.</td>\n            </tr>\n            <tr>\n                <td>*pack.js</td>\n                <td>JavaScript configuration files.</td>\n            </tr>\n            <tr>\n                <td>*.template.*</td>\n                <td>These files are loaded as templates and can be accessed by name using the template option.</td>\n            </tr>\n        </tbody>\n    </table>\n    \n    <p>Create output files by executing the following functions in your configuration files:</p>\n    <table class="pointer">\n        <tbody data-bind="foreach: Reference.PackScript.functions">\n            <tr data-bind="click: Article.show(\'Reference\', \'PackScript/\' + name)">\n                <td data-bind="text: name"></td>\n                <td data-bind="text: description"></td>\n            </tr>\n        </tbody>\n    </table>\n</div>', 'template--Content-Reference-PackScript-operation');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>pack(options[, options, ...])</h1>\n    <p>\n        The pack function is used to combine and transform sets of files into a single output.\n        The following options can be used:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.pack }"></div>\n\n    <pre class="example">\npack({\n    to: \'Build/site.min.js\',\n    include: \'*.js\',\n    exclude: \'debug.js\',\n    minify: true\n});</pre>\n\n    <p>You can also pass the pack function a string or an array. These are translated into the include option specified above.</p>\n    <p>The pack function returns an object that exposes a function called \'to\'.</p>\n\n    <h2>to(options)</h2>\n    <p>\n        The to function attaches options to outputs defined by the preceding call to the pack function.\n        It has two formats:\n    </p>\n    \n    <pre class="example">\npack(\'*.js\').to(\'combined.js\');</pre>\n    <p>Passing a string simply attaches a \'to\' option to the existing output.</p>\n    \n    <pre class="example">\npack(\'*.js\').to({\n    \'combined.js\': { },\n    \'combined.min.js\': { minify: true }\n});</pre>\n    <p>\n        Passing a hashtable of paths and additional options creates multiple outputs. \n        The additional options are merged with those specified in the call to pack.\n    </p>\n\n    <h2>Examples</h2>\n    <p>\n        This example combines JavaScript files from the Scripts and Libraries folder into two files, \n        one simply combined and the other prepared for production. A template called license is applied\n        to each file.\n    </p>\n    <pre class="example">\npack({\n    include: [\n        { files: \'Scripts/*.js\', recursive: true },\n        \'Libraries/*.min.js\'\n    ],\n    outputTemplate: \'license\'\n}).to({\n    \'Build/site.js\': { },\n    \'Build/site.min.js\': { minify: true, exclude: \'*debug.js\' }\n});</pre>\n\n    <p>\n        This example embeds all panes, infrastructure scripts, additional templates and styles\n        from their respective folders into a set of three files, combined, minified and a\n        special debug mode.\n    </p>\n    <pre class="example">\npack({\n    include: [\n        T.panes(\'Panes\'),\n        T.scripts(\'Infrastructure\'),\n        T.templates(\'Templates\'),\n        T.styles(\'Styles\')\n    ],\n    recursive: true\n}).to({\n    \'Build/site.js\': { },\n    \'Build/site.min.js\': { minify: true }\n    \'Build/site.debug.js\': { debug: true }\n});</pre>\n    <p>\n        See the \n        <a data-bind="click: Article.show(\'Reference\', \'PackScript/builtins\')">\n            built-in templates reference\n        </a>\n        for more information.\n    </p>\n</div>', 'template--Content-Reference-PackScript-pack');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>sync(options[, options, ...])</h1>\n    <p>\n        The sync function is used to synchronise files from one location to another.\n        The following options can be used:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.sync }"></div>\n    <p>\n        Similar to the \n        <a data-bind="click: Article.show(\'Reference\', \'PackScript/pack\')">pack function</a>, \n        the sync function returns an object containing a function called \'to\'.\n    </p>\n\n    <h2>Examples</h2>\n\n    <p>This simple example keeps a local Libraries folder in sync with an external source.</p>\n    <pre class="example">\nsync(\'../../Libraries/*.js\').to(\'Libraries\');</pre>\n    \n    <p>You can keep a number of target folders synchronised.</p>\n    <pre class="example">\nsync(\'Libraries/*.js\').to({\n    \'Site1/Scripts\': { },\n    \'Site2/Scripts\': { }\n});</pre>\n\n    <p>\n        Here, we are keeping a master build folder synchronised with individual components.\n        The folder structure underneath each included path is preserved.\n    </p>\n    <pre class="example">\nsync({\n    to: \'Build\',\n    include: [\n        \'Component1/Build/*.js\',\n        \'Component2/Client/Build/*.js\'\n    ],\n    exclude: \'debug.js\',\n    recursive: true\n});</pre>\n</div>\n', 'template--Content-Reference-PackScript-sync');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Templates</h1>\n    <p>\n        PackScript includes powerful templating functionality based on \n        <a href="http://underscorejs.org/#template" target="_blank">underscore.js templates</a>.\n    </p>\n    \n    <p>\n        PackScript scans the target folder recursively for files with names matching the filespec <strong>*.template.*</strong>.\n        These templates are made available to the pack function.\n    </p>\n\n\n    <h2>Example</h2>\n    <p>\n        Let\'s define a simple template that appends a \n        <a href="https://developers.google.com/chrome-developer-tools/docs/javascript-debugging#breakpoints-dynamic-javascript" target="__blank">sourceUrl tag</a> \n        to scripts. We\'ll give this a filename of <strong>sourceUrl.template.js</strong>.\n        This file can be placed anywhere under the directory being processed by PackScript.\n    </p>\n    <pre class="example">\n<%= content %>\n//@ sourceURL=<%= data.prefix %><%= pathRelativeToConfig %></pre>\n    \n    <p>This template can then be used in the template option of the pack function:</p>    \n    <pre class="example">\npack({\n    to: \'Build/site.js\',\n    include: \'*.js\',\n    template: {\n        name: \'sourceUrl\',\n        data: { prefix: \'/Source/\' }\n    }\n});</pre>    \n    <p></p>\n\n    <p>From within templates, the following properties are available:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.templateProperties }"></div>\n    <p>Only the content, data, configPath, output and target properties are available when the outputTemplate option is used.</p>\n</div>', 'template--Content-Reference-PackScript-templates');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>zip(options[, options, ...])</h1>\n    <p>\n        The zip function is used to create a compressed file in ZIP format.\n        The following options can be used:\n    </p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PackScript.zip }"></div>\n        <p>\n        Similar to the \n        <a data-bind="click: Article.show(\'Reference\', \'PackScript/pack\')">pack function</a>, \n        the sync function returns an object containing a function called \'to\'.\n    </p>\n\n    <h2>Examples</h2>\n    <p>A simple flat ZIP file.</p>\n    <pre class="example">\nzip(\'Build/*.*\').to(\'Build.zip\');</pre>\n\n    <p>This compresses the entire directory structure underneath the Build directory to Content/Build.zip.</p>\n    <pre class="example">\nzip({\n    to: \'Content/Build.zip\',\n    include: \'Build/*.*\',\n    recursive: true\n});</pre>\n</div>', 'template--Content-Reference-PackScript-zip');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.PubSub"></div>', 'template--Content-Reference-PubSub-core');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Message Envelopes</h1>\n    <p>Message envelopes may contain the following properties:</p>\n    <div data-bind="pane: \'/Interface/API/propertyList\', data: { properties: Reference.PubSub.Envelopes }"></div>\n</div>', 'template--Content-Reference-PubSub-envelopes');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Global Options</h1>\n    <p>Global options can be set on the Tribe.PubSub.options object.</p>\n    <pre class="example">Tribe.PubSub.options.sync = true;</pre>\n    <table>\n        <thead>\n            <tr>\n                <th>Name</th>\n                <th>Type</th>\n                <th>Default</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr>\n                <td>sync</td>\n                <td>Boolean</td>\n                <td>false</td>\n                <td>Execute message handlers synchronously.</td>\n            </tr>\n            <tr>\n                <td>handleExceptions</td>\n                <td>Boolean</td>\n                <td>true</td>\n                <td>Wrap handler functions in a try..catch block.</td>\n            </tr>\n            <tr>\n                <td>exceptionHandler</td>\n                <td>Function(error, envelope)</td>\n                <td>undefined</td>\n                <td>A function to execute when exceptions occur. Only executed if handleExceptions is false.</td>\n            </tr>\n        </tbody>\n    </table>\n</div>', 'template--Content-Reference-PubSub-options');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.PubSub.Saga"></div>\n\n<div class="content block">\n    <h1>Saga Definitions</h1>\n    <p>Sagas are defined by creating a constructor function:</p>\n    <pre class="example">\nfunction MySaga(saga, args, ...) { }</pre>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PubSub.Saga.Definition.arguments"></div>\n    \n    <p>The object can expose the following properties:</p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.PubSub.Saga.Definition.properties"></div>\n    \n    <pre class="example">\nfunction MySaga(saga, argument1, argument2) {\n    var details = { property1: argument1, property2: argument2 };\n    this.handles = {\n        \'messageTopic1\': function(messageData) {\n            details.property3 = messageData.property;\n        },\n        \'startChildTopic\': {\n            \'messageTopic2\': messageTopic2Handler\n        },\n        \'endSagaTopic\': saga.end\n    };\n        \n    this.endsChildrenExplicitly = true;\n        \n    function messageTopic2Handler(messageData)\n    {\n        details.property4 = messageData.property;\n    }\n}\n</pre>\n</div>', 'template--Content-Reference-PubSub-Saga');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Flow"></div>\n\n<div class="content block">\n    <h1>Flow Helpers</h1>\n    \n    <p>The Flow object exposes a number of functions to simplify handler definitions.</p>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Types.Flow.helpers }"></div>\n</div>\n\n<div class="content block">\n    <h1>Flow Definitions</h1>\n    <p>Flows are defined by creating a constructor function:</p>\n    <pre class="example">\nfunction MyNavigationFlow(flow, args, ...) { }</pre>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.Types.Flow.Definition.arguments"></div>\n\n    <p>The object can expose the following properties:</p>\n    <div data-bind="pane: \'/Interface/API/table\', data: Reference.Types.Flow.Definition.properties"></div>\n    \n    <pre class="example">\nfunction MyNavigationFlow(flow, argument1, argument2) {\n    this.handles = {\n        onstart: flow.to(\'startPane\'),\n        \'messageTopic\': flow.to(\'anotherPane\', argument1),\n        \'startChildTopic\': {\n            \'customHandler\': function(messageData) {\n                flow.navigate(\'anotherPane\', messageData.property);\n            }\n        },\n        \'endFlowTopic\': flow.endsAt(\'endPane\')\n    };\n        \n    this.endsChildrenExplicitly = true;\n}\n</pre>\n</div>', 'template--Content-Reference-Types-Flow');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.History"></div>', 'template--Content-Reference-Types-History');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Loader"></div>', 'template--Content-Reference-Types-Loader');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Logger"></div>', 'template--Content-Reference-Types-Logger');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Models"></div>', 'template--Content-Reference-Types-Models');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Node"></div>', 'template--Content-Reference-Types-Node');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Operation"></div>', 'template--Content-Reference-Types-Operation');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Pane"></div>', 'template--Content-Reference-Types-Pane');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Pipeline"></div>', 'template--Content-Reference-Types-Pipeline');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Interface/API/type\', data: Reference.Types.Templates"></div>', 'template--Content-Reference-Types-Templates');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Collections</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Collections }"></div>\n</div>', 'template--Content-Reference-Utilities-collections');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Embedded State</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.EmbeddedState }"></div>\n</div>\n', 'template--Content-Reference-Utilities-embeddedState');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Events</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Events }"></div>\n</div>', 'template--Content-Reference-Utilities-events');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Miscellaneous</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Misc }"></div>\n</div>\n', 'template--Content-Reference-Utilities-misc');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Objects</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Objects }"></div>\n</div>', 'template--Content-Reference-Utilities-objects');

//
window.__appendTemplate('\n<div>\n</div>', 'template--Content-Reference-Utilities-packScript');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Panes</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Utilities.Panes }"></div>\n</div>', 'template--Content-Reference-Utilities-panes');

//
window.__appendTemplate('\n<div class="content block">\n    <h1>Paths</h1>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Path }"></div>\n    <p>Functions attached to the returned object are described below.</p>\n    <div data-bind="pane: \'/Interface/API/functionList\', data: { functions: Reference.Path.Functions }"></div>\n</div>\n', 'template--Content-Reference-Utilities-paths');

//
window.__appendTemplate('\n<div data-bind="pane: panePath">\n</div>', 'template--Interface-content');

//
window.__appendTemplate('\n<div class="dialogBackgroundFilter"></div>\n<div class="feedback block">\n    <div class="success" data-bind="visible: success">\n        <div><div><h1>Thanks!</h1></div></div>\n    </div>\n\n    <h1>Feedback</h1>\n    <p>You can \n        <a href="https://twitter.com/intent/tweet?screen_name=tribejs" class="twitter-mention-button">Tweet to @tribejs</a>,\n        email <a href="mailto: tribejs@gmail.com">tribejs@gmail.com</a>,\n        or enter your comments in the text box below. If you provide an email address, we will do our best to get back to you.\n    </p>\n    \n    <div>\n        <span>Email:</span>\n        <input data-bind="value: email" />\n    </div>\n    \n    <textarea data-bind="value: comments"></textarea>\n    \n    <div>\n        <button class="large" data-bind="validatedClick: submit">Submit</button>\n        <button class="large" data-bind="click: close">Close</button>\n    </div>\n    \n    <div class="failure" data-bind="visible: success() === false">The feedback could not be sent.</div>\n</div>', 'template--Interface-feedback');

//
window.__appendTemplate('\n<div class="footer content">\n    The Tribe platform and all resources on this website are licensed under the <a target="_blank" href="http://opensource.org/licenses/mit-license.php">MIT license</a>, except where specified, and portions\n    copyright <a href="knockoutjs.com" target="_blank">knockoutjs.com</a>.\n</div>', 'template--Interface-footer');

//
window.__appendTemplate('\n<div class="header">\n    <div class="background"></div>\n    \n    <div class="content">\n        <div class="logo" data-bind="click: Article.show(\'About\', \'home\')">tribe</div>\n        <div class="buttons">\n            <span data-bind="click: Article.show(\'Guides\', \'Introduction/getStarted\')">Get Started</span>\n            <span data-bind="click: Article.show(\'About\', \'guides\')">Guides</span>\n            <span data-bind="click: Article.show(\'Reference\', \'Core/panes\')">Reference</span>\n            <!--<a href="http://danderson00.github.io/Tribe/Reference/tests.html" target="_blank"><span>Tests</span></a>-->\n            <a href="https://github.com/danderson00/Tribe" target="_blank"><span>Source</span></a>\n            <span data-bind="click: feedback">Feedback</span>\n        </div>\n    </div>\n</div>', 'template--Interface-header');

//
window.__appendTemplate('\n<div data-bind="pane: \'header\'"></div>\n<div data-bind="pane: \'main\'"></div>\n<div data-bind="pane: \'footer\'"></div>', 'template--Interface-layout');

//
window.__appendTemplate('\n<div data-bind="pane: \'navigation\'"></div>\n<div data-bind="pane: { path: \'content\', data: { section: \'About\', topic: \'home\' }, handlesNavigation: { transition: \'fade\', browser: articleUrlProvider } }"></div>', 'template--Interface-main');

//
window.__appendTemplate('\n<div class="navigation">\n    <ul data-bind="foreach: items">\n        <li data-bind="click: $root.showSection, css: { selectedItem: $data.topic === $root.selectedTopic() }">\n            <span data-bind="text: $data.displayText"></span>\n        </li>\n        <ul data-bind="visible: $data.key === $root.selectedParent(), foreach: $data.items">\n            <li data-bind="click: $root.showArticle, text: $data.displayText, css: { selectedItem: $data.topic === $root.selectedTopic() }"></li>\n        </ul>\n    </ul>\n    <div class="clear"></div>\n</div>', 'template--Interface-navigation');

//
window.__appendTemplate('\n<div class="navigationContainer">\n    <ul>\n        <li data-bind="click: back, visible: !atStart()">Back</li>\n        <li data-bind="click: next, visible: !atEnd()">Next</li>\n    </ul>\n    <div data-bind="pane: initialPane, handlesNavigation: \'fade\'"></div>\n</div>', 'template--Interface-navigationContainer');

//
window.__appendTemplate('\n<div class="sample">\n    <div class="source">\n        <div class="title">Source</div>\n\n        <ul class="fileList" data-bind="foreach: files">\n            <li data-bind="click: $root.selectFile, css: { selectedFile: $root.selectedFile() === $data }">\n                <img data-bind="attr: { src: icon }" />\n                <span data-bind="text: filename"></span>\n            </li>\n        </ul>\n\n        <div class="fileContent" data-bind="html: selectedFile().content"></div>\n    </div>\n\n    <div class="result">\n        <div class="title">Result</div>\n        <div class="samplePane">\n            <div data-bind="pane: samplePane, handlesNavigation: handleNavigation"></div>\n        </div>\n    </div>\n</div>\n', 'template--Interface-sample');

//
window.__appendTemplate('\n<div class="tip">\n    <img src="Images/icon.tip.64.png"/>\n    <p>\n        <b>TIP:</b> <span data-bind="text: pane.data.tip"></span>\n    </p>\n    <div class="clear"></div>\n</div>\n', 'template--Interface-tip');

//
window.__appendTemplate('\n<div data-bind="pane: \'function\', data: func">\n</div>', 'template--Interface-API-constructor');

//
window.__appendTemplate('\n<div class="function child">\n    <h1>\n        <span data-bind="text: f.name"></span>(<span data-bind="text: argumentNames"></span>)\n        <span class="returns" data-bind="visible: f.returns">Returns: <span class="type" data-bind="text: f.returns"></span></span>\n    </h1>\n    <p data-bind="html: f.description"></p>\n\n    <table data-bind="visible: f.arguments && f.arguments.length > 0">\n        <thead>\n            <tr>\n                <th>Argument</th>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n        </thead>\n        <tbody data-bind="foreach: f.arguments">\n            <tr>\n                <td data-bind="text: $data.name"></td>\n                <td data-bind="text: $data.type"></td>\n                <td data-bind="html: $data.description"></td>\n            </tr>\n        </tbody>\n    </table>\n    \n    <div data-bind="foreach: f.examples">\n        <div class="example">\n            <p data-bind="text: description"></p>\n            <pre data-bind="text: code"></pre>\n            <p>Result:</p>\n            <pre data-bind="text: result"></pre>\n        </div>\n    </div>\n</div>', 'template--Interface-API-function');

//
window.__appendTemplate('\n<div data-bind="foreach: pane.data.functions">\n    <div data-bind="pane: \'function\', data: $data"></div>\n</div>', 'template--Interface-API-functionList');

//
window.__appendTemplate('\n<table class="propertyList" data-bind="visible: pane.data.properties && pane.data.properties.length > 0">\n    <thead>\n        <tr>\n            <th>Property</th>\n            <th>Type</th>\n            <th>Description</th>\n        </tr>\n    </thead>\n    <tbody data-bind="foreach: pane.data.properties">\n        <tr>\n            <td data-bind="text: $data.name"></td>\n            <td data-bind="text: $data.type"></td>\n            <td data-bind="html: $data.description"></td>\n        </tr>\n    </tbody>\n</table>', 'template--Interface-API-propertyList');

//
window.__appendTemplate('\n<table>\n    <thead>\n        <tr data-bind="foreach: columns">\n            <th data-bind="text: $data"></th>\n        </tr>\n    </thead>\n    <tbody data-bind="foreach: rows">\n        <tr data-bind="foreach: $data">\n            <td data-bind="html: $data"></td>\n        </tr>\n    </tbody>\n</table>', 'template--Interface-API-table');

//
window.__appendTemplate('\n<div class="content block">\n    <h1 data-bind="text: t.name"></h1>\n    <p data-bind="text: t.description"></p>\n    <div data-bind="pane: \'constructor\', data: t"></div>\n</div>\n\n<div class="content block" data-bind="visible: t.properties">\n    <h1>Properties</h1>\n    <div data-bind="pane: \'propertyList\', data: { properties: t.properties }"></div>\n</div>\n\n<div class="content block" data-bind="visible: t.functions">\n    <h1>Functions</h1>\n    <div data-bind="pane: \'functionList\', data: { functions: t.functions }"></div>\n</div>', 'template--Interface-API-type');

//
window.__appendTemplate('\n<div data-bind="pane: \'/Mobile/main\', data: { pane: \'/About/Mobile/welcome\' }"></div>', 'template--Samples-mobile');

//
window.__appendTemplate('\n<div data-bind="pane: \'sender\'"></div>\n<div data-bind="pane: \'messages\'"></div>', 'template--Samples-About-Chat-chat');

//
window.__appendTemplate('\n<ul class="messages" data-bind="foreach: messages">\n    <li>\n        <span data-bind="text: name"></span>:\n        <span data-bind="text: message"></span>\n    </li>\n</ul>\n', 'template--Samples-About-Chat-messages');

//
window.__appendTemplate('\n<div class="chat">\n    <div>\n        Name: <input data-bind="value: name" />    \n    </div>\n\n    <div>\n        Message: <input data-bind="value: message" />\n        <button data-bind="click: send">Send</button>\n    </div>\n</div>', 'template--Samples-About-Chat-sender');

//
window.__appendTemplate('\n<!-- Let\'s reuse our panes from the previous example -->\n<ul class="rounded">\n    <li data-bind="pane: \'../Chat/sender\'"></li>\n    <li data-bind="pane: \'../Chat/messages\'"></li>\n</ul>', 'template--Samples-About-Mobile-chat');

//
window.__appendTemplate('\n<ul><li>You selected an item in the list...</li></ul>\n<ul><li>Click the back button to go back.</li></ul>\n', 'template--Samples-About-Mobile-navigate');

//
window.__appendTemplate('\n<ul>\n    <li>One</li>\n    <li>Two</li>\n    <li>Three</li>\n    <li>Four</li>\n</ul>\n\n<button class="white" \n        data-bind="click: function() { pane.remove(); }">\n    Close\n</button>', 'template--Samples-About-Mobile-overlay');

//
window.__appendTemplate('\n<div class="layout">\n    <ul class="rounded">\n        <li>\n            Display any HTML in themed blocks\n        </li>\n        <li class="arrow" data-bind="click: navigate">\n            With arrow...\n        </li>\n        <li class="forward" data-bind="click: navigate">\n            Alternate arrow...\n        </li>\n        <li data-bind="pane: \'/Mobile/editable\',\n                       data: { initialText: \'New Item...\', }"></li>\n    </ul>\n    \n    <div data-bind="pane: \'/Mobile/list\', data: listData"></div>\n    \n    <button class="white" data-bind="click: overlay">\n        Overlay\n    </button>\n</div>', 'template--Samples-About-Mobile-samples');

//
window.__appendTemplate('\n<ul class="rounded welcome">\n    <li>tribe</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: samples">Samples</li>\n</ul>\n<ul class="rounded">\n    <li data-bind="click: chat">Chat</li>\n</ul>', 'template--Samples-About-Mobile-welcome');

//
window.__appendTemplate('\n<!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n<input data-bind="value: task" />\n<button data-bind="click: create">Create</button>', 'template--Samples-About-Tasks-create');

//
window.__appendTemplate('\n<h1>Todos</h1>\n\n<!-- Creating panes is simple -->\n<div data-bind="pane: \'create\'"></div>\n<div data-bind="pane: \'list\'"></div>', 'template--Samples-About-Tasks-layout');

//
window.__appendTemplate('\n<!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n<ul class="taskList" data-bind="foreach: tasks">\n    <li data-bind="pane: \'task\', data: $data"></li>\n</ul>', 'template--Samples-About-Tasks-list');

//
window.__appendTemplate('\n<!-- Familiar knockout bindings. Any properties or functions\n     declared in the JS model are available for use -->\n\n<button data-bind="click: deleteTask">x</button>\n<span data-bind="text: task"></span>', 'template--Samples-About-Tasks-task');

//
window.__appendTemplate('\n<p data-bind="with: data">\n    Thanks, \n    <span data-bind="text: contact.name"></span>,\n    you are about to apply for a \n    <span data-bind="text: type"></span> \n    credit card with a \n    $<span data-bind="text: account.limit"></span> \n    limit.\n</p>\n<p>\n    Please click \'Submit\' below to submit your application.  \n</p>\n<button data-bind="click: submit">Submit</button>\n<button data-bind="navigate: \'welcome\'">Restart</button>\n<div data-bind="text: json"></div>', 'template--Samples-CreditCard-1-Personal-confirm');

//
window.__appendTemplate('\n<!-- Tribe.Forms gives us a way of building simple forms \n     without needing a JavaScript model -->\n<p>Please enter some contact details.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }"></div>\n    <div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'"></div>\n    <button data-bind="publish: \'setContact\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-1-Personal-contact');

//
window.__appendTemplate('\n<!-- Tribe.Forms gives us a way of building simple forms \n     without needing a JavaScript model -->\n<p>Please enter some details about the account.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2"></div>\n    <button data-bind="publish: \'setAccount\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-1-Personal-personal');

//
window.__appendTemplate('\n<h1>Bank of Tribe</h1>\n\n<p>Welcome to the credit card application portal.</p>\n<p>Click \'Start\' to begin.</p>\n\n<button data-bind="click: start">Start</button>', 'template--Samples-CreditCard-1-Personal-welcome');

//
window.__appendTemplate('\n<p>Please enter some details about the account.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'limit\',\n                    displayText: \'Card limit (per card)\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 5"></div>\n    <button data-bind="publish: \'setAccount\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-2-Business-businessAccount');

//
window.__appendTemplate('\n<p>Please enter your business details.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'name\',\n                    displayText: \'Business name\', \n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'abn\',\n                    displayText: \'ABN\'"></div>\n    <button data-bind="publish: \'setBusiness\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-2-Business-businessDetails');

//
window.__appendTemplate('\n<p data-bind="with: data">\n    Thanks, \n    <span data-bind="text: contact.name"></span>,\n    you are about to apply for a \n    <span data-bind="text: type"></span> \n    credit card with a \n    $<span data-bind="text: account.limit"></span> \n    limit.\n</p>\n<p>\n    Please click \'Submit\' below to submit your application.  \n</p>\n<button data-bind="click: submit">Submit</button>\n<button data-bind="navigate: \'welcome\'">Restart</button>\n<div data-bind="text: json"></div>', 'template--Samples-CreditCard-2-Business-confirm');

//
window.__appendTemplate('\n<p>Please enter some contact details.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }"></div>\n    <div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'"></div>\n    <button data-bind="publish: \'setContact\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-2-Business-contact');

//
window.__appendTemplate('\n<p>Please enter some details about the account.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2"></div>\n    <button data-bind="publish: \'setAccount\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-2-Business-personal');

//
window.__appendTemplate('\n<h1>Bank of Tribe</h1>\n\n<p>Welcome to the credit card application portal.</p>\n<p>Click the required account type to begin.</p>\n\n<button data-bind="click: personal">Personal</button>\n<button data-bind="click: business">Business</button>', 'template--Samples-CreditCard-2-Business-welcome');

//
window.__appendTemplate('\n<p>Please enter some details about the account.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'limit\',\n                    displayText: \'Card limit (per card)\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 5"></div>\n    <button data-bind="publish: \'setAccount\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-3-Saga-businessAccount');

//
window.__appendTemplate('\n<p>Please enter your business details.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'name\',\n                    displayText: \'Business name\', \n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'abn\',\n                    displayText: \'ABN\'"></div>\n    <button data-bind="publish: \'setBusiness\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-3-Saga-businessDetails');

//
window.__appendTemplate('\n<p data-bind="with: data">\n    Thanks, \n    <span data-bind="text: contact.name"></span>,\n    you are about to apply for a \n    <span data-bind="text: type"></span> \n    credit card with a \n    $<span data-bind="text: account.limit"></span> \n    limit.\n</p>\n<p>\n    Please click \'Submit\' below to submit your application.  \n</p>\n<button data-bind="click: submit">Submit</button>\n<button data-bind="navigate: \'welcome\'">Restart</button>\n<div data-bind="text: json"></div>\n', 'template--Samples-CreditCard-3-Saga-confirm');

//
window.__appendTemplate('\n<p>Please enter some contact details.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }"></div>\n    <div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'"></div>\n    <button data-bind="publish: \'setContact\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-3-Saga-contact');

//
window.__appendTemplate('\n<p>Please enter some details about the account.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2"></div>\n    <button data-bind="publish: \'setAccount\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-3-Saga-personal');

//
window.__appendTemplate('\n<h1>Bank of Tribe</h1>\n\n<p>Welcome to the credit card application portal.</p>\n<p>Click the required account type to begin.</p>\n\n<button data-bind="click: personal">Personal</button>\n<button data-bind="click: business">Business</button>', 'template--Samples-CreditCard-3-Saga-welcome');

//
window.__appendTemplate('\n<p>Please enter some details about the account.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'limit\',\n                    displayText: \'Card limit (per card)\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 5"></div>\n    <button data-bind="publish: \'setAccount\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-4-Combined-businessAccount');

//
window.__appendTemplate('\n<p>Please enter your business details.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'name\',\n                    displayText: \'Business name\', \n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'abn\',\n                    displayText: \'ABN\'"></div>\n    <button data-bind="publish: \'setBusiness\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-4-Combined-businessDetails');

//
window.__appendTemplate('\n<p data-bind="with: data">\n    Thanks, \n    <span data-bind="text: contact.name"></span>,\n    you are about to apply for a \n    <span data-bind="text: type"></span> \n    credit card with a \n    $<span data-bind="text: account.limit"></span> \n    limit.\n</p>\n<p>\n    Please click \'Submit\' below to submit your application.  \n</p>\n<button data-bind="click: submit">Submit</button>\n<button data-bind="click: restart">Restart</button>\n<div data-bind="text: json"></div>\n', 'template--Samples-CreditCard-4-Combined-confirm');

//
window.__appendTemplate('\n<p>Please enter some contact details.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'name\',\n                    displayText: \'Name\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'email\',\n                    displayText: \'Email\',\n                    validate: { email: \'This\' }"></div>\n    <div data-bind="textField: \'phone\',\n                    displayText: \'Phone\'"></div>\n    <button data-bind="publish: \'setContact\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-4-Combined-contact');

//
window.__appendTemplate('\n<p>Please enter some details about the account.</p>\n<div data-bind="form: {}, create: true">\n    <div data-bind="textField: \'limit\',\n                    displayText: \'Card limit\',\n                    validate: { required: true }"></div>\n    <div data-bind="textField: \'cards\',\n                    displayText: \'# cards required\',\n                    defaultValue: 2"></div>\n    <button data-bind="publish: \'setAccount\', data: $data">Next</button>\n</div>', 'template--Samples-CreditCard-4-Combined-personal');

//
window.__appendTemplate('\n<h1>Bank of Tribe</h1>\n\n<p>Welcome to the credit card application portal.</p>\n<p>Click the required account type to begin.</p>\n\n<button data-bind="publish: \'startPersonal\'">Personal</button>\n<button data-bind="publish: \'startBusiness\'">Business</button>\n', 'template--Samples-CreditCard-4-Combined-welcome');

//
window.__appendTemplate('\n<div class="panels">\n    <!-- Pass the shared observable to child panes -->\n\n    <div data-bind="pane: \'sender\',\n                    data: observable"></div>\n\n    <div data-bind="pane: \'receiver\',\n                    data: observable"></div>\n</div>', 'template--Samples-Panes-Communicating-layout');

//
window.__appendTemplate('\n<div>\n    Observable: <span data-bind="text: observable"></span>\n</div>\n\n<div>\n    Messages:\n    <ul data-bind="foreach: messages">\n        <li data-bind="text: message"></li>\n    </ul>\n</div>\n', 'template--Samples-Panes-Communicating-receiver');

//
window.__appendTemplate('\n<div>\n    Observable: <input data-bind="value: observable" />\n</div>\n\n<div>\n    Message: <input data-bind="value: message"/>\n    <button data-bind="click: send">Send</button>\n</div>', 'template--Samples-Panes-Communicating-sender');

//
window.__appendTemplate('\n<div class="helloWorld">\n    <h1>Hello, World!</h1>\n\n    <!-- Bind our message property -->\n    <span data-bind="text: message"></span>\n</div>', 'template--Samples-Panes-Creating-helloWorld');

//
window.__appendTemplate('\n<button data-bind="click: createPane">Create Pane</button>\n\n<!-- New panes will be appended to this element -->\n<div class="items"></div>', 'template--Samples-Panes-Dynamic-create');

//
window.__appendTemplate('\n<div>\n    This is pane number \n\n    <!-- If our pane doesn\'t have a model, you can access \n         the pane property in data bindings -->\n    <span data-bind="text: pane.data"></span>.\n</div>', 'template--Samples-Panes-Dynamic-item');

//
window.__appendTemplate('\n<button data-bind="click: createPane">Create Pane</button>\n<div class="items"></div>', 'template--Samples-Panes-Lifecycle-create');

//
window.__appendTemplate('\n<div>\n    This is pane number <span data-bind="text: data"></span>.\n</div>', 'template--Samples-Panes-Lifecycle-item');

//
window.__appendTemplate('\n<div>\n    This is the first pane in our navigation stack.\n</div>\n<button data-bind="click: next">Next</button>', 'template--Samples-Panes-Navigating-first');

//
window.__appendTemplate('\n<!-- The handlesNavigation binding marks the underlying node\n     as the node that should transition on navigation -->\n\n<div data-bind="pane: \'first\', handlesNavigation: \'fade\'">\n</div>', 'template--Samples-Panes-Navigating-layout');

//
window.__appendTemplate('\n<div>\n    This is the second pane in our navigation stack.\n</div>\n<button data-bind="click: back">Back</button>\n<button data-bind="click: next">Next</button>', 'template--Samples-Panes-Navigating-second');

//
window.__appendTemplate('\n<div>\n    And the last one!\n</div>\n<button data-bind="click: back">Back</button>', 'template--Samples-Panes-Navigating-third');

//
window.__appendTemplate('\n<!-- A simple list of the folder names.\n     Apply the "selected" CSS class to the selected folder.\n     On click, set the selected folder -->\n\n<ul class="folders" data-bind="foreach: folders">\n    <li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectedFolder"></li>\n</ul>', 'template--Samples-Webmail-1-Folders-folders');

//
window.__appendTemplate('\n<!-- The click binding is now to the selectFolder function -->\n\n<ul class="folders" data-bind="foreach: folders">\n    <li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder"></li>\n</ul>', 'template--Samples-Webmail-2-Mails-folders');

//
window.__appendTemplate('\n<!-- The handlesNavigation binding tells Tribe to use that node for navigation. -->\n\n<div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }"></div>\n<div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'"></div>', 'template--Samples-Webmail-2-Mails-layout');

//
window.__appendTemplate('\n<table class="mails" data-bind="with: data">\n    <thead>\n        <tr>\n            <th>From</th>\n            <th>To</th>\n            <th>Subject</th>\n            <th>Date</th>\n        </tr>\n    </thead>\n\n    <tbody data-bind="foreach: mails">\n        <tr>\n            <td data-bind="text: from"></td>\n            <td data-bind="text: to"></td>\n            <td data-bind="text: subject"></td>\n            <td data-bind="text: date"></td>\n        </tr>     \n    </tbody>\n</table>', 'template--Samples-Webmail-2-Mails-mails');

//
window.__appendTemplate('\n<ul class="folders" data-bind="foreach: folders">\n    <li data-bind="text: $data,\n                   css: { selected: $data === $root.selectedFolder() },\n                   click: $root.selectFolder"></li>\n</ul>', 'template--Samples-Webmail-3-Content-folders');

//
window.__appendTemplate('\n<div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }"></div>\n<div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'"></div>', 'template--Samples-Webmail-3-Content-layout');

//
window.__appendTemplate('\n<table class="mails" data-bind="with: data">\n    <thead>\n        <tr>\n            <th>From</th>\n            <th>To</th>\n            <th>Subject</th>\n            <th>Date</th>\n        </tr>\n    </thead>\n\n    <tbody data-bind="foreach: mails">\n        <tr data-bind="click: $root.selectMail">\n            <td data-bind="text: from"></td>\n            <td data-bind="text: to"></td>\n            <td data-bind="text: subject"></td>\n            <td data-bind="text: date"></td>\n        </tr>     \n    </tbody>\n</table>', 'template--Samples-Webmail-3-Content-mails');

//
window.__appendTemplate('\n<div class="viewMail" data-bind="with: data">\n    <div class="mailInfo">\n        <h1 data-bind="text: subject"></h1>\n        <p><label>From</label>: <span data-bind="text: from"></span></p>\n        <p><label>To</label>: <span data-bind="text: to"></span></p>\n        <p><label>Date</label>: <span data-bind="text: date"></span></p>\n        <div class="message">\n            <p data-bind="html: messageContent" />            \n        </div>\n    </div>\n</div>', 'template--Samples-Webmail-3-Content-viewMail');

//
window.__appendStyle = function (content) {
    var element = document.getElementById('__tribeStyles');
    if (!element) {
        element = document.createElement('style');
        element.className = '__tribe';
        element.id = '__tribeStyles';
        document.getElementsByTagName('head')[0].appendChild(element);
    }

    if(element.styleSheet)
        element.styleSheet.cssText += content;
    else
        element.appendChild(document.createTextNode(content));
};//
window.__appendStyle('.browsers.block{padding-bottom:0}.browsers .features{border:0}');

//
window.__appendStyle('.example3 .sample .samplePane{padding:0;width:320px;height:480px;left:22px;top:136px}.example3 .sample>*{height:711px}.example3 .sample .source{width:548px}.example3 .sample .result{width:365px;height:721px;border:0;background:url(\'Images/device.mobile.png\');margin-left:15px}.example3 .sample .fileList{width:548px;height:auto}.example3 .sample .fileContent{width:548px;height:auto}.example3 .result .title{display:none}');

//
window.__appendStyle('.features{text-align:center;color:#081735;font-size:18px}.features.small{font-size:inherit}.features>*{vertical-align:top;display:inline-block;width:180px}.features.small>*{width:100px}.features strong{font-size:1.1em;height:50px;color:#701010;padding-bottom:10px}.features>* *{text-align:center;margin:0 auto;display:block}.features.small img{margin-bottom:5px}.features img{margin-bottom:20px}');

//
window.__appendStyle('.guides h2{margin-bottom:5px}.guides ul{list-style:none;padding:0;margin:0}.guides li{cursor:pointer;margin-bottom:10px;padding:5px 20px;background:#f6f6f6;border-radius:8px}.guides li:hover{background:#EED}');

//
window.__appendStyle('.knockout.block{text-align:center;background:center url(\'Images/knockout/background.jpg\')}.knockout .features{display:inline-block;margin-left:50px;background-clip:padding-box;color:#b64838}.knockout .logo{color:white;vertical-align:top;margin-top:20px;display:inline-block;width:250px;font:inherit}');

//
window.__appendStyle('.masthead{color:white;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,0.5);background:#103070;text-align:center;padding-bottom:20px;border-bottom:1px #333 solid}.masthead h1{height:60px;font-size:96pt;padding:0}.masthead h2{font-size:18px}');

//
window.__appendStyle('.creditcard .sample .result{margin:10px auto 0 auto;width:920px;height:auto}.creditcard .sample .samplePane{height:auto}.creditcard .sample .fileContent{width:740px}.creditcard .sample .fileList{width:180px}.creditcard .fixedHeight .samplePane{height:200px;overflow-y:scroll}.creditcard h2{margin-top:20px!important}');

//
window.__appendStyle('.webmail .sample .result{margin:10px auto 0 auto;width:920px;height:auto}.webmail .sample .samplePane{height:auto}.webmail .sample .fileContent{width:770px}.webmail .fixedHeight .samplePane{height:500px;overflow-y:scroll}.webmail h2{margin-top:20px!important}');

//
window.__appendStyle('.content{width:980px;position:relative;left:50%;margin-left:-490px!important}.logo{font-weight:bold;font-family:\'Cambria\'}');

//
window.__appendStyle('div.feedback{position:fixed;background:white;z-index:200;overflow:hidden;width:600px;top:50%;left:50%;margin:-160px 0 0 -250px}.feedback .twitter-mention-button{margin-bottom:-3px}.feedback textarea{width:100%;height:110px;box-sizing:border-box}.feedback .success{position:absolute;top:0;bottom:0;left:0;right:0;background:white;z-index:201}.feedback .success div{position:absolute;left:50%;top:50%}.feedback .success div div{position:relative;left:-50%;top:-20px}.feedback .failure{color:salmon}.dialogBackgroundFilter{position:fixed;top:0;bottom:0;left:0;right:0;overflow:hidden;padding:0;margin:0;background-color:Gray;filter:alpha(opacity=60);opacity:.60;z-index:199}');

//
window.__appendStyle('.footer{text-align:right;font-size:10pt;color:#888;text-shadow:1px 1px rgba(255,255,255,0.2)}.footer a,.footer a:active,.footer a:visited,.footer a:link{text-decoration:none;color:#66F}.footer a:hover{color:#FFF}');

//
window.__appendStyle('.header{height:46px}.header .background{position:absolute;top:0;width:100%;height:45px;border-bottom:1px #333 solid;background:#45484d;background:-moz-linear-gradient(top,#45484d 0,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#45484d),color-stop(100%,#000));background:-webkit-linear-gradient(top,#45484d 0,#000 100%);background:-o-linear-gradient(top,#45484d 0,#000 100%);background:-ms-linear-gradient(top,#45484d 0,#000 100%);background:linear-gradient(to bottom,#45484d 0,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#45484d\',endColorstr=\'#000000\',GradientType=0);z-index:-2}.header .logo{display:none;position:absolute;cursor:pointer;top:2px;left:20px;color:white;font-size:22pt;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,0.5)}.header .buttons{text-align:center;position:absolute;right:0}.header .buttons span{font-size:.7em;float:left;color:#EEE;text-shadow:2px 2px 0 black;padding:9px;cursor:pointer;background:rgba(32,96,224,0.2);font-size:1.2em;width:110px;height:27px;margin:0;margin-left:-1px;border-left:1px solid black;border-right:1px solid black}.header .buttons span:hover{background:#fff;background:-moz-linear-gradient(top,#fff 0,#000 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#fff),color-stop(100%,#000));background:-webkit-linear-gradient(top,#fff 0,#000 100%);background:-o-linear-gradient(top,#fff 0,#000 100%);background:-ms-linear-gradient(top,#fff 0,#000 100%);background:linear-gradient(to bottom,#fff 0,#000 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#ffffff\',endColorstr=\'#000000\',GradientType=0);color:#AAA}');

//
window.__appendStyle('.navigation{display:none;background:#EEE;border:1px solid black;box-sizing:border-box;z-index:100}.navigation ul{list-style:none}.navigation li{cursor:pointer}.navigation ul li:hover{background:#111;color:#EEE}.navigation li.selectedItem{background:#CCC}.navigation>ul li{padding:2px 10px;font-weight:bold}.navigation ul ul li{margin:0;padding:2px 0 2px 20px;box-sizing:border-box;font-weight:normal}@media(max-width:1345px){.navigation{width:980px;position:relative;left:50%;margin-left:-490px!important;border-radius:8px;padding:10px;margin-top:10px}.navigation ul{margin:0;padding:0;width:33%;min-height:50px}.navigation ul ul{position:absolute;top:10px;right:10px;width:66%}.navigation ul ul li{width:50%;float:left}}@media(min-width:1345px){.navigation{width:170px!important;position:fixed;left:0;top:56px;border-left:0;box-shadow:3px 3px 4px -1px rgba(0,0,0,0.3);border-top-right-radius:8px;border-bottom-right-radius:8px}.navigation>ul{padding:0;margin:10px}.navigation ul ul{margin:0;padding:0}}');

//
window.__appendStyle('.navigationContainer{position:relative}.navigationContainer>ul{position:absolute;top:0;right:0;list-style:none;margin:0;padding:0}.navigationContainer>ul li{display:inline-block;width:70px;height:25px;text-align:center;padding-top:2px;border-radius:6px;border:1px solid #eee;cursor:pointer}.navigationContainer>ul li:hover{background:black;color:white}.navigationContainer>.out{margin-top:-20px}');

//
window.__appendStyle('.sample{width:935px;margin:0}.sample>*{display:inline-block;vertical-align:top;height:305px;border:1px solid black;border-radius:8px;overflow:hidden;background:white}.sample .fileList,.sample .fileContent{float:left;height:300px;box-sizing:border-box}.sample ul.fileList{width:140px;list-style:none;margin:0;padding:0}.sample .fileList li{padding:2px;cursor:pointer}.sample .fileList li:hover{color:white;background:black}.sample .selectedFile{color:white;background:grey}.sample .fileContent{padding:5px;width:515px;overflow:auto;height:272px}.sample .result{margin-left:5px;margin-bottom:5px;width:255px}.sample .title{background:#ccc;padding:5px;width:100%;box-sizing:border-box;border-top-left-radius:8px;border-top-right-radius:8px}.sample .samplePane{overflow-y:auto;overflow-x:hidden;padding:5px;height:262px;position:relative}.sample pre{margin:0}.sample pre.prettyprint{border:0}');

//
window.__appendStyle('.tip{background:#DED;padding:0 10px;margin:10px 0;border-radius:8px}.tip p{display:table-cell;vertical-align:middle;height:70px}.tip img{float:left;border:0;margin:5px 10px 5px -10px;padding:0}');

//
window.__appendStyle('.function h1 .returns{float:right;font-weight:normal}.function h1 .returns .type{font-weight:bold;font-style:italic}.function .name{font-size:1.2em}');

//
window.__appendStyle('.messages{list-style:none;padding:0}.messages li{padding:5px}');

//
window.__appendStyle('ul.welcome li{background:#103070;color:white;text-align:center;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,0.5);font:bold 64pt \'Cambria\'}');

//
window.__appendStyle('.taskList{list-style:none;padding:0}.taskList li{padding:5px}');

//
window.__appendStyle('.panels>div{margin-bottom:5px;border:1px solid black}');

//
window.__appendStyle('.helloWorld h1{text-shadow:3px 3px 0 #AAA}');

//
window.__appendStyle('.folders{background-color:#bbb;list-style-type:none;padding:0;margin:0;border-radius:7px;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#d6d6d6),color-stop(0.4,#c0c0c0),color-stop(1,#a4a4a4));margin:10px 0 16px 0;font-size:0}.folders li:hover{background-color:#ddd}.folders li:first-child{border-left:none;border-radius:7px 0 0 7px}.folders li{font-size:16px;font-weight:bold;display:inline-block;padding:.5em 1.5em;cursor:pointer;color:#444;text-shadow:#f7f7f7 0 1px 1px;border-left:1px solid #ddd;border-right:1px solid #888}.folders li{*display:inline!important}.folders .selected{background-color:#444!important;color:white;text-shadow:none;border-right-color:#aaa;border-left:none;box-shadow:inset 1px 2px 6px #070707}');

//
window.__appendStyle('.folders{background-color:#bbb;list-style-type:none;padding:0;margin:0;border-radius:7px;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#d6d6d6),color-stop(0.4,#c0c0c0),color-stop(1,#a4a4a4));margin:10px 0 16px 0;font-size:0}.folders li:hover{background-color:#ddd}.folders li:first-child{border-left:none;border-radius:7px 0 0 7px}.folders li{font-size:16px;font-weight:bold;display:inline-block;padding:.5em 1.5em;cursor:pointer;color:#444;text-shadow:#f7f7f7 0 1px 1px;border-left:1px solid #ddd;border-right:1px solid #888}.folders li{*display:inline!important}.folders .selected{background-color:#444!important;color:white;text-shadow:none;border-right-color:#aaa;border-left:none;box-shadow:inset 1px 2px 6px #070707}');

//
window.__appendStyle('.mails{width:100%;table-layout:fixed;border-spacing:0}.mails th{background-color:#bbb;font-weight:bold;color:#444;text-shadow:#f7f7f7 0 1px 1px}.mails tbody tr:hover{cursor:pointer;background-color:#68c!important;color:White}.mails th,.mails td{text-align:left;padding:.4em .3em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mails td{border:0}.mails th{border:0;border-left:1px solid #ddd;border-right:1px solid #888;padding:.4em 0 .3em .7em}.mails th:nth-child(1),.mails td:nth-child(1){width:20%}.mails th:nth-child(2),.mails td:nth-child(2){width:15%}.mails th:nth-child(3),.mails td:nth-child(3){width:45%}.mails th:nth-child(4),.mails td:nth-child(4){width:15%}.mails th:last-child{border-right:0}.mails tr:nth-child(even){background-color:#EEE}');

//
window.__appendStyle('.folders{background-color:#bbb;list-style-type:none;padding:0;margin:0;border-radius:7px;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#d6d6d6),color-stop(0.4,#c0c0c0),color-stop(1,#a4a4a4));margin:10px 0 16px 0;font-size:0}.folders li:hover{background-color:#ddd}.folders li:first-child{border-left:none;border-radius:7px 0 0 7px}.folders li{font-size:16px;font-weight:bold;display:inline-block;padding:.5em 1.5em;cursor:pointer;color:#444;text-shadow:#f7f7f7 0 1px 1px;border-left:1px solid #ddd;border-right:1px solid #888}.folders li{*display:inline!important}.folders .selected{background-color:#444!important;color:white;text-shadow:none;border-right-color:#aaa;border-left:none;box-shadow:inset 1px 2px 6px #070707}');

//
window.__appendStyle('.mails{width:100%;table-layout:fixed;border-spacing:0}.mails th{background-color:#bbb;font-weight:bold;color:#444;text-shadow:#f7f7f7 0 1px 1px}.mails tbody tr:hover{cursor:pointer;background-color:#68c!important;color:White}.mails th,.mails td{text-align:left;padding:.4em .3em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mails td{border:0}.mails th{border:0;border-left:1px solid #ddd;border-right:1px solid #888;padding:.4em 0 .3em .7em}.mails th:nth-child(1),.mails td:nth-child(1){width:20%}.mails th:nth-child(2),.mails td:nth-child(2){width:15%}.mails th:nth-child(3),.mails td:nth-child(3){width:45%}.mails th:nth-child(4),.mails td:nth-child(4){width:15%}.mails th:last-child{border-right:0}.mails tr:nth-child(even){background-color:#EEE}');

//
window.__appendStyle('.viewMail .mailInfo{background-color:#dae0e8;padding:1em 1em .5em 1.25em;border-radius:1em}.viewMail .mailInfo h1{margin-top:.2em;font-size:130%}.viewMail .mailInfo label{color:#777;font-weight:bold;min-width:2.75em;text-align:right;display:inline-block}.viewMail .message{padding:0 1.25em}');

//
window.__appendStyle('.block{background:white;border:1px solid #AAA;margin-bottom:10px;margin-top:10px;border-radius:8px;box-sizing:border-box;padding:20px}.block p{margin:10px 0;font-size:18px}.block .child{position:relative;padding:15px;border:2px solid #222;border-radius:6px;margin-bottom:10px}.block .child h1{color:white;background:#222;font-weight:bold;font-size:inherit;height:20px;margin:-15px -15px 0 -15px;padding:7px 10px 10px 10px}.block .child p{margin:10px 0}.block .child pre{margin:0}.child img{position:absolute;top:50%;right:20px;margin-top:-30px}img.topRight{position:static!important;float:right;margin:0!important}.out .content.block{margin-top:0}.block>h1{color:white;font-weight:bold;font-size:inherit;height:20px;border-top-left-radius:8px;border-top-right-radius:8px;padding:10px;margin:-20px -20px 10px -20px;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,0.5);background:#103070;background:-moz-linear-gradient(top,#103070 0,#457ae4 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0%,#103070),color-stop(100%,#457ae4));background:-webkit-linear-gradient(top,#103070 0,#457ae4 100%);background:-o-linear-gradient(top,#103070 0,#457ae4 100%);background:-ms-linear-gradient(top,#103070 0,#457ae4 100%);background:linear-gradient(to bottom,#103070 0,#457ae4 100%)}.block h2{font-size:1.2em;font-weight:bold;margin-top:10px}');

//
window.__appendStyle('.filename{font-family:monospace;white-space:nowrap}.example{position:relative;background:#EED;padding:10px;margin:10px 0;font-family:monospace;overflow:hidden;border-radius:8px}.example .filename{display:block;position:absolute;top:0;right:0;font-size:8pt;color:gray!important;padding:0 5px}span.example{border-radius:0;margin:inherit;padding:inherit}');

//
window.__appendStyle('body{background:#CCC;font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif;padding:0;margin:0;overflow-y:scroll}h1,h2,h3{margin-top:0}b{color:#103070}.padded{padding:10px}.underline{text-decoration:underline}.clear{clear:both}a,a:active,a:visited,a:link{text-decoration:none;cursor:pointer;color:#1b50ba}a:hover{text-decoration:underline}table{border-spacing:0;border-collapse:collapse}table.pointer tr:hover{background:#103070;color:white}table.pointer tr{cursor:pointer}th{text-align:left;background:#457ae4;color:white;padding:2px 5px}th,td{border:1px solid #457ae4;padding:2px 5px}pre.inline{display:inline-block}button.large{text-decoration:none;text-align:center;padding:11px 32px;border:solid 1px #004f72;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;font:18px Arial,Helvetica,sans-serif;font-weight:bold;color:#e5ffff;background-color:#103070;background-image:-moz-linear-gradient(top,#103070 0,#1b50ba 100%);background-image:-webkit-linear-gradient(top,#103070 0,#1b50ba 100%);background-image:-o-linear-gradient(top,#103070 0,#1b50ba 100%);background-image:-ms-linear-gradient(top,#103070 0,#1b50ba 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#1b50ba\',endColorstr=\'#1b50ba\',GradientType=0);background-image:linear-gradient(top,#103070 0,#1b50ba 100%);-webkit-box-shadow:0 0 2px #bababa,inset 0 0 1px #fff;-moz-box-shadow:0 0 2px #bababa,inset 0 0 1px #fff;box-shadow:0 0 2px #bababa,inset 0 0 1px #fff}button.large:hover{background:#103070}button.large:active{background:#1b50ba}');

//
window.__appendStyle('.com{color:#008000}.str,.tag{color:#a31515}.kwd,.atv{color:#00f}.typ{color:#2b91af}.lit,.atn{color:#f00}.pun,.pln{color:#000}.dec{color:purple}');