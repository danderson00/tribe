module('passing tests');

test('passing test', function () {
    ok(true);
});

test('passing test2', function () {
    ok(true);
});

module('failing tests');

test('failing test', function () {
    ok(false);
});