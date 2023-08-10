const Session = require('../models/sessionModel');

const SessionController = {};

SessionController.startSession = (req, res, next) => {
  
  // Session.findOne()
  // query session to see if there is an already active session
  // if yes
  //.then res.locals.user and next
  // else create a new session
  
  console.log('----session is starting now----')


  Session.create({ cookieId: res.locals.user })
    .then(() => next())
    .catch((err) => {
      return next({
        log: `SessionController.startSession ERROR: ${err}`,
        status: 500,
        message: { error: 'Error in starting session. See log.' },
      });
    });
};

SessionController.isLoggedIn = async (req, res, next) => {
  // const { ssid } = req.locals.ssid
  // Session.findOne({ ssid })
  // console.log('req.locals: ', res.locals.ssid);
  await Session.find({ cookieId: res.locals.user}) 
    .then((session) => {
            // session is valid
            console.log('sessionV?: ', session)
            return next();
        }
    )
    .catch((err) => {
      // catching database error
      return next({
        log: `SessionController.isLoggedIn ERROR: ${err}`,
        status: 500,
        message: { error: 'An error occurred, no session active' },
      });
    });
};

// add logout function

module.exports = SessionController;
