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

router.get('/favorites', isLoggedIn, function(req,res){
	db.future.findAll({
		include: [db.user]
	}).then(function(recipes){
		res.render('recipes/myRecipes/favorites', {results: recipes});
	});
});

router.post('/favorites', isLoggedIn, function(req,res){
	db.future.findOrCreate({
		where: {rId: req.body.rId},
		include: [db.user],
		defaults: {
			rId: req.body.rId,
			title: req.body.title,
			ingredients: req.body.ingredients,
			source_url: req.body.source_url,
			img_url: req.body.img_url,
			publisher: req.body.publisher
		}
	}).spread(function(future, wasCreated){
		if(wasCreated){
			res.redirect('/recipes/favorites');
		}else{
			res.redirect('/recipes/favorites');
		}
	}).catch(function(err){
		res.send(err);
	});
});

router.get('/favorites/:id', isLoggedIn, function(req,res){
	db.future.findOne({
		where: {id: req.params.id},
		include: [db.user]
	}).then(function(recipe){
		res.render('recipes/myRecipes/single', {recipe: recipe});
	}).catch(function(err){
		console.log(err);
	});
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