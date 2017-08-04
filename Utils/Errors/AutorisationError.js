let HTTPError = require('./HTTPError');

class AutorisationError extends HTTPError{
  constructor(){
    super();
    this.errorName = 'Autorisation Error!';
    this.message = 'Invalid login or password, please, try again';
    this.status = 401;

  }
}
module.exports = AutorisationError;