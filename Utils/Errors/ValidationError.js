class ValidationError extends Error{
    constructor(){
        super();
        this.errorName = 'Validation Error!';
        this.message = this.errorName;
        this.status = 400;
    }
}

module.exports = ValidationError;