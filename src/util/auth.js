import token from '../token';

const GitHub = require('github-api');

const gh = new GitHub({
  token: token.token,
});

export default gh;
