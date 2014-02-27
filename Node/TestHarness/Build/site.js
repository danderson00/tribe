
window.eval("\n\nT.scriptEnvironment = { resourcePath: '/layout' };\n\nT.registerModel(function (pane) {\n    var self = this,\n        channel = pane.pubsub.channel('test').connect();\n\n    this.tests = ko.observableArray();\n\n    this.run = function () {\n        self.tests.splice(0, self.tests.length);\n        channel.publish('test.run');\n    };\n\n    channel.subscribe('test.done', function (test) {\n        self.tests.push(test);\n    });\n});\n\n//@ sourceURL=tribe://Panes/layout.js");


//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<button data-bind="click: run">Run</button>', 'template--layout');

//
window.__appendTemplate('\n<div></div>', 'template--test');