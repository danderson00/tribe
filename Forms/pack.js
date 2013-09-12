pack({
    include: [
        T.scripts({ path: 'Dependencies', domain: 'Tribe.Forms' }),
        T.scripts({ path: 'Infrastructure', domain: 'Tribe.Forms' }),
        T.scripts({ path: 'BindingHandlers', domain: 'Tribe.Forms' }),
        T.templates({ path: 'Templates', prefix: 'Forms' }),
        T.styles('Css')
    ]
}).to(T.webTargets('Build/Tribe.Forms'));