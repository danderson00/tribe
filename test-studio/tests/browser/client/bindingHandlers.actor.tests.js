suite('tribe.client.bindingHandlers.actor', function () {
    test("actor is obtained and bound before renderOperation completes", function () {
        var node = T.createNode('body', { path: '/tests/browserTest' });
        expect($('body span').text()).to.equal('');
        return node.pane.is.rendered.then(function () {
            expect($('body span').text()).to.equal('unset');
        });
    });

    test("actor responds to messages after binding", function () {
        var node = T.createNode('body', { path: '/tests/browserTest' });
        return node.pane.is.rendered.then(function () {
            node.pane.pubsub.publish('browserTest.setValue', 'testValue');
            expect($('body span').text()).to.equal('testValue');
        });
    });
});