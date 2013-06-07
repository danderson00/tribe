(function() {
    var list;

    module("SubscriberList", {
        setup: function () { list = new Tribe.PubSub.SubscriberList(); }
    });

    test("add returns consecutive tokens", function () {
        equal(list.add(), "0");
        equal(list.add(), "1");
    });

    test("remove returns token if removed", function() {
        var token = list.add("0");
        equal(list.remove(token), token);
    });

    test("remove returns false if not removed", function () {
        list.add("0");
        equal(list.remove("1"), false);
    });

    test("get returns subscribers to specific topic", function() {
        list.add("0", "0");
        list.add("0", "1");
        list.add("2", "2");

        var subscribers = list.get("0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("get includes global wildcard", function () {
        list.add("0", "0");
        list.add("*", "1");
        list.add("1", "2");

        var subscribers = list.get("0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("global wildcard matches all topics", function() {
        list.add("*", "1");
        equal(list.get("0").length, 1);
        equal(list.get("00").length, 1);
        equal(list.get("0.0").length, 1);
        equal(list.get("0.0.0").length, 1);
    });

    test("get includes child wildcard", function () {
        list.add("0.0", "0");
        list.add("0.*", "1");
        list.add("0.1", "2");

        var subscribers = list.get("0.0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("get includes embedded wildcard", function () {
        list.add("0.0.0", "0");
        list.add("0.*.0", "1");
        list.add("0.1.0", "2");

        var subscribers = list.get("0.0.0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("publish matches topics correctly", function () {
        list.add("test", {});
        list.add("testtest", {});
        list.add("1test", {});
        list.add("test1", {});
        list.add("1test1", {});

        equal(list.get("test").length, 1);
        equal(list.get("testtest").length, 1);
        equal(list.get("1test").length, 1);
        equal(list.get("test1").length, 1);
        equal(list.get("1test1").length, 1);
    });
})();
