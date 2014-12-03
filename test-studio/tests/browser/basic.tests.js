﻿suite('tribe.test-studio.browser.basic', function () {
    test('test', function () {
        expect('yes').to.be.ok;
    });

    test('jquery', function () {
        $('body').append('<span>Test</span>');
        expect($('body span').text()).to.equal('Test');
    });

    test('model', function () {
        var model = new (T.context().models['/fixture'].constructor)({ data: 'fixture' });
        expect(model.fixture).to.equal('fixture');
    });

    test('pane', function () {
        T.createNode('body', { path: '/fixture', data: { fixtures: [{}] } });
        expect($('div').length).to.equal(5);
    });
});
