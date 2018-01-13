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

var upload = multer({dest: "./uploads"});

router.get('/', isLoggedIn, function(req,res){
	db.future.findAll({
		include: [db.user]
	}).then(function(recipes){
		res.render('recipes/wishlist/all', {results: recipes});
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
			publisher: req.body.publisher,
			directions: req.body.directions
		}
	}).spread(function(future, wasCreated){
		if(wasCreated){
			res.redirect('/recipes/wishlist');
		}else{
			res.redirect('/recipes/wishlist');
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
		res.render('recipes/wishlist/single', {recipe: recipe});
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

router.get('/edit/:id', isLoggedIn, function(req,res){
	db.future.findOne({
		where: {id: req.params.id},
		include: [db.user]
	}).then(function(recipe){
		res.render('recipes/wishlist/edit', {recipe: recipe});
	}).catch(function(err){
		console.log(err);
	});
});

router.put('/edit/:id', isLoggedIn, function(req,res){
	db.future.findOne({
		where: {id: req.body.id}
	}).then(function(recipe){
		recipe.title = req.body.title;
		recipe.ingredients = req.body.ingredients;
		recipe.img_url = req.body.img_url;
		recipe.save();
	}).then(function(updatedRecipe){
		res.send('Recipe is updated');
	}).catch(function(err){
		res.send(err);
	});
});

router.get('/add/:id', isLoggedIn, function(req,res){
	db.future.findOne({
		where: {id: req.params.id},
		include: [db.user]
	}).then(function(recipe){
		res.render('recipes/wishlist/add', {recipe: recipe});
	}).catch(function(err){
		console.log(err);
	});
});

module.exports = router;