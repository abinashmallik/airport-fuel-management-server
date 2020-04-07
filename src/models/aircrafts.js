"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let AircraftSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  aircraftNo: {
    type: String,
    required: true
  },
  airline: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  }
});

AircraftSchema.pre("save", next => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("aircrafts", AircraftSchema);
