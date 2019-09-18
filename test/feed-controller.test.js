const { expect } = require('chai');
const mongoose = require('mongoose');

const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller', () => {
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

  it('Should add a created post to the posts of creator', done => {
    const req = {
      body: {
        title: 'Test Post',
        content: 'A Test Post'
      },
      file: {
        path: 'path/to/file'
      },
      userId: '5c0f66b979af55031b34728a'
    };
    const res = {
      status() {
        return this;
      },
      json() {}
    };
    FeedController.createPost(req, res, () => {}).then(savedUser => {
      expect(savedUser).to.have.property('posts');
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(done => {
    User.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => {
        done();
      });
  });
});
