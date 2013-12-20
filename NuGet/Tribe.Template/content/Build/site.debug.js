window.eval("TC.scriptEnvironment = { resourcePath: '/chat' };\nTC.registerModel(function(pane) {\n    var self = this;\n\n    TMH.initialise(pane.pubsub);\n    TMH.joinChannel('chat', { serverEvents: ['chat.*'] });\n\n    this.message = ko.observable();\n    this.messages = ko.observableArray();\n\n    this.send = function () {\n        pane.pubsub.publish('chat.message', self.message());\n    };\n\n    pane.pubsub.subscribe('chat.message', function (message) {\n        self.messages.push(message);\n    });\n});\n\n//@ sourceURL=tribe://Panes/chat.js");

//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('<div class="chat">\n    <input data-bind="value: message" /><br />\n    <button data-bind="click: send">Send Message</button>\n    <ul data-bind="foreach: messages">\n        <li data-bind="text: $data"></li>\n    </ul>\n</div>', 'template--chat');
//
window.__appendTemplate('<h1>Application Name</h1>', 'template--header');
//
window.__appendTemplate('<p>\n    Welcome to my web application!\n</p>', 'template--home');
//
window.__appendTemplate('<div data-bind="pane: \'header\'"></div>\n<div data-bind="pane: \'home\', handlesNavigation: \'fade\'"></div>\n<div data-bind="pane: \'chat\'"></div>', 'template--layout');
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
window.__appendStyle('.chat{position:fixed;top:70px;right:10px;padding:10px;height:300px;width:160px;border:1px solid black}');
//
window.__appendStyle('');
window.eval("// Any .js file in the Infrastructure folder will be included in the build\n\n//@ sourceURL=tribe://Infrastructure/setup.js");

//
window.__appendStyle('body{font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif}');