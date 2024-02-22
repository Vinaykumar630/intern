const authenticate = (req, res, next) => {
  const { username, password } = req.headers;

  // Implement a more secure authentication mechanism in production
  if (username === 'admin' && password === 'password') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

module.exports = authenticate;
