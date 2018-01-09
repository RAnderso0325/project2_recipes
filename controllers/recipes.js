require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('../models');
var router = express.Router();

router.get('/', function(req,res){
	var recipeUrl = 'http://food2fork.com/api/search?key='+process.env.RECIPE_API_KEY;
	request(recipeUrl,function(error,response,body){
		var recipe = JSON.parse(body);
		res.render('recipes/search', {recipe: recipe});
		console.log(recipe);
	});
});

module.exports = router;