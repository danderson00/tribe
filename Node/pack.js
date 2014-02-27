pack({
    include: T.scripts({ path: 'Source/Client/*.js', domain: 'Tribe.Node' }),
    first: 'setup.js'
}).to(T.webTargets('Build/client/Tribe.Node.Client'));

sync({ directory: 'Source/Server' }).to('Build');
sync({ directory: '../Common/Source' }).to('Build');

pack('../PubSub/Build/Tribe.PubSub.js').to('Build/pubsub.js');
sync('../Build/*.js').to('Build/client');
sync({ directory: 'Templates' }).to('Build/templates');
sync({ directory: 'Source/Pack' }).to('Build/pack');
sync('package.json').to('Build');
sync('Source/bin/tribe').to('Build/bin');

sync({ directory: 'Build' }).to('Samples/Chat/node_modules/tribe');
sync({ directory: 'Build' }).to('Samples/Static/node_modules/tribe');
