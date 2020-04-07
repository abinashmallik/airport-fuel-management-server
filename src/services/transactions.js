"use strict";

const models = require("../models");
const logger = require("../libraries/logger");
const airportServices = require("./airports");

const Transaction = models.transaction;

const saveTransaction = async payload => {
  try {
    const transaction = new Transaction();
    Object.assign(transaction, payload);
    await transaction.save();
    airportServices.updateAirport(payload.airportId, payload.quantity);
  } catch (e) {
    logger.error(`Error in adding transactions: ${JSON.stringify(e)}`);
    throw e;
  }
};

const getTransactionById = async _id => {
  try {
    if (_id) {
      return await Transaction.findOne({ _id });
    } else {
      return await Transaction.find().exec();
    }
  } catch (e) {
    logger.error(`Error in fetching transaction by id: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteTransaction = async _id => {
  try {
    //await Transaction.deleteOne({ _id });
    await Transaction.remove();
  } catch (e) {
    logger.error(`Error in deleting a transaction: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  saveTransaction,
  getTransactionById,
  deleteTransaction
};
