const development = require('./development'),
      test = require('./test');
module.exports = {
  development: development,
  test: test
}[process.env.NODE_ENV || 'development'];
