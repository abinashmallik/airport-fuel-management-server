"use strict";

const { celebrate, Joi } = require("celebrate");
const utilities = require("../utilities");
const controller = require("../controllers");

const aircraftController = controller.aircrafts;
const { createErrorObject } = utilities.utils;

const addAircraft = {
  path: "/api/v1/aircrafts",
  validation: {
    body: Joi.object().keys({
      aircraftNo: Joi.string()
        .trim()
        .required(),
      airline: Joi.string()
        .trim()
        .required(),
      source: Joi.string()
        .trim()
        .required(),
      destination: Joi.string()
        .trim()
        .required()
    })
  }
};

const getAircraft = {
  path: "/api/v1/aircrafts",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string().trim()
    })
  }
};

const deleteAircraft = {
  path: "/api/v1/aircrafts",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string()
        .trim()
        .required()
    })
  }
};

module.exports = app => {
  app.post(
    addAircraft.path,
    celebrate(addAircraft.validation),
    //passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        //const user = req.user;
        const payload = req.body;
        const successResponse = await aircraftController.addAircraft(payload);
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );

  app.get(
    getAircraft.path,
    celebrate(getAircraft.validation),
    async (req, res) => {
      try {
        const payload = req.query;
        const successResponse = await aircraftController.getAircraft(payload);
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );

  app.delete(
    deleteAircraft.path,
    celebrate(deleteAircraft.validation),
    async (req, res) => {
      try {
        const payload = req.query;
        const successResponse = await aircraftController.deleteAircraft(
          payload
        );
        res
          .status(successResponse.httpStatusCode)
          .json(successResponse.details);
      } catch (e) {
        let error = e;
        if (!e.details) error = createErrorObject();
        res.status(error.httpStatusCode).json(error.details);
      }
    }
  );
};
