"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AirportSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  airportName: {
    type: String,
    required: true
  },
  fuelCapacity: {
    type: Number,
    required: true
  },
  fuelAvailable: {
    type: Number,
    required: true
  }
});

AirportSchema.pre("save", next => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("airports", AirportSchema);
