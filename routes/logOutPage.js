var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next){
  console.log(req.session);
  if(req.session.user) {
    req.session.destroy(() => {
      res.send("hello");
    })
  }
  else {
    next()
  }

});

module.exports = router;