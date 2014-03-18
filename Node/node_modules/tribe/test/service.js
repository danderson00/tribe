var services = require('tribe/handlers/services');

services.register('Tests', function () {
    return require('tribe/test').tests();
});