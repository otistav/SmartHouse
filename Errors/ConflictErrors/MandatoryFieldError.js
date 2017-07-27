var ConflictError = require('../ConflictError');

class MandatoryFieldError extends ConflictError{
    constructor(name){
        super();
        this.errorName = 'Mandatory Field Error!';
        this.name = name;
        this.message = this.errorName + ' Error! Field ' + this.name + ' has to be mandatory';

    }
}


module.exports = MandatoryFieldError;