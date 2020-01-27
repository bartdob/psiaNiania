var mongoose = require("mongoose");

var nianiaSchema = new mongoose.Schema({
	name: String,
	price: String,
	image: String,
	desc: String, //description of niania
	author: {
		username: String,
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
   	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		
	}]
});

module.exports = mongoose.model("Niania", nianiaSchema);

// Niania.create(
// 	{name: "Greta",
// 	 image: "https://polki.pl/foto/1_X_LARGE/najpiekniejsze-twarze-swiata-109848.webp",
// 	 desc: "Bacon ipsum dolor amet pastrami tri-tip short loin ground round tongue ham"
// 	}, function (err, niania){
// 		if(err){
// 			console.log("Error: "+err);
// 		}else {
// 			console.log("new person add");
// 			console.log(niania);
// 		}
// 	}
// )