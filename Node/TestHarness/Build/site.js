
window.eval("\n\nT.scriptEnvironment = { resourcePath: '/layout' };\n\nT.registerModel(function (pane) {\n    var self = this,\n        channel = pane.pubsub.channel('__test').connect();\n\n    this.renderComplete = function () {\n        channel.publish('test.run');\n    };\n\n    this.tests = ko.observableArray();\n\n    this.run = function () {\n        self.tests.splice(0, self.tests().length);\n        channel.publish('test.run');\n    };\n\n    channel.subscribe('test.complete', function (test) {\n        self.tests.push(test);\n    });\n\n    channel.subscribe('test.error', function (error) {\n        self.tests.push(testFromError(error));\n    });\n\n    function testFromError(error) {\n        return {\n            module: 'Error running tests',\n            failed: 1,\n            passed: 0,\n            total: 1,\n            assertions: [\n                {\n                    message: error,\n                    result: false\n                }\n            ]\n        };\n    }\n});\n\n//@ sourceURL=http://Panes/layout.js");


window.eval("\n\nT.scriptEnvironment = { resourcePath: '/test' };\n\nT.registerModel(function (pane) {\n    var self = this,\n        test = pane.data;\n\n    this.test = test;\n    this.pass = test.state === 'passed';\n    this.fail = test.state === 'failed';\n    this.details = 'Filename: ' + test.filename + (test.error ? '<br/>' + test.error : '').replace(/\\n/g, '<br/>');\n    this.fixture = test.fixture ?\n        test.fixture.join('.') :\n        'No fixture';\n\n    this.showDetails = ko.observable(this.pass !== true);\n\n    this.toggleDetails = function () {\n        self.showDetails(!self.showDetails());\n    };\n\n});\n\n//@ sourceURL=http://Panes/test.js");


//
window.__appendTemplate = function (content, id) {
    var element = document.createElement('script');
    element.className = '__tribe';
    element.setAttribute('type', 'text/template');
    element.id = id;
    element.text = content;
    document.getElementsByTagName('head')[0].appendChild(element);
};//
window.__appendTemplate('\n<button data-bind="click: run">Run</button>\n<div data-bind="foreach: tests">\n    <div data-bind="pane: \'test\', data: $data"></div>\n</div>', 'template--layout');

//
window.__appendTemplate('\n<div class="test" data-bind="css: { pass: pass, fail: fail }">\n    <div class="summary" data-bind="click: toggleDetails">\n        <span data-bind="text: fixture"></span>: \n        <span data-bind="text: test.name"></span> - \n        <span data-bind="text: test.state"></span>\n    </div>\n    <div class="details" data-bind="visible: showDetails">\n        <span data-bind="html: details"></span>\n    </div>\n</div>', 'template--test');

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
window.__appendStyle('body{font-family:"Helvetica Neue Light","HelveticaNeue-Light","Helvetica Neue",Calibri,Helvetica,Arial,sans-serif}');

//
window.__appendStyle('.test{border:2px solid lightgray;margin-top:10px}.test.fail{border:2px solid salmon}.test.pass{border:2px solid lightgreen}.test .summary{padding:2px 10px;cursor:pointer}.test.pass .summary{background:lightgreen}.test.fail .summary{background:salmon}.details{margin:0;padding:5px;background:white}');