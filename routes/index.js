var express 	= require("express");
var router  	= express.Router();
var passport 	= require("passport");
var User 		=  require("../models/user");


router.get("/", function(req, res){
	res.render("landing");
});


router.get("/kontakt", function(req, res){
		res.render("kontakt");
});

//	auth rutes

//==============================
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message) // err goes from error passport
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to... " + user.username);
			res.redirect("/niania");
		});
	});
});

// ==================== LOGIN

router.get("/login", function(req, res){
	res.render("login");	
});

//LOGIN logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/niania",
		failureRedirect: "/login"
	}), function(req, res){
	
});

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "LOGGED YOU OUT!");
	res.redirect("/login");
});

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


module.exports = router;