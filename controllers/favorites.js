require('dotenv').config();
var express = require('express');
var request = require('request');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var async = require('async');
var cheerio = require('cheerio');
var isLoggedIn = require('../middleware/isLoggedIn');
var db = require('../models');
var rowdy = require('rowdy-logger');
var router = express.Router();

router.get('/', isLoggedIn, function(req,res){
	db.future.findAll({
		include: [db.user]
	}).then(function(recipes){
		res.render('recipes/myRecipes/favorites', {results: recipes});
	});
});

router.post('/', isLoggedIn, function(req,res){
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

router.get('/:id', isLoggedIn, function(req,res){
	db.future.findOne({
		where: {id: req.params.id},
		include: [db.user]
	}).then(function(recipe){
		res.render('recipes/myRecipes/single', {recipe: recipe});
	}).catch(function(err){
		console.log(err);
	});
});

router.delete('/:id', isLoggedIn, function(req,res){
	db.future.findOne({
		where: {id: req.params.id}
	}).then(function(recipe){
		db.future.destroy({
			where: {id: req.params.id}
		}).then(function(deleted){
			res.send('all good');
		});
	}).catch(function(err){
		res.send('uh oh', err);
	});
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