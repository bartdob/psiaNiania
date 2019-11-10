var express = require("express");
var router  = express.Router({mergeParams: true});
var Niania	= require("../models/niania");
var Comment	= require("../models/comment");

router.get("/niania/:id/comments/new", isLogin, function (req, res){
	Niania.findById(req.params.id, function(err, foundNiania){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new", {niania: foundNiania});
		} 
	})
})

router.post("/niania/:id/comments", isLogin, function(req, res){
		Niania.findById(req.params.id, function(err, foundNiania){
		if(err){
			console.log(err);
			res.redirect("/niania")
		}
		else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					foundNiania.comments.push(comment);
					foundNiania.save();
					res.redirect("/niania/" + foundNiania._id);
				}
			
		}) 
	}
})
})

// Middleware

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;