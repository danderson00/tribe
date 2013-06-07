(function () {
    this.script = function(component, folder) {
        return templateObject('script', component, folder);
    };

    function templateObject(template, component, folder) {
        return {
            name: template,
            data: { component: component, folder: folder }
        };
    }
})();
