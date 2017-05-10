const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://brettsdb:12345@ds133261.mlab.com:33261/final_project_user_database');


app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 

//Open ID
var passport = require('passport')
  , OpenIDStrategy = require('passport-openid').Strategy;

passport.use(new OpenIDStrategy({
    returnURL: 'localhost:3000/?#/searchCity',
    realm: 'localhost:300/?#'
  },
  function(identifier, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

// Accept the OpenID identifier and redirect the user to their OpenID
// provider for authentication.  When complete, the provider will redirect
// the user back to the application at:
//     /auth/openid/return
app.post('/?#/searchCity', passport.authenticate('openid'));

// The OpenID provider has redirected the user back to the application.
// Finish the authentication process by verifying the assertion.  If valid,
// the user will be logged in.  Otherwise, authentication has failed.
app.get('/map',
  passport.authenticate('openid', { successRedirect: '/',
                                    failureRedirect: '/login' }));
//End of Opend ID? No way is this going to work	


// Get all the users
app.get('/user',(req,res)=>{
	User.find().exec((err,response)=>{
		if(err) return res.json(err);
		res.json(response);
	})
})

// Post a new users
app.post('/user',function(req,res){
	let newUser= new User();
		newUser.name = req.body.name;
		newUser.password = req.body.password;
		newUser.save(err=>{
		    if(err) return res.json({err});
		    User.find().exec((err,response)=>{
		      if(err) res.json({err});
		      res.json(response);
		    });
		});
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});