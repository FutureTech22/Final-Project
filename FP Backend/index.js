const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const User = require('./models/user');
const Blog = require('./models/blog');
const Location = require('./models/location');
const jwt = require('jwt-simple');
const path = require('path');
const request = require('request');
const moment = require('moment');
mongoose.connect('mongodb://brettsdb:12345@ds133261.mlab.com:33261/final_project_user_database');


app.use(express.static('app'))
app.use(express.static('public'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Authorization,accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
  next();
});



app.get('/home',(req,res)=>{
	res.sendFile(path.resolve(__dirname,'./app/index.html'));
});


// Get all the blogs
app.get('/blog',(req,res)=>{
	Blog.find().exec((err,response)=>{
		if(err) return res.json(err);
		res.json(response);
	})
})

// Post a new blog
app.post('/blog',function(req,res){
	let newBlog = new Blog();
		newBlog.title = req.body.title;
		newBlog.description = req.body.description;
    newBlog.url = req.body.url;
		newBlog.save(err=>{
		    if(err) return res.json({err});
		    Blog.find().exec((err,response)=>{
		      if(err) res.json({err});
		      res.json(response);
		    });
		});
});

// Get the location
app.get('/location',(req,res)=>{
  Location.find().exec((err,response)=>{
    if(err) return res.json(err);
    res.json(response);
  })
})


//Get user
app.post('/user', (req,res)=>{
  const user = User.findOne({_id:req.body.user},(err,user)=>{
    if(err) res.json({err});
    res.json(user);
  });
});

// Get a single person
app.get('/users/:id',function(req,res){
  let id = req.params.id;
  const single = data.filter(singleData => {
    if(singleData.id == id ) {
      return true;
    }
  })
  res.json(single);
}),

// Delete a location
app.delete('/addLocation/:id',function(req,res){
  let id = req.params.id;

  Location.remove({_id:id},(err) => {
    if(err) res.json(err);
    console.log("INSIDE")

    Location.find().exec((err,response)=>{
        if(err) res.json({err});
        res.json(response);
      });

  });
})

//updating locations
app.post('/addLocation', function(req,res){
  let location = req.body.location;
  let id = req.body.id;
  const user = User.findOne({_id:id},((err,user)=>{
    user.locations.push(location);
    user.save(err=>{
      if(err) return res.json({err});
        User.find().exec((err,response)=>{
          if(err) res.json({err});
          res.json(response);
      });
  });
  }))
})

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