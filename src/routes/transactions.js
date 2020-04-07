"use strict";

const { celebrate, Joi } = require("celebrate");
const utilities = require("../utilities");
const controller = require("../controllers");

const transactionController = controller.transactions;
const { createErrorObject } = utilities.utils;

const addTransaction = {
  path: "/api/v1/transactions",
  validation: {
    body: Joi.object().keys({
      transactionDateTime: Joi.string()
        .trim()
        .required(),
      transactionType: Joi.string()
        .trim()
        .required(),
      airportId: Joi.string()
        .trim()
        .required(),
      aircraftId: Joi.string()
        .trim()
        .required(),
      quantity: Joi.number().required(),
      transactionIdParent: Joi.string()
        .trim()
        .optional()
    })
  }
};

const getTransaction = {
  path: "/api/v1/transactions",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string().trim()
    })
  }
};

const deleteTransaction = {
  path: "/api/v1/transactions",
  validation: {
    query: Joi.object().keys({
      _id: Joi.string().trim()
    })
  }
};

module.exports = app => {
  app.post(
    addTransaction.path,
    celebrate(addTransaction.validation),
    async (req, res) => {
      try {
        const payload = req.body;
        const successResponse = await transactionController.addTransaction(
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

  app.get(
    getTransaction.path,
    celebrate(getTransaction.validation),
    async (req, res) => {
      try {
        const payload = req.query;
        const successResponse = await transactionController.getTransaction(
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

  app.delete(
    deleteTransaction.path,
    celebrate(deleteTransaction.validation),
    async (req, res) => {
      try {
        const payload = req.query;
        const successResponse = await transactionController.deleteTransaction(
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
