const { expect } = require('chai');

const authMiddleware = require('../middleware/is-auth');

it('it should throw an error if no authorization header is present', () => {
  const req = {
    get: () => null
  };
  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.');
});
