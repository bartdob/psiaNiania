var express 		= require("express"),
 app 				= express(),
 bodyParser 		= require("body-parser"),
 mongoose			= require("mongoose"),
 Niania			    = require("./models/niania"),
 seedDB				= require("./seeds");

seedDB(); // remove data from database

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/niania", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


//SCHEMA - move to niania.js


app.get("/", function(req, res){
	res.render("landing");
});

app.get("/niania", function(req, res){
	Niania.find({}, function(err, allniania){
		if(err){
			console.log(err);
		}else{
			res.render("niania", {niania: allniania});
		}
	});
	
})

app.post("/niania", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.desc;
	var newNiania = {name: name, image: image, desc: desc}
	Niania.create(newNiania, function(err, neeewCreated){
		if(err){
			console.log(err)
		}else{
			res.redirect("/niania")
		}
	});
});

app.get("/niania/new", function(req, res){
	res.render("new");
});
//Show description about nianias
app.get("/niania/:id", function(req, res){
	var idParams =  req.params.id;
	Niania.findById(idParams).populate("comments").exec(function(err, foundNiania){
		if(err){
			console.log(err);
		}else{
			res.render("show", {niania: foundNiania});
		}						 
	});
});

app.listen(3000, function(){
	console.log("+++++++++++++++UP AND RUNNING++++++++++++++++");
});