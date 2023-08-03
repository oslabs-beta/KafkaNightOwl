import { getAlerts } from "../controllers/alertsController";
const express = require('express');
const alertsRouter = express.Router();

alertsRouter.get('/promAlerts', getAlerts, (req, res) => {
  return res.status(200).json(res.locals.alerts);
});

module.exports = alertsRouter;
