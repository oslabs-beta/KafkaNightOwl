const express = require('express');
const app = express();
const port = 5050;
const cors = require('cors');
const path = require('path');
const metricsRouter = require('../archive/metricsRouter.js');
const userRouter = require('./routers/userRoutes.js');
const alertsRouter = require('./routers/alertsRouter.js');
const connectDb = require('./config/dbConnection');
const cookieParser = require('cookie-parser');

// app.use(cors());
app.use(express.json());
connectDb();


const corsOptions = {
	origin: 'http://localhost:8080',  //change to KafkaNightOwl.com ?look into this? Port Forwarding in Webpack (IN MAIN)
	credentials: true,
};
app.use(cors(corsOptions));

//Serve static files

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.resolve(__dirname, '../build')));
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

app.listen(port, () => {
	console.log(`server started on ${port}`);
});

module.exports = app;
