(function () {
    module("Unit.Utilities.Path");

    test('Path handles empty arguments', function () {
        equal(T.Path('').toString(), '');
        equal(T.Path(undefined).toString(), '');
        equal(T.Path(null).toString(), '');
    });

    test("withoutFilename", function () {
        equal(T.Path("/folder/subfolder/filename.ext").withoutFilename().toString(), "/folder/subfolder/", "Path with slashes");
    });

    test("filename", function () {
        equal(T.Path("filename.ext").filename().toString(), "filename.ext", "Filename");
        equal(T.Path("/filename.ext").filename().toString(), "filename.ext", "Root path filename");
        equal(T.Path("/folder/subfolder/filename.ext").filename().toString(), "filename.ext", "Path with slashes");
    });

    test("extension", function () {
        equal(T.Path("filename.ext").extension().toString(), "ext", "Filename");
        equal(T.Path("/filename.ext").extension().toString(), "ext", "Root path filename");
        equal(T.Path("filename").extension().toString(), "", "Filename without extension");
        equal(T.Path("/filename").extension().toString(), "", "Root path filename without extension");
        equal(T.Path("filename.").extension().toString(), "", "Empty extension");
        equal(T.Path("/folder/subfolder/filename.ext").extension().toString(), "ext", "Path with slashes");
    });

    test("withoutExtension", function () {
        equal(T.Path("filename.ext").withoutExtension().toString(), "filename");
        equal(T.Path("filename").withoutExtension().toString(), "filename");
        equal(T.Path("/test/filename.ext").withoutExtension().toString(), "/test/filename");
        equal(T.Path("/test/filename").withoutExtension().toString(), "/test/filename");
        equal(T.Path("/test/filename.ext").filename().withoutExtension().toString(), "filename");
        equal(T.Path("/test/filename").filename().withoutExtension().toString(), "filename");
    });

    test("Path objects can be concatenated with strings", function () {
        equal(T.Path('/folder/filename.ext').withoutFilename() + 'new.ext', '/folder/new.ext');
    });

    test("isAbsolute", function () {
        ok(T.Path("/test/").isAbsolute());
        ok(T.Path("http://test/").isAbsolute());
        ok(!T.Path("test/").isAbsolute());
        ok(!T.Path("test.txt").isAbsolute());
        ok(!T.Path("../test.txt").isAbsolute());
    });

    test("makeAbsolute", function () {
        equal(T.Path("/test").makeAbsolute().toString(), "/test");
        equal(T.Path("test").makeAbsolute().toString(), "/test");
        equal(T.Path("test.txt").makeAbsolute().toString(), "/test.txt");
        equal(T.Path("test/test.txt").makeAbsolute().toString(), "/test/test.txt");
    });

    test("makeRelative", function () {
        equal(T.Path("test").makeRelative().toString(), "test");
        equal(T.Path("/test").makeRelative().toString(), "test");
        equal(T.Path("/test.txt").makeRelative().toString(), "test.txt");
        equal(T.Path("/test/test.txt").makeRelative().toString(), "test/test.txt");
    });

    test("normalise", function () {
        equal(T.Path('test').toString(), 'test');
        equal(T.Path('../test').toString(), '../test');
        equal(T.Path('test1/../test2').toString(), 'test2');
        equal(T.Path('/test1/../test2').toString(), '/test2');
        equal(T.Path('/test1/../test2/../test3').toString(), '/test3');
        equal(T.Path('./test').toString(), 'test');
        equal(T.Path('test1/./test2').toString(), 'test1/test2');
        equal(T.Path('.././test1/../test2').toString(), '../test2');
        equal(T.Path('http://test//test.htm').toString(), 'http://test/test.htm');
        equal(T.Path('http://test///test//test.htm').toString(), 'http://test/test/test.htm');
        equal(T.Path('1///2//3/4/5').toString(), '1/2/3/4/5');
    });

    test("asPathIdentifier", function () {
        equal(T.Path('test.txt').asMarkupIdentifier().toString(), 'test');
        equal(T.Path('test/test.txt').asMarkupIdentifier().toString(), 'test-test');
    });

    test("setExtension", function() {
        equal(T.Path('/test/test').setExtension('js').toString(), '/test/test.js');
        equal(T.Path('/test/test.txt').setExtension('js').toString(), '/test/test.js');
    });

    test("combine", function() {
        equal(T.Path('/test/').combine('/test.txt').toString(), '/test/test.txt');
        equal(T.Path('http://test/').combine('/test.txt').toString(), 'http://test/test.txt');
        equal(T.Path('/1/').combine('/2/').combine('/test.txt').toString(), '/1/2/test.txt');
        equal(T.Path('').combine('test.txt').toString(), 'test.txt');
    });
})();
