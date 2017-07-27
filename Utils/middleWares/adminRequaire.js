function adminRequire(req, res, next) {
    const user = req.session.user;

    if(user && user.isAdmin) {
        next();
    }
    else {
        res.status(403).send('Sorry, you are just user. Please, sigh in as admin.')
    }

}

module.exports = adminRequire;
