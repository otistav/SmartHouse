class NotFoundError extends Error{
    constructor(){
        super();
        this.errorName = 'Not Found Error!';
        this.message = this.errorName + " Not Found!";
        this.status = 404;
    }
}

module.exports = NotFoundError;