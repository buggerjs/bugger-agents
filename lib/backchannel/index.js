'use strict';

if (!process.env.BUGGER_FILE_CHANNEL) {
  module.exports = require('./tcp');
} else {
  module.exports = require('./file');
}
