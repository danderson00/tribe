Navigation = {
    isHome: function(article) {
        return article && article.section === 'About' && article.topic === 'index';
    },
    Components: {
        'Composite': {
            'Panes': 'panes',
            'Navigation': 'navigation',
            'Transitions': 'transitions',
            'Lifecycle': 'lifecycle',
            'Sagas': 'sagas',
            'Testing': 'testing'
        },
        'PubSub': {},
        'MessageHub': {},
        'Mobile': {},
        'Forms': {},
        'Components': {},
    },
    Reference: {
        'API': {
            'Binding Handler': 'bindingHandler',
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