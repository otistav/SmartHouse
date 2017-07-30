let NotFoundError = require('../NotFoundError');

class ExistingError extends NotFoundError{
    constructor(id, name){
        super();
        this.errorName = 'Existing Error!';
        this.id = id;
        this.name = name;
        this.message = this.errorName + ' Error!' + this.name + ' with id ' + this.id + ' doesnt exist!';

    }
}
module.exports = ExistingError;