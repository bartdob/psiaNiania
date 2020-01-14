var 	express 		= require("express"),
 		app 			= express(),
 		bodyParser 		= require("body-parser"),
 		mongoose		= require("mongoose"),
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

mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/niania", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
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


app.use(indexRoutes);
app.use(nianiaRoutes);
app.use(commentsRoutes);

app.listen(3000, function(){
	console.log("+++++++++++++++UP AND RUNNING++++++++++++++++");
});