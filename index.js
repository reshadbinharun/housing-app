var express = require('express'),
bodyParser = require('body-parser'),
app = express();
app.use(bodyParser.json())
const mongo = require('mongodb').MongoClient,
url = 'mongodb://reshad:house-1124@ds121312.mlab.com:21312/housing-uni';
var db; //setting var with global scope

function dateGen(month, year){
  var date = ''
  return date + month + '-' + year;
}
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

app.post("/search", function(req, res){
  var zip = req.body.zip, low_price = req.body.low_price, high_price = req.body.high_price, 
      start_m = req.body.start_m, start_y = req.body.start_y, end_m = req.body.end_m, end_y = req.body.end_y;
  // var start_date = dateGen(req.body.start_m, req.body.start_y), end_date = dateGen(req.body.end_m, req.body.end_y);
  // console.log(start_date, end_date);
  var cursor = db.collection('users').find({ address: {zip : zip}, 
                                  availability: { start_m: { $lte: start_m} } , availability: {start_y: {$lte: start_y}},
                                  availability: { end_m: {$gte: end_m}}, availability: {end_y: {$gte: end_y}},
                                  price: {$gte: low_price, $lte: high_price}});
  var db_data = cursor.toArray(function(err,dat){
    console.log(dat);
    res.send(dat);
  });

})


app.listen(8080, () => console.log("Server is running!"));

