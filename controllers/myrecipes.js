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
	db.current.findAll({
		include: [db.user]
	}).then(function(recipes){
		res.render('recipes/myRecipes/all', {results: recipes});
	});
});

router.get('/new', isLoggedIn, function(req,res){
	res.render('/recipes/myRecipes/new');
});

router.post('/', isLoggedIn, function(req,res){//new recipe
	db.current.findOrCreate({
		where: {id: req.body.id},
		include: [db.user],
		defaults: {
			rId: req.body.rId,
			title: req.body.title,
			ingredients: req.body.ingredients,
			directions: req.body.directions,
			img_url: req.body.img_url,
			publisher: req.body.publisher,
			source_url: req.body.source_url,
			user_img: userImg
		}
	}).spread(function(current, wasCreated){
		if(wasCreated){
			res.redirect('/recipes/myrecipes');
		}else{
			res.redirect('/recipes/myrecipes');
		}
	});
});

router.get('/:id', isLoggedIn, function(req,res){
	db.current.findOne({
		where: {id: req.params.id},
		include: [db.user]
	}).then(function(recipe){
		res.render('recipes/myRecipes/single', {recipe: recipe});
	}).catch(function(err){
		console.log(err);
	});
});

router.get('/edit/:id', isLoggedIn, function(req,res){
	db.current.findOne({
		where: {id: req.params.id},
		include: [db.user]
	}).then(function(recipe){
		res.render('recipes/myRecipes/edit', {recipe: recipe});
	}).catch(function(err){
		console.log(err);
	});
});

router.get('/add-photo/:id', isLoggedIn, function(req,res){
	db.current.findOne({
		where: {id: req.params.id},
		include: [db.user]
	}).then(function(recipe){
		res.render('recipes/myRecipes/addPhoto', {recipe: recipe});
	}).catch(function(err){
		console.log(err);
	});
});

router.post('/add-photo/:id', isLoggedIn, upload.single('myFile'), function(req,res){
	var userImg;
	cloudinary.v2.uploader.upload(req.file.path, function(error, result){
		userImg = result.public_id;
		console.log(userImg);
		db.current.findOne({
			where: {id: req.params.id},
			include: [db.user]
		}).then(function(recipe){
			recipe.user_img = userImg;
			recipe.save();
		}).then(function(updatedRecipe){
			res.redirect('/recipes/myrecipes/'+req.params.id);
		}).catch(function(err){
			res.send(err);
		});
	});
});

router.put('/edit/:id', isLoggedIn, function(req,res){
	db.current.findOne({
		where: {id: req.body.id}
	}).then(function(recipe){
		recipe.title = req.body.title;
		recipe.ingredients = req.body.ingredients;
		recipe.img_url = req.body.img_url;
		recipe.directions = req.body.directions;
		recipe.save();
	}).then(function(updatedRecipe){
		res.send('Recipe is updated');
	}).catch(function(err){
		res.send(err);
	});
});

router.delete('/:id', isLoggedIn, function(req,res){
	db.current.findOne({
		where: {id: req.params.id}
	}).then(function(recipe){
		db.current.destroy({
			where: {id: req.params.id}
		}).then(function(deleted){
			res.send('all good');
		});
	}).catch(function(err){
		res.send('uh oh', err);
	});
});

module.exports = router;