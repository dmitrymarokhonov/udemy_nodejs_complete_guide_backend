const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller - Login', () => {
  before((done) => {
    mongoose
      .connect(
        'mongodb+srv://dmitry:OvOTvIZHoxySg5PN@cluster0-qvwe4.mongodb.net/test-messages',
        { useNewUrlParser: true }
      )
      .then(result => {
        const user = new User({
          email: 'test@test.com',
          password: 'privet',
          name: 'Test',
          posts: [],
          _id: '5c0f66b979af55031b34728a'
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  beforeEach(() => {});

  afterEach(() => {});

  it('Should throw an error with code 500 if accessing the database failes', (done) => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'privet'
      }
    };
    AuthController.login(req, {}, () => {}).then(result => {
      // Chai is capable of detecting types of data and 'error' is one of the types
      // https://www.chaijs.com/api/bdd/#method_language-chains
      expect(result).to.be.an('error');
      expect(result).to.have.property('statusCode', 500);
      done();
    });
    User.findOne.restore();
  });

  it('should send a response with a valid user status for an existing user', (done) => {
    const req = { userId: '5c0f66b979af55031b34728a' };
    const res = {
      statusCode: 500,
      userStatus: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.userStatus = data.status;
      }
    };
    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal('I am new!');
      done();
    });
  });

  after((done) => {
    User.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => {
        done();
      });
  });
});
