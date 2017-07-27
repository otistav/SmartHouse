class AccessError extends Error{
    constructor(){
        super();
        this.errorName = 'Access Error!';
        this.message = this.errorName + " You are not administrator!";
        this.status = 401;
    }
}

module.exports = AccessError;