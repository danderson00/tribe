Navigation = {
    isHome: function(article) {
        return article && article.section === 'About' && article.topic === 'index';
    },
    Guides: {
        'Guides': {
            'Features': 'features',
            'Getting Started': 'gettingStarted',
            'Configuring MessageBus': 'messageBus',
            'Webmail Tutorial': 'webmail'
        }
    },
    Reference: {
        'Core': {
            'Panes': 'panes',
            'Global Options': 'options',
            'API': 'api'
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
        'Utilities': {
            'Panes': 'panes',
            'Paths': 'paths',
            'Events': 'events',
            'Embedded State': 'embeddedState',
            'Objects': 'objects',
            'Collections': 'collections',
            'Miscellaneous': 'misc'
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