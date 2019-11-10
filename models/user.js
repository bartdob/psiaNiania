var mongoose 				= require("mongoose");
var passportLocalMongoose 	= require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
	username: {type: String, required: true, uniqe: true},
	password: {type: String},//, required: true},
	age: {type: Number, min: 18, max: 70},
	money: {type: Number, min: 1, max: 500},
	gender: {type: Number, enum: ["male", "female"] }
	
	
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);