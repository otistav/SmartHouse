var AccessError = require('../../Utils/Errors/AccessError');
function adminRequire(req, res, next) {
    const user = req.session.user;

    if(user && user.isAdmin) {
        next();
    }
    else {
        throw new AccessError()
    }

}

module.exports = adminRequire;
