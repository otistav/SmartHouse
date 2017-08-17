var ConflictError = require('../ConflictError');

class IsAdminError extends ConflictError{
  constructor(){
    super();
    this.errorName = 'Delete error!';
    this.message = 'You cant stop being admin! Just other admins can do it!';

  }
}


module.exports = IsAdminError;