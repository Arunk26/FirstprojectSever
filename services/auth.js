const UserDAO = require('../DAO/userDAO');
const MD5 = require('md5');
let jwt = require('jsonwebtoken');
let config = require('../jwt_token/config')
/* API to register new user */
let register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' })
  } else {
    try {
      let criteria = {
        email: req.body.email
      }
      const checkEmail = await UserDAO.getUsers(criteria);
      if (checkEmail && checkEmail.length == 1) {
        res.json({ message: 'email already registered' })
      } else {
        let userData = {
          name: req.body.name,
          email: req.body.email,
          Usertype : req.body.Usertype,
          password: MD5(MD5(req.body.password)),
        };
        const addUser = await UserDAO.createUser(userData);
        // console
        if (addUser) {
          res.status(200).json({ message: 'User registered successfully!' })
          
        } else {
          res.status(403).json({ message: "Something went wrong" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "Something went wrong", error: error });
    }
  }
};


/* API to login user */
let login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({ message: 'Parameters are missing' });
  } else {
    
      let criteria = {
        email: req.body.email,
      };
      const checkEmail = await UserDAO.getUsers(criteria);
      if (checkEmail && checkEmail.length > 0) {
        let criteria = {
          email: req.body.email,
          password: MD5(MD5(req.body.password))
        };
        const checkPassword = await UserDAO.getUsers(criteria);
        if (checkPassword && checkPassword.length == 1) {
          console.log(checkPassword)
          var token = jwt.sign({ id: checkPassword._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          res.status(200).json({ message: 'Logged in successfully!', auth: true, token: token,Usertype : checkPassword[0].Usertype});
        } else {
          res.json({ message: 'Incorrect password' , auth: false, token: null });
        }
      } else {
        res.json({ message: 'Email not exist!',auth: false, token: null  });
        
      }
    } 
};

module.exports = {
  register: register,
  login: login,
}