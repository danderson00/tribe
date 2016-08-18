var fs = require('fs'),
    child_process = require('child_process'),

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
    var modulePath = __dirname + '/node_modules/' + name,
        packageFilename = modulePath + '/package.json',
        package = require(packageFilename)
    package.version = incrementBuild(package.version)
    fs.writeFileSync(packageFilename, JSON.stringify(package, null, 2))
    //child_process.execSync('npm', ['publish', './node_modules/' + name])
})

function incrementBuild(version) {
    var parts = version.split('.')
    parts[2] = parseInt(parts[2]) + 1
    return parts.join('.')
}