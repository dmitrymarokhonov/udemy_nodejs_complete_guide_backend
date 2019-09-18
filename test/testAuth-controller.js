const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../models/user');
const AuthContoller = require('../controllers/auth');

describe('Auth Controller - Login', () => {
  it('Should throw an error with code 500 if accessing the database failes', (done) => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'test'
      }
    };
    AuthContoller.login(req, {}, () => {}).then((result) => {
      // Chai is capable of detecting types of data and 'error' is one of the types
      // https://www.chaijs.com/api/bdd/#method_language-chains
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    });
    User.findOne.restore();
  });
});
