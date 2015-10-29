tribe
=====

tribe is a completely different, better way of building software.

Installation
------------

    git clone https://github.com/danderson00/tribe.git
    cd tribe
    .\install.bat

This performs an npm install in each module folder and deletes duplicate references to tribe modules.

Sample
------

    cd .\samples\score\
    node --debug .\index.js

Open a browser to http://localhost:1678/. The sample requires node ^4.0.0 and a browser that supports arrow functions. 

Try opening multiple windows and watch the flow of messages. Chrome dev tools shows the full source tree. By default, the server uses a SQLite in memory database. Use `ctrl-]` in the browser to reset the client side message cache after restarting the server.

Running Tests
-------------

    cd .\node_modules\tribe\test-studio\
    node --debug .\server.js

Open a browser to http://localhost:1678/.

Tests for individual modules can be run by navigating to the relevant folder and running

    node --debug ..\tribe\test-studio\bin\test-studio

tribe.composite tests can be run by executing the host.js module and opening a browser to http://localhost:1678/Tests/.

Problems? Comments? WTFs?
-------------------------

This is all highly experimental. Lots of dependencies. Shit is likely to not work. Ping me at @danderson00, more than happy to help.
