"use strict";

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let TransactionSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  transactionDateTime: {
    type: String,
    required: true
  },
  transactionType: {
    type: String,
    required: true
  },
  airportId: {
    type: String,
    required: true
  },
  aircraftId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  transactionIdParent: {
    type: String
  }
});

TransactionSchema.pre("save", next => {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model("transactions", TransactionSchema);
