const { v4: uuidv4 } = require('uuid');
const userController = require('./userController')
const CookieController = {};

CookieController.setSSID = (req, res, next) => {
  // console.log('----cookiecontroller.setSSID is starting now----');
  // res.cookie('codesmith', 'hi');
  // res.locals.ssid = uuidv4();
  
  // console.log('uuid number: ', res.locals.ssid);
  res.cookie('ssid', res.locals.user, {
    httpOnly: true,
    // Secure: true,
    // maxAge: 900000000000, // 15 minutes
  });
  // console.log('res.cookie: ', res.cookie)
  return next();
};

module.exports = CookieController;
