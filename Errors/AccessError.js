class AccessError extends Error{
    constructor(){
        super();
        this.errorName = 'Access Error!';
        this.message = this.errorName + " You are not administrator!";
        this.status = 404;
    }
}

module.exports = AccessError;