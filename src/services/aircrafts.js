"use strict";

const models = require("../models");
const logger = require("../libraries/logger");

const Aircraft = models.aircraft;

const saveAircraft = async payload => {
  try {
    const aircraft = new Aircraft();
    Object.assign(aircraft, payload);
    await aircraft.save();
  } catch (e) {
    logger.error(`Error in adding aircrafts: ${JSON.stringify(e)}`);
    throw e;
  }
};

const getAircraftById = async _id => {
  try {
    if (_id) {
      return await Aircraft.findOne({ _id });
    } else {
      return await Aircraft.find().exec();
    }
  } catch (e) {
    logger.error(`Error in fetching aircraft by id: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteAircraft = async _id => {
  try {
    await Aircraft.deleteOne({ _id });
  } catch (e) {
    logger.error(`Error in deleting a aircraft: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  saveAircraft,
  getAircraftById,
  deleteAircraft
};
