'use strict';

module.exports = function (app) {
  // Root routing
  var message = require('../controllers/message.server.controller.js');
  var users = require('../../../users/server/controllers/users.server.controller.js');

  app.route('/api/technician/message/create').post(message.create);
  app.route('/api/technician/message/create/:to').post(message.create);

  app.route('/api/technician/message/technicians')
    .get(message.technicians);

  app.param('to', users.userByUsername);
};