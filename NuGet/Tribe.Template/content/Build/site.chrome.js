window.eval("$('<style/>')\n    .attr('class', '__tribe')\n    .text('.chat{position:fixed;top:70px;right:10px;padding:10px;height:300px;width:160px;border:1px solid #000}')\n    .appendTo('head');\n");
window.eval("$('<style/>')\n    .attr('class', '__tribe')\n    .text('')\n    .appendTo('head');\n");
window.eval("$('head')\n    .append('<script type=\"text/template\" id=\"template--chat\"><div class=\"chat\">\\n    <input data-bind=\"value: message\" /><br />\\n    <button data-bind=\"click: send\">Send Message</button>\\n    <ul data-bind=\"foreach: messages\">\\n        <li data-bind=\"text: $data\"></li>\\n    </ul>\\n</div></script>');\n");
window.eval("$('head')\n    .append('<script type=\"text/template\" id=\"template--header\"><h1>Application Name</h1></script>');\n");
window.eval("$('head')\n    .append('<script type=\"text/template\" id=\"template--home\"><p>\\n    Welcome to my web application!\\n</p></script>');\n");
window.eval("$('head')\n    .append('<script type=\"text/template\" id=\"template--layout\"><div data-bind=\"pane: \\'header\\'\"></div>\\n<div data-bind=\"pane: \\'home\\', handlesNavigation: \\'fade\\'\"></div>\\n<div data-bind=\"pane: \\'chat\\'\"></div></script>');\n");
window.eval("TC.scriptEnvironment = { resourcePath: '/chat' };\nTC.registerModel(function(pane) {\n    var self = this;\n\n    TMH.initialise(pane.pubsub);\n    TMH.joinChannel('chat', { serverEvents: ['chat.*'] });\n\n    this.message = ko.observable();\n    this.messages = ko.observableArray();\n\n    this.send = function () {\n        pane.pubsub.publish('chat.message', self.message());\n    };\n\n    pane.pubsub.subscribe('chat.message', function (message) {\n        self.messages.push(message);\n    });\n});\n//@ sourceURL=tribe://Panes/chat.js\n");
// Any .js file in the Infrastructure folder will be included in the build
$('<style/>')
    .attr('class', '__tribe')
    .text('body{font-family:\'Segoe UI\',\'Trebuchet MS\',Arial,Helvetica,Verdana,sans-serif}')
    .appendTo('head');
