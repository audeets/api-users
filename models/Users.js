"use strict";

/**
 * Module dependencies
 */

var mongoose = require("mongoose");

// end module dependencies

var UsersSchema = new mongoose.Schema(
  {
    name: String,
    googleId: String,
    email: String,
    photo: String,
  },
  { timestamps: true }
);

mongoose.model("User", UsersSchema);
