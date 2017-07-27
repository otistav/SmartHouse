let NotFoundError = require('../NotFoundError');

class ExistingError extends NotFoundError{
    constructor(id){
        super();
        this.errorName = 'Existing Error!';
        this.id = id;
        this.message = this.errorName + ' Error! User with id ' + this.id + ' doesnt exist!';

    }
}
module.exports = ExistingError;