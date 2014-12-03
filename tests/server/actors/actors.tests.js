﻿suite('tribe.actors', function () {
    var api = require('tribe/actors');

    test("definitions can be retrieved for registered actors", function () {
        api.register('actorPath', function (actor) {
            actor.isDistributed();
            actor.handles = {
                'topic1': function () { },
                'topic2': function () { }
            };
            actor.isScopedTo('property');
        });

        expect(api.definition('actorPath')).to.deep.equal({
            path: '/actorPath',
            expression: [{ p: 'data.property', v: undefined }],
            topics: ['topic1', 'topic2'],
            isDistributed: true,
            dependencies: undefined
        });

        expect(api.indexes()).to.deep.equal(['data.property']);
    });

    test("dependencies can be registered by calling actor.requires", function () {
        api.register('parent', function () {
            this.test = 'test';
        });

        api.register('child', function (actor) {
            var parent = actor.requires('parent');
            this.test = parent.test;
        });

        expect(api.definition('child').dependencies).to.deep.equal(['/parent']);
    })
});