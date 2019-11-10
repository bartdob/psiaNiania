var express = require("express");
var router  = express.Router();
var Niania	= require("../models/niania");


// SHOW ALL NIANIA
router.get("/niania", function(req, res){
	Niania.find({}, function(err, allniania){
		if(err){
			console.log(err);
		}else{
			res.render("niania/niania", {niania: allniania});
		}
	});
	
})

router.post("/niania", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.desc;
	var newNiania = {name: name, image: image, desc: desc}
	Niania.create(newNiania, function(err, neeewCreated){
		if(err){
			console.log(err)
		}else{
			res.redirect("/niania/niania")
		}
	});
});

router.get("/niania/new", function(req, res){
	res.render("niania/new");
});
//Show description about nianias
router.get("/niania/:id", function(req, res){
	var idParams =  req.params.id;
	Niania.findById(idParams).populate("comments").exec(function(err, foundNiania){
		if(err){
			console.log(err);
		}else{
			res.render("niania/show", {niania: foundNiania});
		}						 
	});
});

module.exports = router;