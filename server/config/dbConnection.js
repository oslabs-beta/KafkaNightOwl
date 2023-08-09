const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGODB_URI);
		console.log(
			'Database connected: ',
			connect.connection.host,
			connect.connection.name
		);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDb;
