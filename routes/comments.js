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
					req.flash("error", "Something went wrong... ")
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save
					comment.save();
					foundNiania.comments.push(comment);
					foundNiania.save();
					console.log(comment);
               		req.flash('success', 'Created a comment!');
					res.redirect("/niania/" + foundNiania._id);
				}
			
		}); 
	}
});
});

//comment edit routes

router.get("/niania/:id/comments/:comment_id/edit", checkCommentOwnership, function(req, res){
	Niania.findById(req.params.id, function(err, foundNiania){
		if(err || !foundNiania){
			req.flash("error", "No niania found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit", {niania_id: req.params.id, comment: foundComment})
	    }		
      });
	});
	
});

// comment update

router.put("/niania/:id/comments/:comment_id/", checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/niania/" + req.params.id);
		}
	});
});


// Middleware

function isLogin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkCommentOwnership(req, res, next){
	if(req.isAuthenticated()){
		var idParams =  req.params.comment_id;
		Comment.findById(idParams, function(err, foundComment){
		if(err || !foundComment){
			req.flash("error", "Comment not found");
			res.redirect("back");
		} else{
			//user own comment
		if(foundComment.author.id.equals(req.user._id)){
			next();
		}else{
			req.flash("error", "No permission to do that")
			res.redirect("back");
		}
		}
	});
	}else{
		req.flash("error", "You need to be loggin to do that")
		   res.redirect("back");
		   }
};

module.exports = router;