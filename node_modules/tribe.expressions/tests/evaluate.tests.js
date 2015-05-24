suite('tribe.expressions.evaluate', function () {
    var evaluate = require('tribe.expressions/evaluate');

    test("evalute equality", function () {
        expect(evaluate({ p: 'nested.value', v: 1 }, { nested: { value: 1 } })).to.be.true;
        expect(evaluate({ p: 'value', o: '=', v: 1 }, { value: 1 })).to.be.true;
        expect(evaluate({ p: 'value', o: '=', v: undefined }, { value: undefined })).to.be.true;
        expect(evaluate({ p: 'value', o: '=', v: undefined }, { value: null })).to.be.false;
    });

    test("evalute bounds", function () {
        expect(evaluate({ p: 'value', o: '>', v: 1 }, { value: 2 })).to.be.true;
        expect(evaluate({ p: 'value', o: '>', v: 1 }, { value: 1 })).to.be.false;
        expect(evaluate({ p: 'value', o: '>=', v: 1 }, { value: 1 })).to.be.true;
        expect(evaluate({ p: 'value', o: '>=', v: 1 }, { value: 0 })).to.be.false;
        expect(evaluate({ p: 'value', o: '<', v: 1 }, { value: 0 })).to.be.true;
        expect(evaluate({ p: 'value', o: '<', v: 1 }, { value: 1 })).to.be.false;
        expect(evaluate({ p: 'value', o: '<=', v: 1 }, { value: 1 })).to.be.true;
        expect(evaluate({ p: 'value', o: '<=', v: 1 }, { value: 2 })).to.be.false;
    });

    test("evalute in", function () {
        expect(evaluate({ p: 'value', o: 'in', v: [1, 2, 3] }, { value: 2 })).to.be.true;
        expect(evaluate({ p: 'value', o: 'in', v: [1, 2, 3] }, { value: 4 })).to.be.false;
        expect(evaluate({ p: 'value', o: 'in', v: 'full string' }, { value: 'll st' })).to.be.true;
        expect(evaluate({ p: 'value', o: 'in', v: 'full string' }, { value: 'llst' })).to.be.false;
    });

    test("evalute contains", function () {
        expect(evaluate({ p: 'value', o: 'contains', v: 2 }, { value: [1, 2, 3] })).to.be.true;
        expect(evaluate({ p: 'value', o: 'contains', v: 4 }, { value: [1, 2, 3] })).to.be.false;
        expect(evaluate({ p: 'value', o: 'contains', v: 'll st' }, { value: 'full string' })).to.be.true;
        expect(evaluate({ p: 'value', o: 'contains', v: 'llst' }, { value: 'full string' })).to.be.false;
    });

    test("evaluate array of expressions", function () {
      expect(evaluate([{ p: 'v1', o: '=', v: 1 }, { p: 'v2', o: '=', v: 2 }], { v1: 1, v2: 2 })).to.be.true;
      expect(evaluate([{ p: 'v1', o: '=', v: 1 }, { p: 'v2', o: '=', v: 2 }], { v1: 1, v2: 1 })).to.be.false;
    });
});
