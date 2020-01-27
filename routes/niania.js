var express = require("express");
var router  = express.Router({mergeParams: true});
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
});

router.post("/niania", isLogin, function(req, res){
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.desc;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newNiania = {name: name, price: price, image: image, desc: desc, author: author};
	Niania.create(newNiania, function(err, neeewCreated){
		if(err){
			console.log(err)
		}else{
			res.redirect("/niania")
		}
	});
});

router.get("/niania/new", isLogin, function(req, res){
	res.render("niania/new");
});
//Show description about nianias
router.get("/niania/:id", function(req, res){
	var idParams =  req.params.id;
	Niania.findById(idParams).populate("comments").exec(function(err, foundNiania){
		if(err || !foundNiania){
			req.flash("error", "Niania not found");
			res.redirect("back");
		}else{
			console.log(foundNiania);
			res.render("niania/show", {niania: foundNiania});
		}						 
	});
});

//=================================Edit ROUTES ==================================

router.get("/niania/:id/edit", checkNianiaOwenership, function(req, res){
		var idParams =  req.params.id;
		Niania.findById(idParams, function(err, foundNiania){
		res.render("niania/edit", {niania: foundNiania});
	});
});
//===============================UPDATe ROUTE ====================================
router.put("/niania/:id", checkNianiaOwenership, function(req, res){
	Niania.findOneAndUpdate(req.params.id, req.body.niania, function(err, updateNiania){
	if(err){
		res.redirect("niania");
	}else{
		res.redirect("/niania/" + req.params.id);
		}
	});
});

//====================================Destroy

router.delete("/niania/:id", checkNianiaOwenership, function(req, res){
	var idParams =  req.params.id;
	Niania.findOneAndRemove((idParams), function(err, foundNiania){
		if(err){
			res.redirect("/niania");
		}else{
			res.redirect("/niania");
		}						 
	});
});


//===================================Function/ Middleware

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first");
	res.redirect("/login");
}

function checkNianiaOwenership(req, res, next){
	if(req.isAuthenticated()){
		var idParams =  req.params.id;
		Niania.findById(idParams, function(err, foundNiania){
		if(err || !foundNiania){
			req.flash("error", "Niania not found, please try again... ")
			res.redirect("back");
		} else{
			//user own niania
		if(foundNiania.author.id.equals(req.user._id)){
			next();
		}else{
			req.flash("error", "No permission to do that")
			res.redirect("back");
		}
		}
	});
	}else{
			req.flash('error', 'You need to be login to do that');
		   res.redirect("back");
		   }
};


module.exports = router;