var HTTPError = require('./HTTPError');
class ServerError extends HTTPError{
    constructor(){
        super();
        this.errorName = 'Server Error!';
        this.message = this.errorName + " There seems some problems on server!";
        this.status = 500;
    }
}

module.exports = ServerError;