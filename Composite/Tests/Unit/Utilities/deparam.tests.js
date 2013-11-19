(function () {
    // these are based on tests from https://github.com/cowboy/jquery-bbq/, Copyright (c) 2010 "Cowboy" Ben Alman and also released under the MIT license
    module('Unit.Utilities.deparam');
    
    var params_obj = { a: ['4', '5', '6'], b: { x: ['7'], y: '8', z: ['9', '0', 'true', 'false', 'undefined', ''] }, c: '1' },
        params_obj_coerce = { a: [4, 5, 6], b: { x: [7], y: 8, z: [9, 0, true, false, undefined, ''] }, c: 1 },
        params_str = 'a[]=4&a[]=5&a[]=6&b[x][]=7&b[y]=8&b[z][]=9&b[z][]=0&b[z][]=true&b[z][]=false&b[z][]=undefined&b[z][]=&c=1';

    test("deparam deserialises string correctly", function() {
        deepEqual(TC.Utils.deparam(params_str), params_obj);
    });

    test("deparam deserialises string correctly and coerces types", function () {
        deepEqual(TC.Utils.deparam(params_str, true), params_obj_coerce);
    });
})();