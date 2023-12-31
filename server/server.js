const express = require('express');
const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 5050;
const cors = require('cors');
const path = require('path');
const metricsRouter = require('../archive/metricsRouter.js');
const userRouter = require('./routers/userRoutes.js');
const alertsRouter = require('./routers/alertsRouter.js');
const connectDb = require('./config/dbConnection');

app.use(cors());
app.use(express.json());
connectDb();

//Serve static files
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));
app.use(express.urlencoded({ extended: true }));
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/user', userRouter);
app.use('/jmx', metricsRouter);
app.use('/alerts', alertsRouter);

app.get('/', (req, res) => {
	return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
});

// Catch-all route
app.get('*', (req, res) => {
	res.sendStatus(404);
});

// Global error handler asd
app.use((err, req, res, next) => {
	console.log(err);
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign({}, defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, host, () => {
	console.log(`server started on ${port}`);
});

module.exports = app;
