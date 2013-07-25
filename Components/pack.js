//build('desktop');
//build('mobile');

//function build(platform) {
//    pack(component('Common', platform, 'Build/'));

//    pack({
//        to: 'Build/Tribe.Components.' + platform + '.js',
//        include: [
//            { files: 'Build/Common.' + platform + '.js' },
//            { files: 'Build/Common.' + platform + '.htm', template: 'embedHeaderContent' },
//            { files: 'Build/Common.' + platform + '.css', template: 'embedCss' }
//        ]
//    });

//    pack({
//        to: 'Build/Tribe.Components.' + platform + '.min.js',
//        include: 'Build/Tribe.Components.' + platform + '.js',
//        minify: true
//    });
//}

//pack({
//    to: 'samples.js',
//    include: 'Samples/*.*',
//    template: 'sampleTabContent'
//});
