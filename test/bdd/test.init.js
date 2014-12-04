var should = require('should');

mocha.setup('bdd');

/* TEST FILES */
var globals = require('./test.globals');

mocha.checkLeaks();
mocha.run();