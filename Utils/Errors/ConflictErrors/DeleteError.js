var ConflictError = require('../ConflictError');

class DeleteError extends ConflictError{
  constructor(){
    super();
    this.errorName = 'Delete error!';
    this.message = 'You are admin. You cant delete yourself!';

  }
}


module.exports = DeleteError;