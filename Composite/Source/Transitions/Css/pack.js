// I will add an 'outerTemplate' transform to PackScript that 
// wraps a template around the entire output rather than each file
// Until then, this templating needs to be done in two steps
pack({
    to: 'style.css',
    include: '*.css'
});

pack({
    to: 'style.css.js',
    include: 'style.css',
    template: 'T.Style'
});