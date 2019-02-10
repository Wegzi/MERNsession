const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {

  /*
  * SINGUP
  */

  app.post('/api/account/signup',(req, res, next) =>{
    const { body } = req;
    const {
      firstName,
      password
    } = body;
    let { email } = body;

    if (!firstName){
      return res.send({
        success: false,
        message: 'erro first name cannot be blank'
      });
    }
    if (!email){
      return res.send({
        success: false,
        message: 'erro email cannot be blank'
      });
    }
    if (!password){
      return res.send({
        success: false,
        message: 'erro password cannot be blank'
      });
    }
    email = email.toLowerCase();

    //check if email exist
    User.find({
      email: email
    }, (err, previousUser) => {
      if (err) {
        return res.send({
          success: false,
          message: 'erro: server error'
        });
      } else if (previousUser.length > 0) {
        return res.send({
          success: false,
          message: 'erro email already exist'
        });
      }

      //save

      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.password = newUser.genereteHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'erro: server error'
          });
        }
        return res.send({
          success: true,
          message: 'signed up'
        });
      })

    })
  });

  /*
  * SINGIN
  */

  app.post('/api/account/signin',(req, res, next) =>{
    const { body } = req;
    const {
      firstName,
      password
    } = body;
    let { email } = body;

    if (!email){
      return res.send({
        success: false,
        message: 'erro email cannot be blank'
      });
    }
    if (!password){
      return res.send({
        success: false,
        message: 'erro password cannot be blank'
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'error: invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'error: invalid1'
        })
      }

      //valid user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.userName = user.firstName;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'valid sign in ',
          token: doc._id,
          nome: user.firstName
        });
      });
    });
  });

  /*
  * VERIFY
  */

  app.get('/api/account/verify',(req, res, next) =>{
    //get token
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'error: server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'error: invalid session'
        });
      } else {
        return res.send({
          verify: true,
          message: 'good'
        });
      }
    });

  });

  /*
  * LOGOUT
  */

  app.get('/api/account/logout', (req, res, next) => {
    //get token
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set:{isDeleted:true}
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'error: server error'
        });
      }
      return res.send({
        success: true,
        message: 'good'
      });
    });
  });
};
