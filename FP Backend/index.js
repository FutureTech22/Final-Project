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