
const authService = require("../Services/auth");
var express = require('express');
const router = express.Router();
const DAOUSER = require("../DAO/userDAO")
let user = require('../Models/user');

// get user
router.route('/getUser').get((req, res, next) => {
  user.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});



router.route("/register").post(authService.register);
router.route("/login").post(authService.login);

module.exports = router;