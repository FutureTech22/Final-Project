const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jwt-simple');
const path = require('path');
const request = require('request');
const moment = require('moment');
mongoose.connect('mongodb://brettsdb:12345@ds133261.mlab.com:33261/final_project_user_database');


app.use(express.static('app'))
app.use(express.static('public'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/',(req,res)=>{
  req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.sendFile(path.resolve(__dirname,'./app/index.html'));
})


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
});

function createJWT(user) {
 var payload = {
   sub: user._id,
   iat: moment().unix(),
   exp: moment().add(14, 'days').unix()
 };
 return jwt.encode(payload, 'brettsapp');
}

app.post('/auth/facebook', function(req, res) {
  var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
  var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
  var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
  var params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: '368dc6e54bd11eebe41665b3d4c674df',
    redirect_uri: req.body.redirectUri
  };


  // Step 1. Exchange authorization code for access token.
  request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
    if (response.statusCode !== 200) {
      console.log(accessToken.error.message)
      return res.status(500).send({ message: accessToken.error.message });
    }

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
      if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
      }
      if (req.header('Authorization')) {
        User.findOne({ facebook: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            console.log(token);
            return res.send({ token: token });
          }
          var token = req.header('Authorization').split(' ')[1];
          var payload = jwt.decode(token, 'brettsapp');
          User.findById(payload.sub, function(err, user) {
            if (!user) {
              return res.status(400).send({ message: 'User not found' });
            }
            user.facebook = profile.id;
            user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
            user.displayName = user.displayName || profile.name;
            user.save(function() {
              var token = createJWT(user);
              res.send({ token: token });
            });
          });
        });
      } else {
        // Step 3. Create a new user account or return an existing one.
        User.findOne({ facebook: profile.id }, function(err, existingUser) {
          if (existingUser) {
            var token = createJWT(existingUser);
            return res.send({ token: token });
          }
          var user = new User();
          user.facebook = profile.id;
          user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          user.displayName = profile.name;
          user.save(function() {
            var token = createJWT(user);
            res.send({ token: token });
          });
        });
      }
    });
  });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});