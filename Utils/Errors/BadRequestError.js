var HTTPError = require('./HTTPError');
class NotFoundError extends HTTPError{
  constructor(){
    super();
    this.errorName = 'Bad request!';
    this.message = this.errorName + " Fields already exist!";
    this.status = 400;
  }
}

module.exports = NotFoundError;