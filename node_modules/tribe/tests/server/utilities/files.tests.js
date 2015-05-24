var files = require('tribe/utilities/files'),
    path = require('path'),
    Q = require('q'),
    filePath = path.resolve(__dirname, '../../files/files');

suite('tribe.utilities.files', function () {
    test("listTree lists files in directory recursively", function () {
        return files.listTree(filePath)
            .then(function (list) {
                expect(list.length).to.equal(3);
            });
    });

    test("listTree does not recurse if requested", function () {
        return files.listTree(filePath, null, false)
            .then(function (list) {
                expect(list.length).to.equal(2);
            });
    });

    test("listTree filters with strings", function () {
        return files.listTree(filePath, 'st.j')
            .then(function (list) {
                expect(list.length).to.equal(1);
                expect(list[0]).to.have.string('test.js');
            });
    });

    test("listTree filters with regular expressions", function () {
        return files.listTree(filePath, /\.js$/)
            .then(function (list) {
                expect(list.length).to.equal(1);
                expect(list[0]).to.have.string('test.js');
            });
    });

    test("enumerateFiles executes callback for each file in directory", function () {
        var spy = sinon.spy();
        return files.enumerateFiles(filePath, spy)
            .then(function () {
                expect(spy.callCount).to.equal(3);
            });
    });

    test("enumerateFiles waits for returned promises to resolve", function () {
        var count = 0;
        function delay() {
            var deferred = Q.defer();
            setTimeout(function () {
                count++;
                deferred.resolve();
            }, 10);
            return deferred.promise;
        }

        return files.enumerateFiles(filePath, delay)
            .then(function () {
                expect(count).to.equal(3);
            });
    });
});