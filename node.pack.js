createModule('Tribe.Node', 'Tribe.Server', {
    "version": "0.1",
    "description": "Server component of the Tribe platform",
    "dependencies": {
        "express": "~3.4.4",
        "socket.io": "~0.9.16",
        "q-io": "~1.10.6"
    },
});

createModule('Tribe.PubSub', 'Tribe.PubSub', {
    "version": "0.2",
    "description": "Publish / subscribe engine with lifetimes and sagas",
});

function createModule(component, moduleName, definition) {
    var targetFolder = 'node_modules/' + moduleName + '/';
    sync('Build/Components/' + component + '.js').to(targetFolder);
    pack({ json: packageDefinition(definition, moduleName) }).to(targetFolder + 'package.json');

    function packageDefinition() {
        return _.extend({}, {
            "name": moduleName,
            "main": component + ".js",
            "homepage": "http://tribejs.com/",
            "author": {
                "name": "Dale Anderson",
                "email": "tribejs@gmail.com",
                "url": "https://github.com/danderson00"
            },
            "keywords": [
                "Tribe"
            ],
            "contributors": [
                {
                    "name": "Dale Anderson",
                    "email": "tribejs@gmail.com",
                    "url": "https://github.com/danderson00"
                }
            ],
            "bugs": {
                "url": "http://github.com/danderson00/Tribe/issues"
            },
            "license": {
                "type": "MIT",
                "url": "http://opensource.org/licenses/MIT"
            },
            "repository": {
                "type": "git",
                "url": "git://github.com/danderson00/Tribe.git"
            },
            "engines": {
                "node": ">=0.6.0",
            },
            "readme": "See http://tribejs.com/",
            "readmeFilename": "README.md",
        }, definition);
    }
}