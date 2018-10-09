var express = require('express');
var router = express.Router();
// Database Connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/dbEmenu';
mongoose.connect(mongoDB);
var jwt = require('jsonwebtoken');
var user_helper = require('../helpers/users_helper');
// var config = require('../');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',async (req, res) =>{
  var schema = {
    'email': {
      notEmpty: true,
      errorMessage: "Email is required.",
      isEmail: { errorMessage: "Please enter valid email address" }
    },
    'password': {
      notEmpty: true,
      errorMessage: "password is required."
    },
  };
  req.checkBody(schema);

  var errors = req.validationErrors();
  if (!errors) 
  {
    let login_resp = await user_helper.login(req.body.email,req.body.password);
    // create a token
    var token = jwt.sign({ id: login_resp.user._id }, 'jsonwebtoken', {  
      expiresIn: 86400 // expires in 24 hours
    });
    // delete login_resp.user._id;
    delete login_resp.user.password;
    delete login_resp.user.is_active;
    delete login_resp.user.role;
    delete login_resp.user.is_deleted;
    res.send({"status": login_resp.status,"message" : login_resp.message,"data" : login_resp.user,"tocken" : token});
  }else{
    res.send(errors);
  }
});

router.get('/getAllUsers/:restaurant_id',async (req, res)=> {
  var data = await user_helper.getAll(req.params.restaurant_id);
  if(data)
  {
    res.send({'Status' : 1, 'Message' : 'data get successfully', 'users' : data});
  }else{
    res.send({'Status' : 0, 'Message' : 'Error...'});
  }
});

router.post('/addUser/:restaurant_id', async (req, res) => {
  var schema = {
    'name': {
      notEmpty: true,
      errorMessage: "Name is required.",
    },
    'address': {
      notEmpty: true,
      errorMessage: "Address is required.",
    },
    'email': {
      notEmpty: true,
      errorMessage: "Email is required.",
      isEmail: { errorMessage: "Please enter valid email address" }
    },
    'password': {
      notEmpty: true,
      errorMessage: "password is required."
    },
  };

  req.checkBody(schema);
  var errors = req.validationErrors();
  if(!errors)
  {
    var obj = {
      name : req.body.name,
      address : req.body.address,
      email : req.body.email,
      restaurant_id : req.params.restaurant_id,
      password : req.body.password
    };
    let add_resp = await user_helper.add(obj);
    res.send({"status": add_resp.status,"message" : add_resp.message,"data" : add_resp.data});
  }
  else
  {
    res.send(errors);
  }
});


router.post('/editUser/:_id', async (req, res) => {
  
  var schema = {
    'name': {
      notEmpty: true,
      errorMessage: "Name is required.",
    },
    'address': {
      notEmpty: true,
      errorMessage: "Address is required.",
    },
    'email': {
      notEmpty: true,
      errorMessage: "Email is required.",
      isEmail: { errorMessage: "Please enter valid email address" }
    },
    'password': {
      notEmpty: true,
      errorMessage: "password is required."
    },
  };

  req.checkBody(schema);
  var errors = req.validationErrors();
  if(!errors)
  {
    var obj = {
      name : req.body.name,
      address : req.body.address,
      email : req.body.email,
      password : req.body.password
    };
    let edit_resp = await user_helper.update(req.params._id, obj);
    res.send({"status": edit_resp.status,"message" : edit_resp.message,"data" : edit_resp.data});
  }
  else
  {
    res.send(errors);
  }
});

router.get('/getUserById/:_id',async (req, res) => {
  let user = await user_helper.getByID(req.params._id);
  if(user)
  {
    res.send({'Status' : 1, 'Message' : 'data get successfully', 'users' : user});
  }else{
    res.send({'Status' : 0, 'Message' : 'Error...'});
  }
});

router.get('/deleteUser/:_id',async (req, res) => {
  let user = await user_helper.deleteUser(req.params._id);
  if(user)
  {
    res.send({'Status' : 1, 'Message' : 'user deleted successfully', 'users' : user});
  }else{
    res.send({'Status' : 0, 'Message' : 'Error...'});
  }
});

module.exports = router;
