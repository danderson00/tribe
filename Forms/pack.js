pack({
    include: [
        T.scripts({ path: 'Dependencies', domain: 'Tribe.Mobile' }),
        T.scripts({ path: 'Infrastructure', domain: 'Tribe.Mobile' }),
        T.scripts({ path: 'Binding Handlers', domain: 'Tribe.Mobile' }),
        T.templates('Templates'),
        T.styles('Css')
    ]
}).to(T.webTargets('Build/Tribe.Forms'));