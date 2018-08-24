var express = require('express'),
bodyParser = require('body-parser'),
app = express();
app.use(bodyParser.json())
const mongo = require('mongodb').MongoClient,
url = 'mongodb://reshad:house-1124@ds121312.mlab.com:21312/housing-uni';
var db; //setting var with global scope
mongo.connect(url, (err, database) => {
  // ... start the server
  if (err) console.log("Could not start db");
  else {
  	console.log("DB connection opened");
  	db = database.db('housing-uni'); //settign db to housing
  }
})

app.post("/getRequests", function(req, res){
	var email = req.body.email;
	var cursor = db.collection('users').find({requested:true, email: email});
	var db_data = cursor.toArray(function(err,dat){
		res.send(dat);
	});

})


app.listen(8080, () => console.log("Server is running!"));

