"use strict";

const models = require("../models");
const logger = require("../libraries/logger");

const Airport = models.airport;

const saveAirport = async payload => {
  try {
    const airport = new Airport();
    Object.assign(airport, payload);
    await airport.save();
  } catch (e) {
    logger.error(`Error in adding airports: ${JSON.stringify(e)}`);
    throw e;
  }
};

const getAirportById = async _id => {
  try {
    if (_id) {
      return await Airport.findOne({ _id });
    } else {
      return await Airport.find().exec();
    }
  } catch (e) {
    logger.error(`Error in fetching airport by id: ${JSON.stringify(e)}`);
    throw e;
  }
};

const updateAirport = async (_id, payload) => {
  try {
    const airportData = await Airport.findOne({ _id });
    const fuelAvailable =
      parseInt(airportData.fuelAvailable) - parseInt(payload);
    await Airport.updateOne({ _id }, { fuelAvailable: fuelAvailable });
  } catch (e) {
    logger.error(`Error in updating airports: ${JSON.stringify(e)}`);
    throw e;
  }
};

const deleteAirport = async _id => {
  try {
    await Airport.deleteOne({ _id });
  } catch (e) {
    logger.error(`Error in deleting a airport: ${JSON.stringify(e)}`);
    throw e;
  }
};

const resetAirport = async () => {
  try {
    const airportData = await Airport.find().exec();
    if (airportData.length > 0) {
      for (let i = 0; i < airportData.length; i++) {
        await Airport.updateOne(
          { _id: airportData[i]["_id"] },
          { fuelAvailable: airportData[i]["fuelCapacity"] }
        );
      }
    }
  } catch (e) {
    logger.error(`Error in updating airports: ${JSON.stringify(e)}`);
    throw e;
  }
};

module.exports = {
  saveAirport,
  getAirportById,
  updateAirport,
  deleteAirport,
  resetAirport
};
