const queryURL = ''

const getAlerts = async(req, res, next) => {
  try {
    const response = await fetch('http://localhost:9090/api/v1/alerts');
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