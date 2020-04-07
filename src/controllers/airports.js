"use strict";

const services = require("../services");
const utilities = require("../utilities");
const config = require("../config");
const logger = require("../libraries/logger");

const { respCodeAndMsg } = config;
const { STATUS_CODE, SUCCESS_MESSAGES, ERROR_MESSAGES } = respCodeAndMsg;
const { createSuccessObject, getUUID, createErrorObject } = utilities.utils;
const airportServices = services.airports;

const addAirport = async (payload, user) => {
  try {
    const _id = getUUID();
    const result = { ...payload };
    //result.user = user.email;
    result._id = _id;
    await airportServices.saveAirport(result);
    return createSuccessObject(
      STATUS_CODE.CREATED,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      { _id }
    );
  } catch (e) {
    logger.error(`Error in adding aiport: ${e}`);
    throw e;
  }
};

const getAirport = async payload => {
  try {
    const airport = await airportServices.getAirportById(payload._id);
    if (!airport) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    const filteredAirport = filterAirport(airport);
    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      filteredAirport
    );
  } catch (e) {
    logger.error(`Error in fetching airport: ${JSON.stringify(e)}`);
    throw e;
  }
};

const updateAirport = async payload => {
  try {
    const airport = await airportServices.getAirportById(payload._id);

    if (!airport) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    Object.assign(airport, payload);

    await airportServices.updateAirport(payload._id, airport);

    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    logger.error(`Error in updating aiports: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteAirport = async payload => {
  try {
    const airport = await airportServices.getAirportById(payload._id);

    if (!airport) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    await airportServices.deleteAirport(payload._id);

    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    logger.error(`Error in fetching airports: ${JSON.stringify(e)}`);
    throw e;
  }
};

const filterAirport = airport => {
  airport.__v = undefined;
  return airport;
};

const resetAirport = async () => {
  try {
    const airport = await airportServices.getAirportById();

    if (!airport) {
      throw createErrorObject(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.DATA_NOT_FOUND,
        {}
      );
    }

    Object.assign(airport);

    await airportServices.resetAirport();

    return createSuccessObject(
      STATUS_CODE.OK,
      SUCCESS_MESSAGES.ACTION_COMPLETE,
      {}
    );
  } catch (e) {
    logger.error(`Error in updating aiports: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  addAirport,
  getAirport,
  updateAirport,
  deleteAirport,
  resetAirport
};
