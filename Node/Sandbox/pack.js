pack([
    T.scripts('Infrastructure', true),
    T.panes('Panes', true)
]).to('Build/site.js');

sync('../../Build/Tribe.debug.js').to('Dependencies');
sync('../Build/Client/Tribe.Node.Client.debug.js').to('Dependencies');
pack('Dependencies/*.js').to('Build/dependencies.js');

sync({ include: '../Source/Server/*.*', recursive: true }).to('node_modules/tribe');
sync({ include: '../../Common/Source/*.*', recursive: true }).to('node_modules/tribe/node_modules');