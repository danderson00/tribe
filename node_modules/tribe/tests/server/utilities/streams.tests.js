suite('tribe.utilities.streams', function () {
    var streams, write, end;

    setup(function () {
        require.stub('through', function (fwrite, fend) {
            write = fwrite;
            end = fend;
        });
        require.refresh('tribe/utilities/streams');
        streams = require('tribe/utilities/streams');
    });

    test('throughTransform provides file from list if path matches', function () {
        var spy = sinon.spy(),
            files = [{ path: 'test' }],
            transform = streams.throughTransform(spy, files);

        transform('test');
        end.call({ queue: function () { } });
        expect(spy.callCount).to.equal(1);
        expect(spy.firstCall.args[1]).to.equal(files[0]);

        transform('test2');
        end.call({ queue: function () { } });
        expect(spy.callCount).to.equal(2);
        expect(spy.secondCall.args[1]).to.deep.equal({ path: 'test2' });
    });
});