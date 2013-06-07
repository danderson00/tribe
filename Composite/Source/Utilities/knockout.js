TC.Utils.cleanElement = function (element) {
    // prevent knockout from calling cleanData 
    // - calls to this function ultimately result from cleanData being called by jQuery, so a loop will occur
    var func = $.cleanData;
    $.cleanData = undefined;
    ko.cleanNode(element);
    $.cleanData = func;
};