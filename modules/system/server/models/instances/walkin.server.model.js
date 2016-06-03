'use strict';

var mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  Schema = mongoose.Schema;

// Plugin initialization
autoIncrement.initialize(mongoose.connection);

var WalkinSchema = new Schema({
  //Basic instance information
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  deviceCategory: {
    type: String,
    required: true
  },
  deviceType: {
    type: String,
    default: 'N/A'
  },
  os: {
    type: String,
    default: 'N/A'
  },
  otherDevice: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  liabilityAgreement:{
    type: Boolean,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // Instance log
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },

  // Service log
  status: {
    type: String,
    enum: ['In queue', 'Duplicate', 'House call pending', 'Work in progress', 'Completed', 'Unresolved'],
    default: ['In queue']
  },
  lastUpdateTechnician: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  workNote: {
    type: String,
    trim: true
  },
  resolutionType: {
    type: String,
    trim: true
  },
  otherResolution: {
    type: String,
    trim: true
  },
  resolution: {
    type: String,
    trim: true
  },
  serviceTechnician: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  resoluteTechnician: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  serviceStartTime: {
    type: Date
  },
  resolutionTime: {
    type: Date
  },
  contactLog: {
    type: [Schema.ObjectId],
    ref: 'ContactLog',
    default: []
  },

  // Service Now information
  snSysId: {
    type: String,
    trim: true
  },
  snValue: {
    type: String,
    trim: true
  },
  forward: {
    type: Boolean,
    default: false
  }
});

WalkinSchema.pre('save', function(next) {
  this.updated = Date.now(); next();
});


WalkinSchema.plugin(autoIncrement.plugin, 'Walkin');
mongoose.model('Walkin', WalkinSchema);
