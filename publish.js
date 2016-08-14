var fs = require('fs'),

    modules = [
        'tribe',
        'tribe.composite',
        'tribe.expressions',
        'tribe.logger',
        'tribe.pubsub',
        'tribe.rx',
        'tribe.storage',
    ]

modules.forEach(name => {
    var packageFilename = __dirname + '/node_modules/' + name + '/package.json',
        package = require(packageFilename)
    package.version = incrementBuild(package.version)
    fs.writeFileSync(packageFilename, JSON.stringify(package, null, 2))
})

function incrementBuild(version) {
    var parts = version.split('.')
    parts[2] = parseInt(parts[2]) + 1
    return parts.join('.')
}