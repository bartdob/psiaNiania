var mongoose		= require("mongoose"),
	Niania			= require("./models/niania"),
	Comment  		= require ("./models/comment"),
	nianias			= require("./models/niania")

var data = [
	{name: "Greta",
 	 image: "https://polki.pl/foto/1_X_LARGE/najpiekniejsze-twarze-swiata-109848.webp",
	 desc: "Bacon ipsum dolor amet pastrami tri-tip short loin ground round tongue ham bresaola spare ribs hamburger kielbasa filet mignon buffalo frankfurter turkey tenderloin. Meatloaf jowl boudin,  shankle drumstick pork chop"
	},
	{name: "Pola",
 	 image: "https://c8.alamy.com/comp/DM17E1/jennifer-lawrence-2012-toronto-international-film-festival-the-place-DM17E1.jpg",
	 desc: "2 Bacon ipsum dolor amet pastrami tri-tip short loin ground round tongue ham bresaola spare ribs hamburger kielbasa filet mignon buffalo frankfurter turkey tenderloin. Meatloaf jowl boudin,  shankle drumstick pork chop"
	},
	{name: "Pika",
    image:"https://upload.wikimedia.org/wikipedia/commons/b/b4/TIFF_2019_jlo_%281_of_1%29-2_%2848696671561%29_%28cropped%29.jpg",
	 desc: "333 Bacon ipsum dolor amet pastrami tri-tip short loin ground round tongue ham bresaola spare ribs hamburger kielbasa filet mignon buffalo frankfurter turkey tenderloin. Meatloaf jowl boudin,  shankle drumstick pork chop"
	 
	}
]

function seedDB(){
	Comment.deleteMany({}, function(err){
	if(err){
		console.log(err);
	}})
	Niania.deleteMany({}, function(err){
	if(err){
		console.log(err);
	}
	console.log("data has been removed");
		data.forEach(function(seed){
	Niania.create(seed, function(err, data){
		if(err){
			console.log(err);
		}else{
			console.log("add new niania Y :D");
			Comment.create({text: "Love, love, love... :D", author: "Hesus"}, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                data.comments.push(comment);
                                data.save();
                                console.log("Created new comment");
                            }
						});
					}
				});
		});
	});
}
	

//add a few nianias to DB


module.exports = seedDB; 