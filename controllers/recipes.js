require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var rowdy = require('rowdy-logger');
var router = express.Router();

router.get('/', isLoggedIn, function(req,res){
	res.render('recipes/search');
});

router.post('/', isLoggedIn, function(req,res){
	var userQueryArr = [];
	var userQuery;
	if (req.body.search){
		userQueryArr = req.body.search.split(',');
		userQuery = userQueryArr.join();
	}
	var recipeUrl = 'http://food2fork.com/api/search?key='+process.env.RECIPE_API_KEY+'&q='+userQuery;
	request(recipeUrl,function(error,response,body){
		var recipe = JSON.parse(body);
		res.render('recipes/results', {recipe: recipe});
	});
});

router.post('/individual', isLoggedIn, function(req,res){
	var recipeId = req.body.rId;
	var individUrl = 'http://food2fork.com/api/get?key='+process.env.RECIPE_API_KEY+'&rId='+recipeId;
	request(individUrl,function(error,response,body){
		var recipe = JSON.parse(body);
		console.log(recipe);
		res.render('recipes/show', {recipe: recipe});
	});
});

module.exports = router;