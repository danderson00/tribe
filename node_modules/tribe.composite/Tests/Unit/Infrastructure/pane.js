Test.pane = function () {
    return {
        path: 'test',
        element: '#qunit-fixture',
        model: {
            initialise: sinon.spy(),
            paneRendered: sinon.spy()
        },
        startRender: function () { },
        endRender: function () { },
        dispose: function () { }
    };
};