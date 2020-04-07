"use strict";

const { celebrate, Joi } = require("celebrate");
const passport = require("passport");

const utilities = require("../utilities");
const controller = require("../controllers");

const airportController = controller.airports;
const { createErrorObject } = utilities.utils;

const addAirport = {
  path: "/api/v1/airports",
  validation: {
    body: Joi.object().keys({
      airportName: Joi.string()
        .trim()
        .required(),
      fuelCapacity: Joi.number().required(),
      fuelAvailable: Joi.number().required()
    })
  }
};

const getAirport = {
  path: "/api/v1/airports",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string().trim()
    })
  }
};

const updateAirport = {
  path: "/api/v1/airport",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string()
        .trim()
        .required()
    }),
    body: Joi.object().keys({
      fuelCapacity: Joi.number().required(),
      fuelAvailable: Joi.number().required()
    })
  }
};

const deleteAirport = {
  path: "/api/v1/airports",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string()
        .trim()
        .required()
    })
  }
};

const resetAirport = {
  path: "/api/v1/resetAirport"
};

module.exports = app => {
  app.post(
    addAirport.path,
    celebrate(addAirport.validation),
    async (req, res) => {
      try {
        //const user = req.user;
        const payload = req.body;
        const successResponse = await airportController.addAirport(payload);
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
    getAirport.path,
    celebrate(getAirport.validation),
    async (req, res) => {
      try {
        const payload = req.query;
        const successResponse = await airportController.getAirport(payload);
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

  app.put(
    updateAirport.path,
    celebrate(updateAirport.validation),
    async (req, res) => {
      try {
        const queryParams = req.query;
        let payload = req.body;
        payload = { ...payload, ...queryParams };
        const successResponse = await airportController.updateAirport(payload);
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
    deleteAirport.path,
    celebrate(deleteAirport.validation),
    async (req, res) => {
      try {
        const payload = req.query;
        const successResponse = await airportController.deleteAirport(payload);
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

  app.put(resetAirport.path, async (req, res) => {
    try {
      const successResponse = await airportController.resetAirport();
      res.status(successResponse.httpStatusCode).json(successResponse.details);
    } catch (e) {
      let error = e;
      if (!e.details) error = createErrorObject();
      res.status(error.httpStatusCode).json(error.details);
    }
  });
};
