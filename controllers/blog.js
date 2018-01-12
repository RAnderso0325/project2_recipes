require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var async = require('async');
var multer = require('multer');
var cloudinary = require('cloudinary');
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var rowdy = require('rowdy-logger');
var router = express.Router();

router.get('/', function(req,res){
	res.render('blog/blog');
});

module.exports = router;