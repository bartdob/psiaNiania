var 	express 		= require("express"),
 		app 			= express(),
 		bodyParser 		= require("body-parser"),
		MongoClient 	= require("mongodb").MongoClient,
 		mongoose		= require("mongoose"),
	    flash			= require("connect-flash"),
		passport		= require("passport"),
		LocalStrategy   = require("passport-local"),
		methodOverride  = require("method-override"),
		Niania			= require("./models/niania"),
 		Comment			= require("./models/comment"),	
		User			= require("./models/user"),
 		seedDB			= require("./seeds");

		var commentsRoutes = require("./routes/comments"),
			 nianiaRoutes  = require("./routes/niania"),
			 indexRoutes   = require("./routes/index");

//seedDB(); // remove data from database

//==========MONGO LOCAl

mongoose.set('useUnifiedTopology', true);
//mongoose.connect("mongodb://localhost/niania", { useNewUrlParser: true });


mongoose.set('useFindAndModify', false);

//==========Mongo Cloud

mongoose.connect("mongodb+srv://@c1-p2jtc.azure.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

// const uri = "mongodb+srv://@c1-p2jtc.azure.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err, client) => {
// 	if(err){
// 		console.log("Failed to db" + err);
// 	}else{
// 		console.log("success connect");
// 	}
//   client.close();
// });


//===============================

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// set up SESSION
app.use(require("express-session")({
		secret: "Patricia is cute",
		resave: false,
		saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// funkcja dodająca do każdej stony usera

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});


app.use(indexRoutes);
app.use(nianiaRoutes);
app.use(commentsRoutes);

app.listen(3000, function(){
	console.log("+++++++++++++++UP AND RUNNING++++++++++++++++");
});