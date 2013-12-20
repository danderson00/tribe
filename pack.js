zip({
    to: 'Tribe.zip',
    include: 'Build/*.*',
    recursive: true
});

pack([T.webDependency('Composite/Build/Tribe.Composite')])
.to(T.webTargets('Build/Tribe'));