tribe.storage
=============

tribe is a platform for building event based systems.

This module provides efficient, portable, extensible object storage. 

It operates seamlessly both on the server (using SQLite) and browser (using indexeddb), providing a consistent API regardless of where the module is used.

Installation
------------

    npm install tribe.storage

Usage
-----

	var storage = require('tribe.storage'),
		entity;

	// open a sqlite3 store with a single entity called "test"
	// that has a single index against the id property
	storage.open([{ name: 'test', indexes: ['id'] }])
		.then(function (provider) {
			// grab a reference to the "test" entity container
			entity = provider.entity('test');

			// store some objects
			return entity.store([
				{ id: 1, property1: 'A string value', property2: 34 },
				{ id: 2, property1: 'Another string value', property2: 23 },
				{ id: 3, property1: 'Lorem ipsum', property2: 129 }
			]);
		})
		.then(function () {
			// get objects with an id value greater than or equal to 2
			return entity.retrieve({ p: 'id', o: '>=', v: 2 });
		})
		.then(function (objects) {
			// log some pretty stuff
			console.log(JSON.stringify(objects, null, 2));
		});

To see this in the browser, simply execute browserify against this sample and execute.

API
---

	var storage = require('tribe.storage');

### storage.open

	storage.open(entities, options);

The open function initialises the storage provider. This must be done before any storage operations can be performed.

	entities = [{
		name: 'entity name',
		keyPath: 'path.to.key.property',
		autoIncrement: true,
		indexes: [
			'single.property.index',
			['multiple.property.index', 'another.property']
		]
	}, {...}, ...];

	options = {
		type: 'sqlite3',
		filename: 'file.sqlite'
	};

	options = {
		type: 'indexeddb',
		reset: true
	};

The open method returns a promise. The result of the promise will be a provider object 

	storage.open().then(function (provider) { });

### provider.entity

	var entityContainer = provider.entity(name);

The entity function directly returns an entityContainer object for the specified entity. The entity must be registered when calling open.

### provider.close

	provider.close();

The close function closes any active database connections associated with the provider.

### entityContainer.store

	entityContainer.store({});
	entityContainer.store([{}, {}, ...]);

The store method accepts a single object or array of objects and persists these objects to the object store.

If a keyPath has been specified, and an entity's key value matches an existing entity in the store, the existing entity will be updated.

If both a keyPath and autoIncrement have been specified, the stored object has the keyPath property set to the latest autoIncrement value.

The store function returns a promise, the result of which is the updated object.

### entityContainer.retrieve

	entityContainer.retrieve(expression);

The retrieve function returns a promise, the result of which is an array of objects that match the specified expression (see below).

Expressions
-----------

Expressions are simple objects containing a target property, an operation and a value. Operation can be omitted - the default is to test equality.

	var expression = { p: 'path.to.property', o: '=', v: 'value' };

Expressions with more than one predicate can be provided in an array of expressions.

The SQLite3 provider supports: =, !=, <, <=, >, >=, in
The indexeddb provider supports: =, <, <=, >, >=

Why?
----

Primarily intended to act as a high performance, scalable, indexed event store that can operate transparently server or client side, the module can also be used as a general purpose object storage facility.

The design goals were as follows:

- Provide an indexed JSON based object storage mechanism
- Provide a simple, consistent, seamless API across all Javascript platforms
- Allow creation of indexes on objects by specifying one or more "key paths"
- Operate out-of-the-box with little or no configuration
- Provide local file based storage (server side) and browser based storage out-of-the-box
- Allow for seamless transitions from file based storage to other scalable storage mediums
- Provide simple, extensible, scalable auto-increment object properties (sequences)
- Expose asynchronous operations as promises
- Work seamlessly with browserify

Nothing out there (to our knowledge) goes anywhere close to fulfilling all of these requirements.

Looking to the future, we are also looking to provide simple, out-of-the-box partitioning across entities and sequences.

License
-------

The Tribe platform is licensed under the MIT license.