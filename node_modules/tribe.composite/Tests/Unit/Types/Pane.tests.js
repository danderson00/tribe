(function() {
    module('Unit.Types.Pane');

    test("inheritPathFrom inherits path if pane path is relative", function () {
        var pane = new T.Types.Pane({ path: 'pane2' });
        pane.inheritPathFrom(wrap({ path: '/Test/pane1' }));
        equal(pane.path, '/Test/pane2');
    });

    test("inheritPathFrom doesn't inherit path if pane path is absolute", function () {
        var pane = new T.Types.Pane({ path: '/pane2' });
        pane.inheritPathFrom(wrap({ path: '/Test/pane1' }));
        equal(pane.path, '/pane2');
    });

    test("inheritPathFrom sets child folders from relative pane path", function () {
        var pane = new T.Types.Pane({ path: 'Test2/pane2' });
        pane.inheritPathFrom(wrap({ path: '/Test/pane1' }));
        equal(pane.path, '/Test/Test2/pane2');
    });
    
    function wrap(pane) {
        return {
            nodeForPath: function() {
                return { pane: pane };
            }
        };
    }
})();
