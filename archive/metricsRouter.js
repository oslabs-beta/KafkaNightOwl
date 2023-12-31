const express = require('express');
const metricsController = require('./metricsController');
const router = express.Router();

// POST request to metrics endpoint
// created dummy routers for future use
// replace dummy path endpoint, middleware, and res.locals var for actual functionality

router.post(
  '/coreMetrics', 
  metricsController.getCoreMetrics, 
  (req, res) => {
  res.status(200).json(res.locals.coreMetrics);
  }
);

router.post(
  '/topicMetrics', 
  metricsController.topicMetrics, 
  (req, res) => {
  res.status(200).json(res.locals.topicMetrics);
  }
);

router.post(
  '/brokerMetrics', 
  metricsController.brokerMetrics, 
  (req, res) => {
  res.status(200).json(res.locals.brokerMetrics);
  }
);

// router.post(
//   '/metrics', 
//   metricsController.middleware, 
//   (req, res) => {
//   res.status(200).json(res.locals.name);
//   }
// );


module.exports = router;