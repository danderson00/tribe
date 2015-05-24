var activities = require('tribe/build/activities');

suite('tribe.build.activities', function () {
    test('tasks can be created from registered activities', function () {
        var stub = sinon.stub().returns('step');
        activities.register('test', stub);
        var step = activities.createTask({ activity: 'test', options: 'options' });

        expect(step).to.equal('step');
        expect(stub.calledOnce).to.be.true;
        expect(stub.firstCall.args[0]).to.equal('options');
    });
});