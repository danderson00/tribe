
window.eval("\n\nTC.scriptEnvironment = { resourcePath: '/chat' };\n\nTC.registerModel(function (pane) {\n    var self = this;\n    var channel = pane.pubsub.channel(pane.data.channel);\n\n    this.message = ko.observable();\n    this.channel = pane.data.channel;\n    this.username = pane.data.username;\n\n    this.initialise = function () {\n        return channel.joinSaga(pane.data.channel, 'chat').done(function (saga) {\n            self.messages = saga.data.messages;\n        });\n    };\n\n    this.send = function () {\n        channel.publish('chat.message', pane.data.username + ': ' + self.message());\n    };\n\n    this.close = function () {\n        pane.remove();\n    };\n});\n\n//@ sourceURL=tribe://Panes/chat.js");


window.eval("\n\nTC.scriptEnvironment = { resourcePath: '/layout' };\n\nTC.registerModel(function (pane) {\n    var self = this;\n\n    this.channel = ko.observable('chat');\n    this.username = ko.observable('Anonymous');\n    this.join = function () {\n        TC.appendNode('.channels', { path: 'chat', data: { channel: self.channel(), username: self.username() }});\n    };\n});\n\n//@ sourceURL=tribe://Panes/layout.js");


//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<div class="chat">\n    <div>Channel: <span data-bind="text: channel"></span></div>\n    <div>Username: <span data-bind="text: username"></span></div>\n    <div>\n        <input data-bind="value: message" />\n        <button data-bind="click: send">Send</button>\n        <button data-bind="click: close">Close</button>\n    </div>\n    <ul data-bind="foreach: messages">\n        <li data-bind="text: $data" />\n    </ul>\n</div>', 'template--chat');

//
window.__appendTemplate('\nChannel to join <input data-bind="value: channel" />\nUsername: <input data-bind="value: username" />\n<button data-bind="click: join">Join</button>\n\n<div class="channels"></div>\n', 'template--layout');

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
window.__appendStyle('.chat{border:1px solid black;float:left;margin:5px;padding:5px}');

window.eval("\n\nTC.scriptEnvironment = { resourcePath: '/chat' };\n\nTC.registerSaga(function (saga) {\n    saga.data = { messages: ko.observableArray() };\n\n    saga.handles = {\n        'chat.message': function (message) {\n            saga.data.messages.push(message);\n        }\n    };\n});\n\n//@ sourceURL=tribe://Sagas/chat.js");
