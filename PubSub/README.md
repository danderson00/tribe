Tribe.PubSub
============

Tribe.PubSub is a lightweight, dependency free publish / subscribe message bus with lifetime management and flexible subscription modes. It is released under the MIT license.

Three builds are available in the Build folder - minified, combined and a debug version for use with Chrome.

Unit tests are available at http://danderson00.github.com/Tribe.PubSub/Tests/.

The current build has some issues with recursion. We are working to fix these issues.

Basic Usage
-----------

    var pubsub = new Tribe.PubSub(options);

Options can be omitted. The defaults are:

    var options = {
	    sync: false
	};

Subscribing
-----------

The subscribe function can take three forms:

	pubsub.subscribe('topic', handler);

This form takes a single topic name and handler function. When the specified topic name is published, the handler function is invoked. A single, unique token is returned that can be used to remove the subscription.

	pubsub.subscribe({
		'topic1': handler1,
		'topic2': handler2,
	});

This form takes a map of topic names to handler functions. An array of unique tokens is returned, one for each subscription.

	pubsub.subscribe(['topic1', 'topic2'], handler);

This form takes an array of topic names. The same handler is invoked for each topic. An array of unique tokens is returned, one for each subscription.

Subscriptions that are executed only once can also be taken out:

	pubsub.subscribeOnce('topic', handler);

Once the topic has been published, the subscription is automatically removed so the handler is executed only once. Any of the three described subscription forms can be used with the subscribeOnce function.

Message Handlers and Envelopes
------------------------------

Message handler functions should have the following signature:

	function (data, envelope) { }

The data argument is the message data that is passed with the publish function.

The envelope object is populated with:

	{
		topic: 'name of the published topic',
		data: { value: 'data passed with publish function' },
		sync: false // true if the message is published synchronously
	}

Publishing
----------

The publish function can take two forms:

	pubsub.publish('topic', data);

This form publishes the specified topic with the data passed.

	pubsub.publish(envelope);

This form allows specifying options in object format, as specified above. Currently, sync is the only additional option and has a shortcut function:

	pubsub.publishSync('topic', data);

Lifetime Managers
-----------------

Lifetime managers are a simple wrappers around the PubSub object and are created using the createLifetime function:

	var lifetime = pubsub.createLifetime();

These objects look and behave exactly like a normal PubSub object with one additional function:

	lifetime.end();

The end function removes any subscriptions that were taken out through the lifetime manager.

This allows us to bind the lifetime of subscriptions to any external event, such as an element being removed from the DOM (the "destroyed" event is described at http://bitovi.com/blog/2010/05/element-destroyed-a-jquery-special-event.html):

	$('.foo').on("destroyed", lifetime.end);

Lifetimes can be nested.

Global Options
--------------

The default global options are as follows:

	Tribe.PubSub.options = {
		sync: false,
		handleExceptions: true,
		exceptionHandler: function(e, envelope) {
			console.log("Exception occurred in subscriber to '" + envelope.topic + "': " + e.message);
		}
	};

Setting the sync option to true will cause messages to be published synchronously by default.

When handleExceptions is true, calls to subscriber functions are wrapped in a try..catch block. The exceptionHandler function is called when any exception occurs.

When handleExceptions is false, subscriber functions are executed normally and any exception thrown will not be handled by Tribe.PubSub. This can simplify debugging but should only be used in debug / test environments - if an exception occurs, this will prevent other subscriber functions from being called.