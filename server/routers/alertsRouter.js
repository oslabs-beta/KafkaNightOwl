const { getAlerts } = require('../controllers/alertsController');
const express = require('express');
const alertsRouter = express.Router();

alertsRouter.get('/alerts', getAlerts, (req, res) => {
	return res.status(200).json(res.locals.alerts);
});

module.exports = alertsRouter;
