
window.eval("\nTestValue = 'test';\n//@ sourceURL=tribe://Infrastructure/setup.js");


window.eval("\n\nTC.scriptEnvironment = { resourcePath: '/layout' };\n\nTC.registerModel(function (pane) {\n    var self = this;\n\n    this.saga = ko.observable();\n    this.message = ko.observable();\n\n    this.initialise = function () {\n        return pane.pubsub.joinSaga('test', 'chat').done(self.saga);\n    };\n\n    this.send = function () {\n        pane.pubsub.publish('chat.message', self.message());\n    };\n});\n\n\n\n\n//var channel = pane.pubsub.channel('chat').connect();\n\n//this.message = ko.observable();\n//this.messages = ko.observableArray();\n\n//this.send = function() {\n//    channel.publish('message', self.message());\n//};\n\n//channel.subscribe('message', function(message) {\n//    self.messages.push(message);\n//});\n\n\n\n//@ sourceURL=tribe://Panes/layout.js");


//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<h1>Tribe Sandbox</h1>\n<input data-bind="value: message" />\n<button data-bind="click: send">Send</button>\n\n<ul data-bind="foreach: saga().data.messages">\n    <li data-bind="text: $data" />\n</ul>\n', 'template--layout');

window.eval("\n\nTC.scriptEnvironment = { resourcePath: '/chat' };\n\nTC.registerSaga(function (saga) {\n    saga.data = { messages: ko.observableArray() };\n\n    saga.handles = {\n        'chat.message': function (message) {\n            saga.data.messages.push(message);\n        }\n    };\n});\n\n//@ sourceURL=tribe://Sagas/chat.js");
