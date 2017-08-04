let NotFoundError = require('../NotFoundError');

class UserExistingError extends NotFoundError{
  constructor(id, name){
    super();
    this.errorName = 'Existing Error!';
    this.id = id;
    this.name = name;
    this.message = this.errorName + ' Error!' + this.name + ' with login ' + this.id + ' doesnt exist!';

  }
}
module.exports = UserExistingError;