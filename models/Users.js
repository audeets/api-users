'use strict';

/**
 * Module dependencies
 */

var mongoose = require('mongoose');

// end module dependencies

var UsersSchema = new mongoose.Schema({
  // url: String,
  // title: String,
  // description: String,
  // crawling: {
  //   type: String,
  //   enum: ['no_crawling', '1', '2', '3', 'all']
  // },
  // verified: Boolean,
  // verificationToken: String,
  // iconUrl: String,
  // created: Date,
  // modified: Date
});

mongoose.model('User', UsersSchema);
