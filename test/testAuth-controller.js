const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../models/user');
const authContoller = require('../controllers/auth');

describe('Auth Controller - Login', () => {
  it('Should throw an error with code 500 if accessing the database failes', () => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    expect(authContoller.login);
    User.findOne.restore();
  });
});
