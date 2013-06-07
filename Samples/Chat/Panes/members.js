TC.registerModel(function(pane) {
    var self = this;

    this.members = ko.observableArray();

    pane.pubsub.subscribe('memberJoined', function(member) {
        self.members.push(member);
    });

    pane.pubsub.subscribe('memberLeft', function (member) {
        $.each(self.members(), function(index, item) {
            if (item.name === member.name)
                self.members.splice(index, 1);
        });
    });
});