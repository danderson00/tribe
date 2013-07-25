$("<style/>").attr("class","__tribe").text(".messages{list-style:none;padding:0}.messages li{padding:5px}").appendTo("head"),$("<style/>").attr("class","__tribe").text("ul.welcome li{background:#103070;color:#fff;text-align:center;text-shadow:3px 3px 0 black,5px 5px 5px rgba(0,0,0,.5);font:bold 64pt 'Cambria'}").appendTo("head"),$("<style/>").attr("class","__tribe").text(".taskList{list-style:none;padding:0}.taskList li{padding:5px}").appendTo("head"),$("head").append('<script type="text/template" id="template--Chat-chat"><div data-bind="pane: \'sender\'"><\/div>\n<div data-bind="pane: \'messages\'"><\/div><\/script>'),$("head").append('<script type="text/template" id="template--Chat-messages"><ul class="messages" data-bind="foreach: messages">\n    <li>\n        <span data-bind="text: name"><\/span>:\n        <span data-bind="text: message"><\/span>\n    <\/li>\n<\/ul>\n<\/script>'),$("head").append('<script type="text/template" id="template--Chat-sender"><div class="chat">\n    <div>\n        Name: <input data-bind="value: name" />    \n    <\/div>\n\n    <div>\n        <input data-bind="value: message" />\n        <button data-bind="click: send">Send<\/button>\n    <\/div>\n<\/div><\/script>'),$("head").append('<script type="text/template" id="template--Mobile-layout"><div class="layout">\n    <ul class="rounded">\n        <li class="forward">Test1<\/li>\n        <li class="forward">Test2<\/li>\n        <li class="arrow" data-bind="click: function() {}">Test3<\/li>\n        <li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New Player...\', }"><\/li>\n    <\/ul>\n    \n    <div data-bind="pane: \'/Mobile/list\', data: listData"><\/div>\n    \n    <button class="white" data-bind="click: overlay">Overlay<\/button>\n    <button class="white" data-bind="click: toolbar">Toolbar<\/button>\n    <button class="white" data-bind="click: navigate">Navigate<\/button>\n<\/div><\/script>'),$("head").append('<script type="text/template" id="template--Mobile-navigate"><ul class="rounded">This is the pane you navigated to<\/ul><\/script>'),$("head").append('<script type="text/template" id="template--Mobile-overlay"><ul>\n    <li>One<\/li>\n    <li>Two<\/li>\n    <li>Three<\/li>\n    <li>Four<\/li>\n<\/ul>\n\n<button class="white" data-bind="click: function() { pane.remove(); }">Close<\/button><\/script>'),$("head").append('<script type="text/template" id="template--Mobile2-chat"><ul class="rounded" data-bind="pane: \'../Chat/chat\'">\n<\/ul><\/script>'),$("head").append('<script type="text/template" id="template--Mobile2-layout"><div>\n    <ul class="rounded">\n        <li class="arrow" data-bind="click: function() {}">Next<\/li>\n        <li data-bind="pane: \'/Mobile/editable\', data: { initialText: \'New...\', }"><\/li>\n    <\/ul>\n    \n    <div data-bind="pane: \'/Mobile/list\', data: listData"><\/div>\n    \n    <button class="white" data-bind="click: overlay">Overlay<\/button>\n<\/div><\/script>'),$("head").append('<script type="text/template" id="template--Mobile2-overlay"><ul>\n    <li>One<\/li>\n    <li>Two<\/li>\n    <li>Three<\/li>\n    <li>Four<\/li>\n<\/ul>\n\n<button class="white" data-bind="click: function() { pane.remove(); }">Close<\/button><\/script>'),$("head").append('<script type="text/template" id="template--Mobile2-welcome"><ul class="rounded welcome">\n    <li>tribe<\/li>\n<\/ul>\n<ul class="rounded">\n    <li data-bind="click: samples">Samples<\/li>\n<\/ul>\n<ul class="rounded">\n    <li data-bind="click: chat">Chat<\/li>\n<\/ul><\/script>'),$("head").append('<script type="text/template" id="template--Tasks-create"><input data-bind="value: task" />\n<button data-bind="click: create">Create<\/button><\/script>'),$("head").append('<script type="text/template" id="template--Tasks-layout"><h1>Todos<\/h1>\n\n<!-- Creating panes is simple -->\n<div data-bind="pane: \'create\'"><\/div>\n<div data-bind="pane: \'list\'"><\/div><\/script>'),$("head").append('<script type="text/template" id="template--Tasks-list"><!--Decompose your UI in a way that makes sense.\n    Panes can be nested as deep as you need. -->\n\n<ul class="taskList" data-bind="foreach: tasks">\n    <li data-bind="pane: \'task\', data: $data"><\/li>\n<\/ul><\/script>'),$("head").append('<script type="text/template" id="template--Tasks-task"><button data-bind="click: deleteTask">x<\/button>\n<span data-bind="text: task"><\/span><\/script>'),TC.scriptEnvironment={resourcePath:"/Chat/chat"},TC.registerModel(function(n){TMH.initialise(n.pubsub,"signalr"),TMH.joinChannel("chat",{serverEvents:["chat.*"]}),this.dispose=function(){TMH.leaveChannel("chat")}}),TC.scriptEnvironment={resourcePath:"/Chat/messages"},TC.registerModel(function(n){var t=this;this.messages=ko.observableArray(),n.pubsub.subscribe("chat.message",function(n){t.messages.push(n)})}),TC.scriptEnvironment={resourcePath:"/Chat/sender"},TC.registerModel(function(n){var t=this;this.name=ko.observable("Anonymous"),this.message=ko.observable(),this.send=function(){n.pubsub.publish("chat.message",{name:t.name(),message:t.message()}),t.message("")}}),TC.scriptEnvironment={resourcePath:"/Mobile/layout"},TC.registerModel(function(n){TC.toolbar.title("Title!"),TC.toolbar.options([{text:"test",func:function(){alert("test")}},{text:"test2",func:function(){alert("test2")}}]),this.listData={items:[{id:1,name:"test1"},{id:2,name:"test2"},{id:3,name:"test3"}],itemText:function(n){return n.id+": "+n.name},headerText:"Select Item:",itemClick:function(){},cssClass:"rounded"},this.overlay=function(){TC.overlay("overlay")},this.toolbar=function(){TC.toolbar.visible(!TC.toolbar.visible())},this.navigate=function(){n.navigate("navigate")}}),TC.scriptEnvironment={resourcePath:"/Mobile/navigate"},TC.registerModel(function(){TC.toolbar.title("Navigate!"),TC.toolbar.back(!0)}),TC.scriptEnvironment={resourcePath:"/Mobile2/layout"},TC.registerModel(function(){TC.toolbar.title("Title!"),TC.toolbar.options([{text:"test",func:function(){alert("test")}},{text:"test2",func:function(){alert("test2")}}]),this.listData={items:[{id:1,name:"test1"},{id:2,name:"test2"},{id:3,name:"test3"}],itemText:function(n){return n.id+": "+n.name},headerText:"Select Item:",itemClick:function(){},cssClass:"rounded"},this.overlay=function(){TC.overlay("overlay")},this.toolbar=function(){TC.toolbar.visible(!TC.toolbar.visible())}}),TC.scriptEnvironment={resourcePath:"/Mobile2/welcome"},TC.registerModel(function(n){TC.toolbar.defaults.back=!0,this.samples=function(){n.navigate("layout")},this.chat=function(){n.navigate("chat")}}),TC.scriptEnvironment={resourcePath:"/Tasks/create"},TC.registerModel(function(n){var t=this;this.task=ko.observable(),this.create=function(){n.pubsub.publish("task.create",t.task()),t.task("")}}),TC.scriptEnvironment={resourcePath:"/Tasks/list"},TC.registerModel(function(n){var t=this;this.tasks=ko.observableArray(["Sample task"]),n.pubsub.subscribe("task.create",function(n){t.tasks.push(n)}),n.pubsub.subscribe("task.delete",function(n){var i=t.tasks.indexOf(n);t.tasks.splice(i,1)})}),TC.scriptEnvironment={resourcePath:"/Tasks/task"},TC.registerModel(function(n){var t=this;this.task=n.data,this.deleteTask=function(){n.pubsub.publish("task.delete",t.task)}});