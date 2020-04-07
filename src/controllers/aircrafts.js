"use strict";

const services = require("../services");
const utilities = require("../utilities");
const config = require("../config");
const logger = require("../libraries/logger");

const { respCodeAndMsg } = config;
const { STATUS_CODE, SUCCESS_MESSAGES, ERROR_MESSAGES } = respCodeAndMsg;
const { createSuccessObject, getUUID, createErrorObject } = utilities.utils;
const aircraftServices = services.aircrafts;

const addAircraft = async payload => {
  try {
    const _id = getUUID();
    const result = { ...payload };
    result._id = _id;
    await aircraftServices.saveAircraft(result);
    return createSuccessObject(
      STATUS_CODE.CREATED,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      { _id }
    );
  } catch (e) {
    logger.error(`Error in adding aircraft: ${e}`);
    throw e;
  }
};

const getAircraft = async payload => {
  try {
    const aircraft = await aircraftServices.getAircraftById(payload._id);
    if (!aircraft) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    const filteredAircraft = filterAircraft(aircraft);
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      filteredAircraft
    );
  } catch (e) {
    logger.error(`Error in fetching aircraft: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteAircraft = async payload => {
  try {
    const aircraft = await aircraftServices.getAircraftById(payload._id);

    if (!aircraft) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    await aircraftServices.deleteAircraft(payload._id);

    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    logger.error(`Error in fetching aircrafts: ${JSON.stringify(e)}`);
    throw e;
  }
};

const filterAircraft = aircraft => {
  aircraft.__v = undefined;
  return aircraft;
};

module.exports = {
  addAircraft,
  getAircraft,
  deleteAircraft
};
