let ValidationError = require('../ValidationError');
class UserFieldsValidationError extends ValidationError{
    constructor(message){
        super();
        this.errorName = 'Validation Error!';
        this.message = message;
        this.status = 400;
    }
}

module.exports = UserFieldsValidationError;