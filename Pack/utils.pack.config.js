this.platforms = {
    desktop: {
        folder: 'Desktop',
        targetFolder: '',
        name: 'desktop'
    },
    mobile: {
        folder: 'Mobile',
        targetFolder: 'm',
        name: 'mobile'
    }
};

this.platformExcludes = function(platform, extension) {
    var excludes = [];
    _.each(platforms, function (item) {
        if (item.name !== platform.name)
            excludes.push('*.' + item.name + '.' + extension);
    });
    return excludes;
};

this.modelPath = function (component, path, folder) {
    var componentPath = component ? component + '/' : '';
    var folderPath = folder ? folder + '/' : '';
    var modelPath = Path(path).withoutExtension().toString().replace(/\\/g, '/');	
    return Path(componentPath + folderPath + modelPath).makeAbsolute();
};

this.sourceUrlTag = function (path) {
    return ('//@ sourceURL=' + path).replace(/\\/g, '/');
};

this.modelScriptEnvironment = function (resourcePath) {
    return "TC.scriptEnvironment = { resourcePath: '" + resourcePath + "' };";
};

this.embedString = function (source) {
    return source.replace(/\r/g, "").replace(/\n/g, "\\n").replace(/\'/g, "\\'");
};