"use strict";

const services = require("../services");
const utilities = require("../utilities");
const config = require("../config");
const logger = require("../libraries/logger");

const { respCodeAndMsg } = config;
const { STATUS_CODE, SUCCESS_MESSAGES, ERROR_MESSAGES } = respCodeAndMsg;
const { createSuccessObject, getUUID, createErrorObject } = utilities.utils;
const transactionServices = services.transactions;

const addTransaction = async payload => {
  try {
    const _id = getUUID();
    const result = { ...payload };
    result._id = _id;
    await transactionServices.saveTransaction(result);
    return createSuccessObject(
      STATUS_CODE.CREATED,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      { _id }
    );
  } catch (e) {
    logger.error(`Error in adding transaction: ${e}`);
    throw e;
  }
};

const getTransaction = async payload => {
  try {
    const transaction = await transactionServices.getTransactionById(
      payload._id
    );
    if (!transaction) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    const filteredTransaction = filterTransaction(transaction);
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      filteredTransaction
    );
  } catch (e) {
    logger.error(`Error in fetching transaction: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteTransaction = async payload => {
  try {
    const transaction = await transactionServices.getTransactionById(
      payload._id
    );

    if (!transaction) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    await transactionServices.deleteTransaction(payload._id);

    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    logger.error(`Error in fetching transactions: ${JSON.stringify(e)}`);
    throw e;
  }
};

const filterTransaction = transaction => {
  transaction.__v = undefined;
  return transaction;
};

module.exports = {
  addTransaction,
  getTransaction,
  deleteTransaction
};
