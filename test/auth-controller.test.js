const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

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

  it('should send a response with a valid user status for an existing user', (done) => {
    mongoose.connect('mongodb+srv://dmitry:OvOTvIZHoxySg5PN@cluster0-qvwe4.mongodb.net/test-messages', { useNewUrlParser: true })
      .then((result) => {
        const user = new User({
          email: 'test2@test.com',
          password: 'tester',
          name: 'Test',
          posts: [],
          _id: '5d7e974721babe0443566531'
        });
        return user.save();
      })
      .then(() => {
        const req = { userId: '5d7e974721babe0443566531' };
        const res = {
          statusCode: 500,
          userStatus: null,
          status: (code) => {
            this.statusCode = code;
            return this;
          },
          json: (data) => {
            this.userStatus = data.status;
          }
        };
        AuthContoller.getUserStatus(req, res, () => {}).then(() => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.status).to.be.equal('I am new!');
          done();
        });
      })
      .catch((err) => console.log(err));
  });
});
