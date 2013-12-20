window.eval("TestValue = 'test';\n//@ sourceURL=tribe://Infrastructure/setup.js");

window.eval("TC.scriptEnvironment = { resourcePath: '/layout' };\nTC.registerModel(function (pane) {\n    var self = this;\n    var channel = pane.pubsub.channel('chat').connect();\n\n    this.message = ko.observable();\n    this.messages = ko.observableArray();\n    \n    this.send = function() {\n        channel.publish('message', self.message());\n    };\n\n    channel.subscribe('message', function(message) {\n        self.messages.push(message);\n    });\n});\n\n//@ sourceURL=tribe://Panes/layout.js");

//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('<input data-bind="value: message" />\n<button data-bind="click: send">Send</button>\n<ul data-bind="foreach: messages">\n    <li data-bind="text: $data" />\n</ul>', 'template--layout');