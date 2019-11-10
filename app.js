var 	express 		= require("express"),
 		app 			= express(),
 		bodyParser 		= require("body-parser"),
 		mongoose		= require("mongoose"),
		passport		= require("passport"),
		LocalStrategy   = require("passport-local"),
		Niania			= require("./models/niania"),
 		Comment			= require("./models/comment"),	
		User			= require("./models/user"),
 		seedDB			= require("./seeds");

		var commentsRoutes = require("./routes/comments"),
			 nianiaRoutes  = require("./routes/niania"),
			 indexRoutes   = require("./routes/index");

seedDB(); // remove data from database

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/niania", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// set up SESSION
app.use(require("express-session")({
		secret: "Patricia is cute",
		resave: false,
		saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// funkcja dodająca do każdej stony usera

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});




//SCHEMA - move to niania.js


// app.get("/", function(req, res){
// 	res.render("landing");
// });

// app.get("/niania", function(req, res){
// 	Niania.find({}, function(err, allniania){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			res.render("niania/niania", {niania: allniania});
// 		}
// 	});
	
// })

// app.post("/niania", function(req, res){
// 	var name = req.body.name;
// 	var image = req.body.image;
// 	var desc = req.body.desc;
// 	var newNiania = {name: name, image: image, desc: desc}
// 	Niania.create(newNiania, function(err, neeewCreated){
// 		if(err){
// 			console.log(err)
// 		}else{
// 			res.redirect("/niania/niania")
// 		}
// 	});
// });

// app.get("/niania/new", function(req, res){
// 	res.render("niania/new");
// });
// //Show description about nianias
// app.get("/niania/:id", function(req, res){
// 	var idParams =  req.params.id;
// 	Niania.findById(idParams).populate("comments").exec(function(err, foundNiania){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			res.render("niania/show", {niania: foundNiania});
// 		}						 
// 	});
// });

//===============================
// Comments routes
//===============================

// app.get("/niania/:id/comments/new", isLogin, function (req, res){
// 	Niania.findById(req.params.id, function(err, foundNiania){
// 		if(err){
// 			console.log(err);
// 		}
// 		else{
// 			res.render("comments/new", {niania: foundNiania});
// 		} 
// 	})
// })

// app.post("/niania/:id/comments", isLogin, function(req, res){
// 		Niania.findById(req.params.id, function(err, foundNiania){
// 		if(err){
// 			console.log(err);
// 			res.redirect("/niania")
// 		}
// 		else{
// 			Comment.create(req.body.comment, function(err, comment){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					foundNiania.comments.push(comment);
// 					foundNiania.save();
// 					res.redirect("/niania/" + foundNiania._id);
// 				}
			
// 		}) 
// 	}
// })
// })

// =============================
//	auth rutes

//==============================
// app.get("/register", function(req, res){
// 	res.render("register");
// });

// app.post("/register", function(req, res){
// 	var newUser = new User({username: req.body.username});
// 	User.register(newUser, req.body.password, function(err, user){
// 		if(err){
// 			console.log(err);
// 			return res.render("register");
// 		}
// 		passport.authenticate("local")(req, res, function(){
// 			res.redirect("/niania")
// 		});
// 	});
// });

// ==================== LOGIN

// app.get("/login", function(req, res){
// 	res.render("login");	
// });

// //LOGIN logic
// app.post("/login", passport.authenticate("local",
// 	{
// 		successRedirect: "/niania",
// 		failureRedirect: "/login"
// 	}), function(req, res){
	
// });

// app.get("/logout", function(req, res){
// 	req.logout();
// 	res.redirect("login")
// });

// function isLogin(req, res, next){
// 	if(req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect("/login");
// }

app.use(indexRoutes);
app.use(nianiaRoutes);
app.use(commentsRoutes);

app.listen(3000, function(){
	console.log("+++++++++++++++UP AND RUNNING++++++++++++++++");
});