Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions<br/>     declared in the JS model are available for use --><br/><br/>&lt;input data-bind="value: task" /><br/>&lt;button data-bind="click: create">Create&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">// Declare model constructors using this simple function.<br/>// Tribe creates an instance and binds it to the template.<br/><br/>TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    this.task = ko.observable();<br/>    <br/>    this.create = function() {<br/>        pane.pubsub.publish(\'task.create\', self.task());<br/>        self.task(\'\');<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Todos&lt;/title><br/>        &lt;script src="jquery.js">&lt;/script><br/>        &lt;script src="knockout.js">&lt;/script><br/>        &lt;script src="Tribe.js">&lt;/script><br/>        <br/>        &lt;script type="text/javascript"><br/>            // all the configuration you need!<br/>            $(TC.run);<br/>        &lt;/script><br/>    &lt;/head><br/>    &lt;body data-bind="pane: \'layout\'">&lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Todos&lt;/h1><br/><br/>&lt;!-- Creating panes is simple --><br/>&lt;div data-bind="pane: \'create\'">&lt;/div><br/>&lt;div data-bind="pane: \'list\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* CSS can be maintained alongside the <br/>   template it corresponds with */<br/><br/>.taskList {<br/>    list-style: none;<br/>    padding: 0;<br/>}<br/><br/>.taskList li {<br/>    padding: 5px;<br/>}</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!--Decompose your UI in a way that makes sense.<br/>    Panes can be nested as deep as you need. --><br/><br/>&lt;ul class="taskList" data-bind="foreach: tasks"><br/>    &lt;li data-bind="pane: \'task\', data: $data">&lt;/li><br/>&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'list.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.tasks = ko.observableArray([\'Sample task\']);<br/><br/>    // Using messages decouples your components.<br/>    // Tribe cleans up subscriptions automatically.<br/>    pane.pubsub.subscribe(\'task.create\', function(task) {<br/>        self.tasks.push(task);<br/>    });<br/><br/>    pane.pubsub.subscribe(\'task.delete\', function (task) {<br/>        var index = self.tasks.indexOf(task);<br/>        self.tasks.splice(index, 1);<br/>    });<br/>});</pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Familiar knockout bindings. Any properties or functions<br/>     declared in the JS model are available for use --><br/><br/>&lt;button data-bind="click: deleteTask">x&lt;/button><br/>&lt;span data-bind="text: task">&lt;/span></pre>'
});Samples = window.Samples || {};
Samples['About/Tasks'] = Samples['About/Tasks'] || [];
Samples['About/Tasks'].push({
    filename: 'task.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.task = pane.data;<br/>    <br/>    this.deleteTask = function() {<br/>        pane.pubsub.publish(\'task.delete\', self.task);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div data-bind="pane: \'sender\'">&lt;/div><br/>&lt;div data-bind="pane: \'messages\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'chat.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    // Hook up our message hub and join a channel<br/>    TMH.initialise(pane.pubsub);<br/>    TMH.joinChannel(\'chat\', {<br/>         serverEvents: [\'chat.*\']<br/>    });<br/><br/>    // The dispose function is called automatically<br/>    // when the pane is removed from the DOM.<br/>    this.dispose = function() {<br/>        TMH.leaveChannel(\'chat\');<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Todos&lt;/title><br/>        &lt;script src="jquery.js">&lt;/script><br/>        &lt;script src="knockout.js">&lt;/script><br/>        &lt;script src="Tribe.js">&lt;/script><br/>        <br/>        &lt;script type="text/javascript"><br/>            $(TC.run);<br/>        &lt;/script><br/>    &lt;/head><br/>    &lt;body data-bind="pane: \'chat\'">&lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.messages {<br/>    list-style: none;<br/>    padding: 0;<br/>}<br/><br/>.messages li {<br/>    padding: 5px;<br/>}</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="messages" data-bind="foreach: messages"><br/>    &lt;li><br/>        &lt;span data-bind="text: name">&lt;/span>:<br/>        &lt;span data-bind="text: message">&lt;/span><br/>    &lt;/li><br/>&lt;/ul><br/></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'messages.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.messages = ko.observableArray();<br/><br/>    pane.pubsub.subscribe(\'chat.message\',<br/>        function (message) {<br/>            self.messages.push(message);<br/>        });<br/>});</pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="chat"><br/>    &lt;div><br/>        Name: &lt;input data-bind="value: name" />    <br/>    &lt;/div><br/><br/>    &lt;div><br/>        Message: &lt;input data-bind="value: message" /><br/>        &lt;button data-bind="click: send">Send&lt;/button><br/>    &lt;/div><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Chat'] = Samples['About/Chat'] || [];
Samples['About/Chat'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    this.name = ko.observable(\'Anonymous\');<br/>    this.message = ko.observable();<br/><br/>    this.send = function() {<br/>        pane.pubsub.publish(\'chat.message\', {<br/>            name: self.name(),<br/>            message: self.message()<br/>        });<br/>        self.message(\'\');<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'chat.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Let\'s reuse our panes from the previous example --><br/>&lt;ul class="rounded"><br/>    &lt;li data-bind="pane: \'../Chat/sender\'">&lt;/li><br/>    &lt;li data-bind="pane: \'../Chat/messages\'">&lt;/li><br/>&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>  &lt;head><br/>    &lt;title>Tribe Mobile&lt;/title><br/>    <br/>    &lt;!-- Some metadata for mobile browsers --><br/>    &lt;meta name="viewport"<br/>          content="minimum-scale=1.0, width=device-width, <br/>                   maximum-scale=1.0, user-scalable=no" /><br/>     <br/>    &lt;script src="jquery.js">&lt;/script><br/>    &lt;script src="knockout.js">&lt;/script><br/>    &lt;script src="Tribe.js">&lt;/script><br/><br/>    &lt;!-- Tribe.Mobile.js is all you need to load --><br/>    &lt;script src="Tribe.Mobile.js">&lt;/script><br/><br/>    &lt;script type="text/javascript"><br/>        $(TC.run);<br/>    &lt;/script><br/>  &lt;/head><br/><br/>  &lt;!-- Use /Mobile/main as your host pane --><br/>  &lt;body data-bind="pane: \'/Mobile/main\',<br/>                   data: { pane: \'welcome\' }"><br/>  &lt;/body><br/>&lt;/html><br/></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'navigate.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul>&lt;li>You selected an item in the list...&lt;/li>&lt;/ul><br/>&lt;ul>&lt;li>Click the back button to go back.&lt;/li>&lt;/ul><br/></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'overlay.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul><br/>    &lt;li>One&lt;/li><br/>    &lt;li>Two&lt;/li><br/>    &lt;li>Three&lt;/li><br/>    &lt;li>Four&lt;/li><br/>&lt;/ul><br/><br/>&lt;button class="white" <br/>        data-bind="click: function() { pane.remove(); }"><br/>    Close<br/>&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'samples.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="layout"><br/>    &lt;ul class="rounded"><br/>        &lt;li><br/>            Display any HTML in themed blocks<br/>        &lt;/li><br/>        &lt;li class="arrow" data-bind="click: navigate"><br/>            With arrow...<br/>        &lt;/li><br/>        &lt;li class="forward" data-bind="click: navigate"><br/>            Alternate arrow...<br/>        &lt;/li><br/>        &lt;li data-bind="pane: \'/Mobile/editable\',<br/>                       data: { initialText: \'New Item...\', }">&lt;/li><br/>    &lt;/ul><br/>    <br/>    &lt;div data-bind="pane: \'/Mobile/list\', data: listData">&lt;/div><br/>    <br/>    &lt;button class="white" data-bind="click: overlay"><br/>        Overlay<br/>    &lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'samples.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    TC.toolbar.title(\'Title!\');<br/>    <br/>    TC.toolbar.options([<br/>        { text: \'Option 1\', func: function () { } },<br/>        { text: \'Option 2\', func: function () { } }<br/>    ]);<br/><br/>    this.listData = {<br/>        items: [<br/>            { id: 1, name: \'Item 1\' },<br/>            { id: 2, name: \'Item 2\' }<br/>        ],<br/>        itemText: function(item) {<br/>             return item.id + \' - \' + item.name;<br/>        },<br/>        headerText: \'Select List\',<br/>        itemClick: function(item) { }<br/>    };<br/><br/>    this.overlay = function() {<br/>        TC.overlay(\'overlay\');<br/>    };<br/><br/>    this.navigate = function() {<br/>        pane.navigate(\'navigate\');<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">ul.welcome li {<br/>    background: #103070;<br/>    color: white;<br/>    text-align: center;<br/>    text-shadow: 3px 3px 0 black, 5px 5px 5px rgba(0, 0, 0, 0.5);<br/>    font: bold 64pt \'Cambria\';<br/>}</pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="rounded welcome"><br/>    &lt;li>tribe&lt;/li><br/>&lt;/ul><br/>&lt;ul class="rounded"><br/>    &lt;li data-bind="click: samples">Samples&lt;/li><br/>&lt;/ul><br/>&lt;ul class="rounded"><br/>    &lt;li data-bind="click: chat">Chat&lt;/li><br/>&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['About/Mobile'] = Samples['About/Mobile'] || [];
Samples['About/Mobile'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    TC.toolbar.defaults.back = true;<br/><br/>    this.samples = function() {<br/>        pane.navigate(\'samples\');<br/>    };<br/><br/>    this.chat = function () {<br/>        pane.navigate(\'chat\');<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our heading pretty */<br/>.helloWorld h1 {<br/>    text-shadow: 3px 3px 0 #AAA;<br/>}</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="helloWorld"><br/>    &lt;h1>Hello, World!&lt;/h1><br/><br/>    &lt;!-- Bind our message property --><br/>    &lt;span data-bind="text: message">&lt;/span><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'helloWorld.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    // Model properties are available for <br/>    // data binding in your template.<br/>    this.message = "Message passed: " + pane.data.message;<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Creating'] = Samples['Panes/Creating'] || [];
Samples['Panes/Creating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Creating Panes&lt;/title><br/>        &lt;script src="jquery.js">&lt;/script><br/>        &lt;script src="knockout.js">&lt;/script><br/>        &lt;script src="Tribe.js">&lt;/script><br/>        <br/>        &lt;script type="text/javascript">$(TC.run)&lt;/script><br/>    &lt;/head><br/>    <br/>    &lt;!-- Create a pane and pass it some data --><br/>    &lt;body data-bind="pane: \'helloWorld\',<br/>                     data: { message: \'Test message.\' }"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;button data-bind="click: createPane">Create Pane&lt;/button><br/><br/>&lt;!-- New panes will be appended to this element --><br/>&lt;div class="items">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var i = 0;<br/>    <br/>    // Dynamically insert a pane into the element<br/>    // with its class set to "items".<br/>    this.createPane = function() {<br/>        TC.appendNode(\'.items\', { path: \'item\', data: ++i });<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Creating Panes Dynamically&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'create\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Dynamic'] = Samples['Panes/Dynamic'] || [];
Samples['Panes/Dynamic'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div><br/>    This is pane number <br/><br/>    &lt;!-- If our pane doesn\'t have a model, you can access <br/>         the pane property in data bindings --><br/>    &lt;span data-bind="text: pane.data">&lt;/span>.<br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Communicating&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.panels > div {<br/>    margin-bottom: 5px;<br/>    border: 1px solid black;<br/>}</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="panels"><br/>    &lt;!-- Pass the shared observable to child panes --><br/><br/>    &lt;div data-bind="pane: \'sender\',<br/>                    data: observable">&lt;/div><br/><br/>    &lt;div data-bind="pane: \'receiver\',<br/>                    data: observable">&lt;/div><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'layout.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    // Create an observable to share between child panes<br/>    this.observable = ko.observable(\'Test\');<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div><br/>    Observable: &lt;span data-bind="text: observable">&lt;/span><br/>&lt;/div><br/><br/>&lt;div><br/>    Messages:<br/>    &lt;ul data-bind="foreach: messages"><br/>        &lt;li data-bind="text: message">&lt;/li><br/>    &lt;/ul><br/>&lt;/div><br/></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'receiver.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    var self = this;<br/><br/>    // Our shared observable<br/>    this.observable = pane.data;<br/>    <br/>    // Listen for messages and push them onto <br/>    // an array as they arrive<br/>    this.messages = ko.observableArray();<br/>    pane.pubsub.subscribe(\'sample.message\', function (data) {<br/>        self.messages.push(data);<br/>    });<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div><br/>    Observable: &lt;input data-bind="value: observable" /><br/>&lt;/div><br/><br/>&lt;div><br/>    Message: &lt;input data-bind="value: message"/><br/>    &lt;button data-bind="click: send">Send&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Communicating'] = Samples['Panes/Communicating'] || [];
Samples['Panes/Communicating'].push({
    filename: 'sender.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    // Our shared observable<br/>    this.observable = pane.data;<br/>    <br/>    // The pubsub object is available through the pane object.<br/>    this.message = ko.observable();<br/>    this.send = function() {<br/>        pane.pubsub.publish(\'sample.message\',<br/>            { message: self.message() });<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;button data-bind="click: createPane">Create Pane&lt;/button><br/>&lt;div class="items">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'create.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var i = 0;<br/>    <br/>    this.createPane = function() {<br/>        TC.appendNode(pane.find(\'.items\'),<br/>            { path: \'item\', data: ++i });<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Pane Lifecycle&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'create\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div><br/>    This is pane number &lt;span data-bind="text: data">&lt;/span>.<br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Lifecycle'] = Samples['Panes/Lifecycle'] || [];
Samples['Panes/Lifecycle'].push({
    filename: 'item.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    this.data = pane.data;<br/><br/>    // The initialise function is called before the pane<br/>    // is rendered. If you return a jQuery deferred object,<br/>    // Tribe will wait for it to resolve before continuing.<br/>    <br/>    this.initialise = function() {<br/>        var promise = $.Deferred();<br/>        setTimeout(promise.resolve, 500);<br/>        return promise;<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div><br/>    This is the first pane in our navigation stack.<br/>&lt;/div><br/>&lt;button data-bind="click: next">Next&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'first.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    this.next = function() {<br/>        pane.navigate(\'second\');<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>Navigating&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The handlesNavigation binding marks the underlying node<br/>     as the node that should transition on navigation --><br/><br/>&lt;div data-bind="pane: \'first\', handlesNavigation: \'fade\'"><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div><br/>    This is the second pane in our navigation stack.<br/>&lt;/div><br/>&lt;button data-bind="click: back">Back&lt;/button><br/>&lt;button data-bind="click: next">Next&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'second.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    this.back = function () {<br/>        pane.navigateBack();<br/>    };<br/><br/>    this.next = function () {<br/>        pane.navigate(\'third\');<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div><br/>    And the last one!<br/>&lt;/div><br/>&lt;button data-bind="click: back">Back&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['Panes/Navigating'] = Samples['Panes/Navigating'] || [];
Samples['Panes/Navigating'].push({
    filename: 'third.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    this.back = function() {<br/>        pane.navigateBack();<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */<br/><br/>.folders { <br/>    background-color: #bbb; <br/>    list-style-type: none; <br/>    padding: 0; <br/>    margin: 0; <br/>    border-radius: 7px; <br/>    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),<br/>                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); <br/>    margin: 10px 0 16px 0;<br/>    font-size: 0px;<br/>}<br/><br/>.folders li:hover {<br/>     background-color: #ddd;<br/>}    <br/><br/>.folders li:first-child {<br/>     border-left: none; <br/>     border-radius: 7px 0 0 7px;<br/>}<br/><br/>.folders li {<br/>     font-size: 16px; <br/>     font-weight: bold; <br/>     display: inline-block; <br/>     padding: 0.5em 1.5em; <br/>     cursor: pointer; <br/>     color: #444; <br/>     text-shadow: #f7f7f7 0 1px 1px; <br/>     border-left: 1px solid #ddd; <br/>     border-right: 1px solid #888;<br/>}<br/><br/>.folders li {<br/>     *display: inline !important;<br/>} /* IE7 only */<br/><br/>.folders .selected {<br/>     background-color: #444 !important; <br/>     color: white; <br/>     text-shadow: none; <br/>     border-right-color: #aaa; <br/>     border-left: none; <br/>     box-shadow: inset 1px 2px 6px #070707;<br/>}    <br/></pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- A simple list of the folder names.<br/>     Apply the "selected" CSS class to the selected folder.<br/>     On click, set the selected folder --><br/><br/>&lt;ul class="folders" data-bind="foreach: folders"><br/>    &lt;li data-bind="text: $data,<br/>                   css: { selected: $data === $root.selectedFolder() },<br/>                   click: $root.selectedFolder">&lt;/li><br/>&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">// Our model just contains a list of folders and<br/>// an observable to hold the selected folder.<br/><br/>TC.registerModel(function (pane) {<br/>    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];<br/>    this.selectedFolder = ko.observable(\'Inbox\');<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/1-Folders'] = Samples['Webmail/1-Folders'] || [];
Samples['Webmail/1-Folders'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'folders\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */<br/><br/>.folders { <br/>    background-color: #bbb; <br/>    list-style-type: none; <br/>    padding: 0; <br/>    margin: 0; <br/>    border-radius: 7px; <br/>    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),<br/>                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); <br/>    margin: 10px 0 16px 0;<br/>    font-size: 0px;<br/>}<br/><br/>.folders li:hover {<br/>     background-color: #ddd;<br/>}    <br/><br/>.folders li:first-child {<br/>     border-left: none; <br/>     border-radius: 7px 0 0 7px;<br/>}<br/><br/>.folders li {<br/>     font-size: 16px; <br/>     font-weight: bold; <br/>     display: inline-block; <br/>     padding: 0.5em 1.5em; <br/>     cursor: pointer; <br/>     color: #444; <br/>     text-shadow: #f7f7f7 0 1px 1px; <br/>     border-left: 1px solid #ddd; <br/>     border-right: 1px solid #888;<br/>}<br/><br/>.folders li {<br/>     *display: inline !important;<br/>} /* IE7 only */<br/><br/>.folders .selected {<br/>     background-color: #444 !important; <br/>     color: white; <br/>     text-shadow: none; <br/>     border-right-color: #aaa; <br/>     border-left: none; <br/>     box-shadow: inset 1px 2px 6px #070707;<br/>}    <br/></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The click binding is now to the selectFolder function --><br/><br/>&lt;ul class="folders" data-bind="foreach: folders"><br/>    &lt;li data-bind="text: $data,<br/>                   css: { selected: $data === $root.selectedFolder() },<br/>                   click: $root.selectFolder">&lt;/li><br/>&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];<br/>    this.selectedFolder = ko.observable(pane.data.folder);<br/><br/>    // We\'ve added a separate click handler to navigate<br/>    // when a folder is selected.<br/>    this.selectFolder = function (folder) {<br/>        self.selectedFolder(folder);<br/>        pane.navigate(\'mails\', { folder: folder });<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- The handlesNavigation binding tells Tribe to use that node for navigation. --><br/><br/>&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div><br/>&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.mails {<br/>    width: 100%;<br/>    table-layout: fixed;<br/>    border-spacing: 0;<br/>}<br/><br/>.mails th {<br/>    background-color: #bbb;<br/>    font-weight: bold;<br/>    color: #444;<br/>    text-shadow: #f7f7f7 0 1px 1px;<br/>}<br/><br/>.mails tbody tr:hover {<br/>    cursor: pointer;<br/>    background-color: #68c !important;<br/>    color: White;<br/>}<br/><br/>.mails th, .mails td {<br/>    text-align: left;<br/>    padding: 0.4em 0.3em;<br/>    white-space: nowrap;<br/>    overflow: hidden;<br/>    text-overflow: ellipsis;<br/>}<br/><br/>.mails td {<br/>    border: 0;<br/>}<br/><br/>.mails th {<br/>    border: 0;<br/>    border-left: 1px solid #ddd;<br/>    border-right: 1px solid #888;<br/>    padding: 0.4em 0 0.3em 0.7em;<br/>}<br/><br/>.mails th:nth-child(1), .mails td:nth-child(1) {<br/>    width: 20%;<br/>}<br/><br/>.mails th:nth-child(2), .mails td:nth-child(2) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:nth-child(3), .mails td:nth-child(3) {<br/>    width: 45%;<br/>}<br/><br/>.mails th:nth-child(4), .mails td:nth-child(4) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:last-child {<br/>    border-right: none;<br/>}<br/><br/>.mails tr:nth-child(even) {<br/>    background-color: #EEE;<br/>}<br/></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;table class="mails" data-bind="with: data"><br/>    &lt;thead><br/>        &lt;tr><br/>            &lt;th>From&lt;/th><br/>            &lt;th>To&lt;/th><br/>            &lt;th>Subject&lt;/th><br/>            &lt;th>Date&lt;/th><br/>        &lt;/tr><br/>    &lt;/thead><br/><br/>    &lt;tbody data-bind="foreach: mails"><br/>        &lt;tr><br/>            &lt;td data-bind="text: from">&lt;/td><br/>            &lt;td data-bind="text: to">&lt;/td><br/>            &lt;td data-bind="text: subject">&lt;/td><br/>            &lt;td data-bind="text: date">&lt;/td><br/>        &lt;/tr>     <br/>    &lt;/tbody><br/>&lt;/table></pre>'
});Samples = window.Samples || {};
Samples['Webmail/2-Mails'] = Samples['Webmail/2-Mails'] || [];
Samples['Webmail/2-Mails'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = ko.observable();<br/><br/>    // Load data using AJAX to our data property    <br/>    this.initialise = function() {<br/>        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">/* Some CSS to make our folder list pretty */<br/><br/>.folders { <br/>    background-color: #bbb; <br/>    list-style-type: none; <br/>    padding: 0; <br/>    margin: 0; <br/>    border-radius: 7px; <br/>    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d6d6d6),<br/>                                       color-stop(0.4, #c0c0c0), color-stop(1,#a4a4a4)); <br/>    margin: 10px 0 16px 0;<br/>    font-size: 0px;<br/>}<br/><br/>.folders li:hover {<br/>     background-color: #ddd;<br/>}    <br/><br/>.folders li:first-child {<br/>     border-left: none; <br/>     border-radius: 7px 0 0 7px;<br/>}<br/><br/>.folders li {<br/>     font-size: 16px; <br/>     font-weight: bold; <br/>     display: inline-block; <br/>     padding: 0.5em 1.5em; <br/>     cursor: pointer; <br/>     color: #444; <br/>     text-shadow: #f7f7f7 0 1px 1px; <br/>     border-left: 1px solid #ddd; <br/>     border-right: 1px solid #888;<br/>}<br/><br/>.folders li {<br/>     *display: inline !important;<br/>} /* IE7 only */<br/><br/>.folders .selected {<br/>     background-color: #444 !important; <br/>     color: white; <br/>     text-shadow: none; <br/>     border-right-color: #aaa; <br/>     border-left: none; <br/>     box-shadow: inset 1px 2px 6px #070707;<br/>}    <br/></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;ul class="folders" data-bind="foreach: folders"><br/>    &lt;li data-bind="text: $data,<br/>                   css: { selected: $data === $root.selectedFolder() },<br/>                   click: $root.selectFolder">&lt;/li><br/>&lt;/ul></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'folders.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.folders = [\'Inbox\', \'Archive\', \'Sent\', \'Spam\'];<br/>    this.selectedFolder = ko.observable(pane.data.folder);<br/><br/>    this.selectFolder = function (folder) {<br/>        self.selectedFolder(folder);<br/>        pane.navigate(\'mails\', { folder: folder });<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'index.html',
    icon: 'Images/icon.html.png',
    content: '<pre class="prettyprint">&lt;!DOCTYPE html><br/>&lt;html><br/>    &lt;head><br/>        &lt;title>&lt;/title><br/>        &lt;!-- Dependencies and bootstrap --><br/>    &lt;/head><br/><br/>    &lt;body data-bind="pane: \'layout\'"><br/>    &lt;/body><br/>&lt;/html></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'layout.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div data-bind="pane: \'folders\', data: { folder: \'Inbox\' }">&lt;/div><br/>&lt;div data-bind="pane: \'mails\', data: { folder: \'Inbox\' }, handlesNavigation: \'fade\'">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.mails {<br/>    width: 100%;<br/>    table-layout: fixed;<br/>    border-spacing: 0;<br/>}<br/><br/>.mails th {<br/>    background-color: #bbb;<br/>    font-weight: bold;<br/>    color: #444;<br/>    text-shadow: #f7f7f7 0 1px 1px;<br/>}<br/><br/>.mails tbody tr:hover {<br/>    cursor: pointer;<br/>    background-color: #68c !important;<br/>    color: White;<br/>}<br/><br/>.mails th, .mails td {<br/>    text-align: left;<br/>    padding: 0.4em 0.3em;<br/>    white-space: nowrap;<br/>    overflow: hidden;<br/>    text-overflow: ellipsis;<br/>}<br/><br/>.mails td {<br/>    border: 0;<br/>}<br/><br/>.mails th {<br/>    border: 0;<br/>    border-left: 1px solid #ddd;<br/>    border-right: 1px solid #888;<br/>    padding: 0.4em 0 0.3em 0.7em;<br/>}<br/><br/>.mails th:nth-child(1), .mails td:nth-child(1) {<br/>    width: 20%;<br/>}<br/><br/>.mails th:nth-child(2), .mails td:nth-child(2) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:nth-child(3), .mails td:nth-child(3) {<br/>    width: 45%;<br/>}<br/><br/>.mails th:nth-child(4), .mails td:nth-child(4) {<br/>    width: 15%;<br/>}<br/><br/>.mails th:last-child {<br/>    border-right: none;<br/>}<br/><br/>.mails tr:nth-child(even) {<br/>    background-color: #EEE;<br/>}<br/></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;table class="mails" data-bind="with: data"><br/>    &lt;thead><br/>        &lt;tr><br/>            &lt;th>From&lt;/th><br/>            &lt;th>To&lt;/th><br/>            &lt;th>Subject&lt;/th><br/>            &lt;th>Date&lt;/th><br/>        &lt;/tr><br/>    &lt;/thead><br/><br/>    &lt;tbody data-bind="foreach: mails"><br/>        &lt;tr data-bind="click: $root.selectMail"><br/>            &lt;td data-bind="text: from">&lt;/td><br/>            &lt;td data-bind="text: to">&lt;/td><br/>            &lt;td data-bind="text: subject">&lt;/td><br/>            &lt;td data-bind="text: date">&lt;/td><br/>        &lt;/tr>     <br/>    &lt;/tbody><br/>&lt;/table></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'mails.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = ko.observable();<br/><br/>    this.initialise = function () {<br/>        $.getJSON(\'Data/folder/\' + pane.data.folder, self.data);<br/>    };<br/>    <br/>    this.selectMail = function (mail) {<br/>        pane.navigate(\'viewMail\', mail);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.css',
    icon: 'Images/icon.css.png',
    content: '<pre class="prettyprint">.viewMail .mailInfo {<br/>    background-color: #dae0e8; <br/>    padding: 1em 1em 0.5em 1.25em; <br/>    border-radius: 1em;<br/>}<br/><br/>.viewMail .mailInfo h1 {<br/>    margin-top: 0.2em; <br/>    font-size: 130%;<br/>}<br/><br/>.viewMail .mailInfo label {<br/>    color: #777; <br/>    font-weight: bold; <br/>    min-width: 2.75em; <br/>    text-align:right; <br/>    display: inline-block;<br/>}<br/><br/>.viewMail .message {<br/>    padding: 0 1.25em;<br/>}</pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;div class="viewMail" data-bind="with: data"><br/>    &lt;div class="mailInfo"><br/>        &lt;h1 data-bind="text: subject">&lt;/h1><br/>        &lt;p>&lt;label>From&lt;/label>: &lt;span data-bind="text: from">&lt;/span>&lt;/p><br/>        &lt;p>&lt;label>To&lt;/label>: &lt;span data-bind="text: to">&lt;/span>&lt;/p><br/>        &lt;p>&lt;label>Date&lt;/label>: &lt;span data-bind="text: date">&lt;/span>&lt;/p><br/>        &lt;div class="message"><br/>            &lt;p data-bind="html: messageContent" />            <br/>        &lt;/div><br/>    &lt;/div><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['Webmail/3-Content'] = Samples['Webmail/3-Content'] || [];
Samples['Webmail/3-Content'].push({
    filename: 'viewMail.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/>    <br/>    this.data = ko.observable();<br/><br/>    this.initialise = function () {<br/>        $.getJSON(\'Data/mail/\' + pane.data.id, self.data);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function () {<br/>        // Dump the details object on screen for our viewer\'s pleasure.<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Tribe.Forms gives us a way of building simple forms <br/>     without needing a JavaScript model --><br/>&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;!-- Tribe.Forms gives us a way of building simple forms <br/>     without needing a JavaScript model --><br/>&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">PersonalFlow = function (flow) {<br/>    var details = { type: \'personal\' };         // An object to hold application details<br/>    <br/>    this.handles = {                            <br/>        onstart: flow.to(\'personal\'),<br/>        \'setAccount\': function(account) {       // As events occur, build up our details<br/>            details.account = account;          // object and flow through the process<br/>            flow.navigate(\'contact\');<br/>        },<br/>        \'setContact\': function(contact) {<br/>            details.contact = contact;<br/>            flow.navigate(\'confirm\', details);  // Our flow ends after navigating to the<br/>            flow.end();                         // confirmation pane.<br/>        }<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click \'Start\' to begin.&lt;/p><br/><br/>&lt;button data-bind="click: start">Start&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/1-Personal'] = Samples['CreditCard/1-Personal'] || [];
Samples['CreditCard/1-Personal'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    this.start = function () {<br/>        // panes expose a simple function for starting flows<br/>        pane.startFlow(PersonalFlow);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit (per card)\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 5">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter your business details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Business name\', <br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'abn\',<br/>                    displayText: \'ABN\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'BusinessFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">BusinessFlow2 = function (flow) {<br/>    var details = { type: \'business\' };<br/>    <br/>    this.handles = {<br/>        onstart: flow.to(\'businessDetails\'),<br/>        \'setBusiness\': function(business) {<br/>            details.business = business;<br/>            flow.navigate(\'businessAccount\');<br/>        },<br/>        \'setAccount\': function(account) {<br/>            details.account = account;<br/>            flow.navigate(\'contact\');<br/>        },<br/>        \'setContact\': function(contact) {<br/>            details.contact = contact;<br/>            flow.navigate(\'confirm\', details);<br/>            flow.end();<br/>        }<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function() {<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">PersonalFlow2 = function (flow) {<br/>    var details = { type: \'personal\' };<br/>    <br/>    this.handles = {<br/>        onstart: flow.to(\'personal\'),<br/>        \'setAccount\': function(account) {<br/>            details.account = account;<br/>            flow.navigate(\'contact\');<br/>        },<br/>        \'setContact\': function(contact) {<br/>            details.contact = contact;<br/>            flow.navigate(\'confirm\', details);<br/>            flow.end();<br/>        }<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click the required account type to begin.&lt;/p><br/><br/>&lt;button data-bind="click: personal">Personal&lt;/button><br/>&lt;button data-bind="click: business">Business&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/2-Business'] = Samples['CreditCard/2-Business'] || [];
Samples['CreditCard/2-Business'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    this.personal = function() {<br/>        pane.startFlow(PersonalFlow2);<br/>    };<br/><br/>    this.business = function () {<br/>        pane.startFlow(BusinessFlow2);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit (per card)\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 5">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter your business details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Business name\', <br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'abn\',<br/>                    displayText: \'ABN\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'BusinessFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">BusinessFlow3 = function (flow) {<br/>    var details = { type: \'business\' };<br/>    flow.startSaga(CreditCard, details);<br/><br/>    this.handles = {<br/>        onstart: flow.to(\'businessDetails\'),<br/>        \'setBusiness\': flow.to(\'businessAccount\'),<br/>        \'setAccount\': flow.to(\'contact\'),<br/>        \'setContact\': flow.endsAt(\'confirm\', details)<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="navigate: \'welcome\'">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div><br/></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function() {<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'CreditCard.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">CreditCard = function (saga, details) {<br/>    this.handles = {<br/>        \'setAccount\': function (account) {<br/>            details.account = account;<br/>        },<br/>        \'setBusiness\': function (business) {<br/>            details.business = business;<br/>        },<br/>        \'setContact\': function (contact) {<br/>            details.contact = contact;<br/>        }<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'PersonalFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">PersonalFlow3 = function (flow) {<br/>    var details = { type: \'personal\' };<br/>    flow.startSaga(CreditCard, details);<br/><br/>    this.handles = {<br/>        onstart: flow.to(\'personal\'),<br/>        \'setAccount\': flow.to(\'contact\'),<br/>        \'setContact\': flow.endsAt(\'confirm\', details)<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click the required account type to begin.&lt;/p><br/><br/>&lt;button data-bind="click: personal">Personal&lt;/button><br/>&lt;button data-bind="click: business">Business&lt;/button></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/3-Saga'] = Samples['CreditCard/3-Saga'] || [];
Samples['CreditCard/3-Saga'].push({
    filename: 'welcome.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    this.personal = function() {<br/>        pane.startFlow(PersonalFlow3);<br/>    };<br/><br/>    this.business = function () {<br/>        pane.startFlow(BusinessFlow3);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'businessAccount.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit (per card)\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 5">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'businessDetails.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter your business details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Business name\', <br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'abn\',<br/>                    displayText: \'ABN\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setBusiness\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'confirm.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p data-bind="with: data"><br/>    Thanks, <br/>    &lt;span data-bind="text: contact.name">&lt;/span>,<br/>    you are about to apply for a <br/>    &lt;span data-bind="text: type">&lt;/span> <br/>    credit card with a <br/>    $&lt;span data-bind="text: account.limit">&lt;/span> <br/>    limit.<br/>&lt;/p><br/>&lt;p><br/>    Please click \'Submit\' below to submit your application.  <br/>&lt;/p><br/>&lt;button data-bind="click: submit">Submit&lt;/button><br/>&lt;button data-bind="click: restart">Restart&lt;/button><br/>&lt;div data-bind="text: json">&lt;/div><br/></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'confirm.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function (pane) {<br/>    var self = this;<br/><br/>    this.data = pane.data;<br/>    this.json = ko.observable();<br/><br/>    this.submit = function() {<br/>        self.json(JSON.stringify(pane.data));<br/>    };<br/><br/>    this.restart = function() {<br/>        pane.startFlow(CreditCardFlow);<br/>    };<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'contact.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some contact details.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'name\',<br/>                    displayText: \'Name\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'email\',<br/>                    displayText: \'Email\',<br/>                    validate: { email: \'This\' }">&lt;/div><br/>    &lt;div data-bind="textField: \'phone\',<br/>                    displayText: \'Phone\'">&lt;/div><br/>    &lt;button data-bind="publish: \'setContact\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'CreditCard.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">CreditCard = function (saga, details) {<br/>    this.handles = {<br/>        \'startBusiness\': function() {<br/>            details.type = \'business\';<br/>        },<br/>        \'startPersonal\': function() {<br/>            details.type = \'personal\';<br/>        },<br/>        \'setAccount\': function (account) {<br/>            details.account = account;<br/>        },<br/>        \'setBusiness\': function (business) {<br/>            details.business = business;<br/>        },<br/>        \'setContact\': function (contact) {<br/>            details.contact = contact;<br/>        }<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'CreditCardFlow.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">CreditCardFlow = function (flow) {<br/>    var details = { };<br/>    flow.startSaga(CreditCard, details);<br/><br/>    this.handles = {<br/>        onstart: flow.to(\'welcome\'),<br/>        \'startBusiness\': {<br/>            onstart: flow.to(\'businessDetails\'),<br/>            \'setBusiness\': flow.to(\'businessAccount\'),<br/>            \'setAccount\': flow.to(\'contact\')<br/>        },<br/>        \'startPersonal\': {<br/>            onstart: flow.to(\'personal\'),<br/>            \'setAccount\': flow.to(\'contact\')<br/>        },<br/>        \'setContact\': flow.endsAt(\'confirm\', details)<br/>    };<br/>};</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'host.js',
    icon: 'Images/icon.js.png',
    content: '<pre class="prettyprint">TC.registerModel(function(pane) {<br/>    pane.startFlow(CreditCardFlow);<br/>});</pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'personal.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;p>Please enter some details about the account.&lt;/p><br/>&lt;div data-bind="form: {}, create: true"><br/>    &lt;div data-bind="textField: \'limit\',<br/>                    displayText: \'Card limit\',<br/>                    validate: { required: true }">&lt;/div><br/>    &lt;div data-bind="textField: \'cards\',<br/>                    displayText: \'# cards required\',<br/>                    defaultValue: 2">&lt;/div><br/>    &lt;button data-bind="publish: \'setAccount\', data: $data">Next&lt;/button><br/>&lt;/div></pre>'
});Samples = window.Samples || {};
Samples['CreditCard/4-Combined'] = Samples['CreditCard/4-Combined'] || [];
Samples['CreditCard/4-Combined'].push({
    filename: 'welcome.htm',
    icon: 'Images/icon.htm.png',
    content: '<pre class="prettyprint">&lt;h1>Bank of Tribe&lt;/h1><br/><br/>&lt;p>Welcome to the credit card application portal.&lt;/p><br/>&lt;p>Click the required account type to begin.&lt;/p><br/><br/>&lt;button data-bind="publish: \'startPersonal\'">Personal&lt;/button><br/>&lt;button data-bind="publish: \'startBusiness\'">Business&lt;/button><br/></pre>'
});