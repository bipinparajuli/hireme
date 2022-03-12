const express = require("express");

const router = express.Router();

const {getEmployerById} = require("../controller/user");
const { isSignedIn, isAuthenticated } = require("../controller/auth");
const { getToken, processPayment } = require("../controller/braintree");

router.param("employerId", getEmployerById);

router.get(
  "/payment/braintree/gettoken/:employerId",
  isSignedIn,
  // isAuthenticated,
  getToken
);

router.post(
  "/payment/braintree/:employerId",
  isSignedIn,
  // isAuthenticated,
  processPayment
);

module.exports = router

