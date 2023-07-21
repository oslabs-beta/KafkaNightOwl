const express = require('express');
const app = express();
const port = 5050;
const path = require('path');
const metricsRouter = require('./routes/metricsRouter.js');

//Serve static files
app.use(express.static(path.resolve(__dirname, '../client')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/jmx', metricsRouter);

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

// Catch-all route
app.get('*', (req, res) => {
  res.sendStatus(404);
})

// Global error handler
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
