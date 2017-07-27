var ConflictError = require('../ConflictError');

class UniqueError extends ConflictError{
    constructor(name){
        super();
        this.errorName = 'Unique Error!';
        this.name = name;
        this.message = this.errorName + ' Error! Field ' + this.name + ' has to be unique!';

    }
}


module.exports = UniqueError;