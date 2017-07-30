var HTTPError = require('./HTTPError');
class ConflictError extends HTTPError{
    constructor(){
        super();
        this.errorName = 'Conflict Error!';
        this.message = this.errorName + " Oops!There seems that some conflict happened";
        this.status = 409;
    }
}

module.exports = ConflictError;