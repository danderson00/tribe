(function (global) {
    if (typeof (jQuery) === 'undefined')
        throw 'jQuery must be loaded before knockout.composite can initialise';
    if (typeof (ko) === 'undefined')
        throw 'knockout.js must be loaded before knockout.composite can initialise';
    if (typeof(T) === 'undefined')
        throw 'Tribe.Common must be loaded before knockout.composite can initialise';

    global.Tribe = global.Tribe || {};
    global.Tribe.Composite = {};
    global.TC = global.Tribe.Composite;
    global.TC.Events = {};
    global.TC.Factories = {};
    global.TC.LoadHandlers = {};
    global.TC.LoadStrategies = {};
    global.TC.Transitions = {};
    global.TC.Types = {};
    global.TC.Utils = {};
    global.TC.logger = T.logger;
    global.TC.pubsub = new Tribe.PubSub();

    $(function() {
        $('head').append('<style class="__tribe">.__rendering { position: fixed; top: -10000px; left: -10000px; }</style>');
    });
})(window || this);
