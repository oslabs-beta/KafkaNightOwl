const queryURL = 'http://localhost:9090/alerts'

const getAlerts = async(req, res, next) => {
  console.log('In getAlerts middleware');
  try {
    const response = await fetch(queryURL);
    const data = await response.json();
    res.locals.alerts = data.data.alerts;
    return next();
  } catch(err) {
    return next({
      log: 'Error fetching alerts',
      status: 500,
      message: {
        err: 'An error has occured in the getAlerts method of the alertsController'
      }
    });
  }
};

module.exports = {getAlerts}