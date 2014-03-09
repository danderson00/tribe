sync({ directory: 'Source', clean: true }).to('node_modules/tribe');
sync({ directory: '../Common/Source' }).to('node_modules/tribe');
pack('../PubSub/Build/Tribe.PubSub.js').to('node_modules/tribe/pubsub.js');
sync('../Build/*.debug.js').to('node_modules/tribe/client/build/');

pack({
    include: T.scripts({ path: 'Source/client/*.js', domain: 'Tribe.Node', debug: true }),
    exclude: 'Source/client/build/*.js',
    first: 'setup.js'
}).to('node_modules/tribe/client/build/Tribe.Node.Client.debug.js');
