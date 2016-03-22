'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  SystemSetting = mongoose.model('SystemSetting'),
  KeyValueList = mongoose.model('KeyValueList'),
  _ = require('lodash');

var popOpt = [{ path: 'device_options', model: 'KeyValueList', select: 'key values' }];

// Initialize / System check for current setting
exports.init = function(){
  SystemSetting.find({}).sort({ updated : -1 }).exec(function(err, settings){
    if(err) return console.error('***System setting initialization failed***');

    // Initialize default setting
    var setting;
    if(settings.length === 0){
      setting = new SystemSetting();
      setting.save(function(err, setting){
        if(err) return console.error('***System setting initialization failed***');
        else console.log('Default system setting initialized.');
      });
    }
    else if(settings.length > 1){
      console.error('Found more than one setting. Using the latest one.');
      for(var i = 1; i < settings.length; i++) settings[i].remove();
      setting = settings[0];
    }
    else{
      console.log('System setting loaded.');
      setting = settings[0];
    }
  });

  // Initialize default user
  User.count({}, function(err, count){
    if(err) return console.error('***User count (initialization) failed***');
    if(!count){
      var user = new User(
          { firstName: 'System', lastName: 'Root', phone: '0000000000', location: 'N/A',
            username: 'root', password: 'password', roles: 'admin', provider: 'local' });

      user.save(function(err, user){
        if(err) return console.error('***Root user initialization failed***');
        else console.log('Root user initialized. (root/password)');
      });
    }
    else console.log('Existing user count: ' + count);
  });
};

exports.update = function(req, res){
  var setting = req.setting, new_setting = req.body;

  for(var opt, i = 0; i < new_setting.device_options.length; i++){
    opt = new_setting.device_options[i];
    if(!opt._id){
      new_setting.device_options[i] = opt = new KeyValueList(opt);
      opt.save(function(err){
        if(err){
          res.status(500).send('Failed to create new device category.');
          return console.error(err);
        }
      });
    }
    else KeyValueList.update({ _id : opt._id }, { $set : { values : opt.values } }, function(err){
      if(err){
        res.status(500).send('Failed to update device type.');
        return console.error(err);
      }
    });
  }

  setting = _.extend(setting, new_setting);
  setting.save(function(err, setting){
    if(err) {
      res.status(500).send('Failed to update system setting.');
      return console.error(err);
    }
    else    res.jsonp(setting);
  });
};

exports.getSetting = function (req, res) {
  res.json(req.setting);
};

// Setting middleware
exports.setting = function(req, res, next){
  SystemSetting.findOne({}, '-updated').populate(popOpt).exec(function(err, setting){
    if(err) req.setting = null;
    else req.setting = setting;
    next();
  });
};