(function () {
    module("Unit.Utilities.Path");

    test('Path handles empty arguments', function () {
        equal(TC.Path('').toString(), '');
        equal(TC.Path(undefined).toString(), '');
        equal(TC.Path(null).toString(), '');
    });

    test("withoutFilename", function () {
        equal(TC.Path("/folder/subfolder/filename.ext").withoutFilename().toString(), "/folder/subfolder/", "Path with slashes");
    });

    test("filename", function () {
        equal(TC.Path("filename.ext").filename().toString(), "filename.ext", "Filename");
        equal(TC.Path("/filename.ext").filename().toString(), "filename.ext", "Root path filename");
        equal(TC.Path("/folder/subfolder/filename.ext").filename().toString(), "filename.ext", "Path with slashes");
    });

    test("extension", function () {
        equal(TC.Path("filename.ext").extension().toString(), "ext", "Filename");
        equal(TC.Path("/filename.ext").extension().toString(), "ext", "Root path filename");
        equal(TC.Path("filename").extension().toString(), "", "Filename without extension");
        equal(TC.Path("/filename").extension().toString(), "", "Root path filename without extension");
        equal(TC.Path("filename.").extension().toString(), "", "Empty extension");
        equal(TC.Path("/folder/subfolder/filename.ext").extension().toString(), "ext", "Path with slashes");
    });

    test("withoutExtension", function () {
        equal(TC.Path("filename.ext").withoutExtension().toString(), "filename");
        equal(TC.Path("filename").withoutExtension().toString(), "filename");
        equal(TC.Path("/test/filename.ext").withoutExtension().toString(), "/test/filename");
        equal(TC.Path("/test/filename").withoutExtension().toString(), "/test/filename");
        equal(TC.Path("/test/filename.ext").filename().withoutExtension().toString(), "filename");
        equal(TC.Path("/test/filename").filename().withoutExtension().toString(), "filename");
    });

    test("Path objects can be concatenated with strings", function () {
        equal(TC.Path('/folder/filename.ext').withoutFilename() + 'new.ext', '/folder/new.ext');
    });

    test("isAbsolute", function () {
        ok(TC.Path("/test/").isAbsolute());
        ok(TC.Path("http://test/").isAbsolute());
        ok(!TC.Path("test/").isAbsolute());
        ok(!TC.Path("test.txt").isAbsolute());
        ok(!TC.Path("../test.txt").isAbsolute());
    });

    test("makeAbsolute", function () {
        equal(TC.Path("/test").makeAbsolute().toString(), "/test");
        equal(TC.Path("test").makeAbsolute().toString(), "/test");
        equal(TC.Path("test.txt").makeAbsolute().toString(), "/test.txt");
        equal(TC.Path("test/test.txt").makeAbsolute().toString(), "/test/test.txt");
    });

    test("makeRelative", function () {
        equal(TC.Path("test").makeRelative().toString(), "test");
        equal(TC.Path("/test").makeRelative().toString(), "test");
        equal(TC.Path("/test.txt").makeRelative().toString(), "test.txt");
        equal(TC.Path("/test/test.txt").makeRelative().toString(), "test/test.txt");
    });

    test("normalise", function () {
        equal(TC.Path('test').toString(), 'test');
        equal(TC.Path('../test').toString(), '../test');
        equal(TC.Path('test1/../test2').toString(), 'test2');
        equal(TC.Path('/test1/../test2').toString(), '/test2');
        equal(TC.Path('/test1/../test2/../test3').toString(), '/test3');
        equal(TC.Path('./test').toString(), 'test');
        equal(TC.Path('test1/./test2').toString(), 'test1/test2');
        equal(TC.Path('.././test1/../test2').toString(), '../test2');
        equal(TC.Path('http://test//test.htm').toString(), 'http://test/test.htm');
        equal(TC.Path('http://test///test//test.htm').toString(), 'http://test/test/test.htm');
        equal(TC.Path('1///2//3/4/5').toString(), '1/2/3/4/5');
    });

    test("asPathIdentifier", function () {
        equal(TC.Path('test.txt').asMarkupIdentifier().toString(), 'test');
        equal(TC.Path('test/test.txt').asMarkupIdentifier().toString(), 'test-test');
    });

    test("setExtension", function() {
        equal(TC.Path('/test/test').setExtension('js').toString(), '/test/test.js');
        equal(TC.Path('/test/test.txt').setExtension('js').toString(), '/test/test.js');
    });

    test("combine", function() {
        equal(TC.Path('/test/').combine('/test.txt').toString(), '/test/test.txt');
        equal(TC.Path('http://test/').combine('/test.txt').toString(), 'http://test/test.txt');
        equal(TC.Path('/1/').combine('/2/').combine('/test.txt').toString(), '/1/2/test.txt');
        equal(TC.Path('').combine('test.txt').toString(), 'test.txt');
    });
})();
