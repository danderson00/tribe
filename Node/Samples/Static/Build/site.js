
window.eval("\n\nT.scriptEnvironment = { resourcePath: '/layout' };\n\nT.registerModel(function (pane) {\n    var channel = pane.pubsub.channel('test').connect();\n\n    this.trigger = function () {\n        channel.publish('trigger');\n    };\n\n    channel.subscribe('response', function () {\n        $('body').append('<div>Response received</div>');\n    });\n});\n\n//@ sourceURL=tribe://Panes/layout.js");


//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<button data-bind="click: trigger">Trigger</button>\n', 'template--layout');