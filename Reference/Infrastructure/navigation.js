Navigation = {
    isHome: function(article) {
        return article && article.section === 'About' && article.topic === 'index';
    },
    Guides: {
        'Guides': {
            'Features': 'features',
            'Getting Started': 'gettingStarted'
        }
    },
    Reference: {
        'API': {
            'Panes': 'panes',
            'Global Options': 'options',
            'Core': 'core',
            'Utilities': 'utilities'
        },
        'Types': {
            'History': 'History',
            'Loader': 'Loader',
            'Logger': 'Logger',
            'Models': 'Models',
            'Node': 'Node',
            'Operation': 'Operation',
            'Pane': 'Pane',
            'Pipeline': 'Pipeline',
            'Saga': 'Saga',
            'Templates': 'Templates'
        },
        'PubSub': {
            'Core': 'core',
            'Lifetimes': 'lifetimes'
        },
        'MessageHub': {
            'Configuration': 'configuration',
            'Client API': 'client',
        },
        'Mobile': {},
        'Forms': {},
        'Components': {}
    }
};