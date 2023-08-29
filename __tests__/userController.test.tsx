/**
 * @jest-environment node
 */
// 9a7b6d84405abc98eef2594e502cbeeb790d420a

import mongoose from 'mongoose';
const {
  connectDB,
  dropDB,
  dropCollections,
} = require('../__mocks__/dbMock/setuptestdb');
const User = require('../server/models/userModel');

// import functionality from userController middleware
const {
  signupUser,
  loginUser,
  getUser,
} = require('../server/controllers/userController');

// before any tests are run, connect to mock db
beforeAll(async () => {
  await connectDB();
});

// after all tests are run, drop database connection
afterAll(async () => {
  await dropDB();
});

// after each individual test is run, drop all collections in the db
afterEach(async () => {
  await dropCollections();
});

// UserController tests
describe('UserController.createUser', () => {
  it('should create a User item successfully', async () => {
    // init variable isError as false, flag returns true if any value passed into next function, triggering global error handler
    // init constants res and req as mock objects that mimic real request and response objects
    const res = {
      json: function (d) {
        console.log('\n : ' + d);
      },
      status: function (s) {
        this.statusCode = s;
        return this;
      },
    };
    const req = { body: { email: 'valid', password: 'password' } };

    // init const result as output of invoking signupUser on req, an empty obj as res, and
    await signupUser(req, res);
    const doc = await User.findOne({ email: 'valid' });

    // these assertions test whether createUser successfully adds a user entry to the database with the correct params
    expect(doc.email).toEqual(req.body.email);
    // expect(doc.password).toEqual(req.body.password);

    // expect this operation to not throw an error
  });
  it('should fail for invalid inputs', async () => {
    // init variables res and req
    let isError = false;
    // const res = { locals: { newUser: {} } };
    const req = {
      body: {
        email: 'onlyEmail',
      },
    };
    const result = await signupUser(req, (err = 'not an error') => {
      if (err !== 'not an error') {
        isError = true;
      }
    });
    const doc = await User.find({ email: 'onlyEmail' });
    expect(doc).toHaveLength(0);
    expect(isError).toEqual(true);
  });
});

describe('UserController.loginUser', () => {
  it('should log in a user if username/password exists in database', async () => {
    const req = { body: { email: 'valid', password: 'password' } };
    const res = {
      json: function (d) {
        console.log('\n : ' + d);
      },
      status: function (s) {
        this.statusCode = s;
        return this;
      },
      statusCode: 1,
    };

    // Create a mock function for res.status to track its calls and arguments
    const statusMock = jest.fn(res.status.bind(res));
    res.status = statusMock;

    await signupUser(req, res);
    await loginUser(req, res);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(res.statusCode).toEqual(200);
  });

  it('should fail if username/password does not exist in database', async () => {
    const req = { body: { email: 'invalid', password: 'password' } };
    try {
      await loginUser(req);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should fail if password was not in the req body', async () => {
    const req = { body: { email: 'invalid' } };
    try {
      await loginUser(req);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should fail if username was not in the req body', async () => {
    const req = { body: { password: 'password' } };
    try {
      await loginUser(req);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
