// Encapsulates an operation involving several child operations, keyed by an id
// Child operations can be added cumulatively
// Promise resolves when the all child operations complete
TC.Types.Operation = function () {
    var self = this;
    var incomplete = [];

    this.promise = $.Deferred();

    this.add = function(id) {
        incomplete.push(id);
    };

    this.complete = function (id) {
        TC.Utils.removeItem(incomplete, id);
        if (incomplete.length === 0)
            self.promise.resolve();
    };
    
};