var express 		= require("express");
var app 			= express();
var bodyParser 		= require("body-parser");
var mongoose		= require("mongoose");


mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/niania", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


//SCHEMA

var nianiaSchema = new mongoose.Schema({
	name: String,
	image: String,
	desc: String //description of niania
});

var Niania = mongoose.model("Niania", nianiaSchema);

// Niania.create(
// 	{name: "Greta",
// 	 image: "https://polki.pl/foto/1_X_LARGE/najpiekniejsze-twarze-swiata-109848.webp",
// 	 desc: "Bacon ipsum dolor amet pastrami tri-tip short loin ground round tongue ham bresaola spare ribs hamburger kielbasa filet mignon buffalo frankfurter turkey tenderloin. Meatloaf jowl boudin,  shankle drumstick pork chop 	                     andouille tbone ham hock sirloin filet mignon pork belly Brisket filet mignon cow beef hamburger. Swine meatball prosciutto ground round frankfurter flank cupim. Tail salami hamburger fatback capicola"
// 	}, function (err, niania){
// 		if(err){
// 			console.log("Error: "+err);
// 		}else {
// 			console.log("new person add");
// 			console.log(niania);
// 		}
// 	}
// )

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
	var newNiania = {name: name, image: image}
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
	Niania.findById(idParams, function(err, foundNiania){
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