﻿var serializer = require('tribe/utilities/serializer');

suite('tribe.utilities.serializer', function () {
    test("extractMetadata adds observables to metadata", function () {
        var result = serializer.extractMetadata({
            p1: 1,
            p2: ko.observable(2),
            p3: ko.observableArray()
        });
        expect(result.metadata.observables).to.deep.equal(['p2', 'p3']);
    });

    test("extractMetadata constructs recursive property expressions", function () {
        var result = serializer.extractMetadata({ p1: { p2: ko.observable(1) } });
        expect(result.metadata.observables).to.deep.equal(['p1.p2']);
    });

    test("extractMetadata constructs array property expressions", function () {
        var result = serializer.extractMetadata({ p1: [{ p2: ko.observable(1) }, ko.observable(2)], p2: ko.observableArray([{ p3: ko.observable(3) }]) });
        expect(result.metadata.observables).to.deep.equal(['p1[0].p2', 'p1[1]', 'p2', 'p2[0].p3']);
    });

    test("applyMetadata converts target values to observables", function () {
        var result = serializer.applyMetadata({
            p1: 1,
            p2: 2,
            p3: [3]
        }, { observables: ['p2', 'p3'] });
        expect(ko.isObservable(result.p2)).to.be.true;
        expect(ko.isObservable(result.p3)).to.be.true;
        expect(result.p3.push).to.be.a('function');
        expect(result.p1).to.equal(1);
        expect(result.p2()).to.equal(2);
        expect(result.p3()[0]).to.equal(3);
    });

    test("applyMetadata converts recursive property expressions", function () {
        var result = serializer.applyMetadata({ p1: { p2: 1 } }, { observables: ['p1.p2'] });
        expect(ko.isObservable(result.p1.p2)).to.be.true;
        expect(result.p1.p2()).to.equal(1);
    });

    test("applyMetadata converts array property expressions", function () {
        var result = serializer.applyMetadata({ p1: [{ p2: 1 }, 2], p2: [{ p3: 3 }] }, { observables: ['p1[0].p2', 'p1[1]', 'p2', 'p2[0].p3'] });
        expect(ko.isObservable(result.p1[0].p2)).to.be.true;
        expect(ko.isObservable(result.p1[1])).to.be.true;
        expect(ko.isObservable(result.p2)).to.be.true;
        expect(ko.isObservable(result.p2()[0].p3)).to.be.true;
        expect(result.p1[0].p2()).to.equal(1);
        expect(result.p1[1]()).to.equal(2);
        expect(result.p2()[0].p3()).to.equal(3);
    });

    test("integration", function () {
        var serialized = serializer.serialize({
                p1: ko.observable({ p2: ko.observable(2) }),
                p2: ko.observableArray([{ p3: ko.observable(3) }]),
                p3: ko.observable()
            }),
            deserialized = serializer.deserialize(serialized);

        expect(ko.isObservable(deserialized.p1)).to.be.true;
        expect(ko.isObservable(deserialized.p1().p2)).to.be.true;
        expect(ko.isObservable(deserialized.p2)).to.be.true;
        expect(ko.isObservable(deserialized.p2()[0].p3)).to.be.true;
        expect(ko.isObservable(deserialized.p3)).to.be.true;

        expect(deserialized.p1().p2()).to.equal(2);
        expect(deserialized.p2()[0].p3()).to.equal(3);
        expect(deserialized.p3()).to.be.undefined;
    });

    //test("observables as target serialise correctly", function () {
    //    var serialized = serializer.serialize(ko.observable(5)),
    //        deserialized = serializer.deserialize(serialized);
    //    expect(ko.isObservable(deserialized)).to.be.true;
    //});
});
