require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var router = express.Router();

router.get('/', isLoggedIn, function(req,res){
	var recipeUrl = 'http://food2fork.com/api/search?key='+process.env.RECIPE_API_KEY;
	console.log(recipeUrl);
	request(recipeUrl,function(error,response,body){
		var recipe = JSON.parse(body);
		res.render('recipes/search', {recipe: recipe});
		console.log(recipe);
	});
});

router.get('/:id', isLoggedIn, function(req,res){
	res.send('individual recipes coming soon!');
});

router.get('/favorites', isLoggedIn, function(req,res){
	res.send('favorites page coming soon!');
});

router.post('/favorites', isLoggedIn, function(req,res){
	res.send('post route coming soon!');
});

router.get('/favorites/:id', isLoggedIn, function(req,res){
	res.send('individual recipes coming soon!');
});

router.delete('/favorites/:id', isLoggedIn, function(req,res){
	res.send('delete from favorites coming soon!');
});

router.get('/made', isLoggedIn, function(req,res){
	res.send('recipes I have made coming soon');
});

router.get('/made/:id', isLoggedIn, function(req,res){
	res.send('individual recipes coming soon');
});

router.put('/made/:id', isLoggedIn, function(req,res){
	res.send('edit recipe coming soon');
});

router.delete('/made/:id', isLoggedIn, function(req,res){
	res.send('delete from made coming soon');
});

module.exports = router;