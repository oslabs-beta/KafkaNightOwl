/**
 * @jest-environment node
 */
import mongoose from 'mongoose';
const {
  connectDB,
  dropDB,
  dropCollections,
} = require('../__mocks__/dbMock/setuptestdb');
const User = require('../server/models/userModel');

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

describe('User Model', () => {
  it('New User should be created when provided email and password', async () => {
    let validUser = {
      email: 'validUser@dummyDomain.com',
      password: 'dummyPassword',
    };
    const newUser = new User(validUser);
    await newUser.save();
    expect(newUser.email).toBeDefined();
    expect(newUser.password).toBeDefined();
  });
  it('New User should not be created when not provided both email and password', async () => {
    let validUser = {
      password: 'dummyPassword',
    };
    try {
      const newUser = new User(validUser);
      await newUser.save();
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });
});
