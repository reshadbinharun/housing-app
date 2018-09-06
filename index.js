require('dotenv').config()
var express = require('express'),
bodyParser = require('body-parser'),
nodemailer = require('nodemailer')
app = express();
app.use(bodyParser.json())
const mongo = require('mongodb').MongoClient,
url = process.env.mongo_url;
var db; //setting var with global scope


//SETTING UP SMTP using nodemailer
/*
 --------------------------------------SMTP-----------------------------------------------------
*/
var smtpTransport = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: process.env.smtp_user,
      pass: process.env.smtp_pass
    }});
var rand, mailOptions, host, link;

app.post('/startVerify', function(req,res){
  var email = req.body.email;
  console.log("email verify send route hit!", req.body)
        rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://"+req.get('host')+"/verify?id="+rand;
    //change to email that needs to be verified
    mailOptions = {
        to : 'reshadbinharun',
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

//AUTOMATICALLY CALLED WHEN VERIFICATION LINK IS CLICKED!
app.get('/verify',function(req,res){
console.log(req.protocol+":/"+req.get('host'));
var email = req.body.email;
if((req.protocol+"://"+req.get('host'))==("http://"+host))
{
    console.log("Domain is matched. Information is from Authentic email");
    if(req.query.id==rand)
    {
        console.log("email is verified");
        res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
        //store in Database if this is verified!
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
}
else
{
    res.end("<h1>Request is from unknown source");
}
});
/*
 --------------------------------------SMTP-----------------------------------------------------
*/
//SMTP

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

app.post("/validate", function(req, res){
  var email_id = req.body.email;
  console.log("validated route hit with ", email_id)
  //interaction with email verification and if email verified, modify database to say the email has been verified

  res.send({validated: true, school:'tufts'}) //refer to database interaction
})

app.get("/loadUnis", function(req, res){
  var cursor = db.collection('universities').find();
  var db_data = cursor.toArray(function(err,dat){
    console.log(dat);
    res.send(dat);
  });
})

/*
zip: this.state.zip,
        price: this.state.price,
        start_m: this.state.start_m,
        start_y: this.state.start_y,
        end_m: this.state.end_m,
        end_y: this.state.end_y

*/

app.post("/addList", function(req, res){
  var user = req.body.user, street = req.body.street, zip = req.body.zip, city = req.body.city, school = req.body.school, start_m = req.body.start_m, start_y = req.body.start_y, 
             end_m = req.body.end_m, end_y = req.body.end_y, price = req.body.price, parking = req.body.parking;
  console.log("addList route hit for ", user)
  db.collection('users').insert({email: user, 
                                address: {street: street, zip: zip},
                                school: school,
                                availability: {start_m: start_m, start_y: start_y, end_m: end_m, end_y: end_y},
                                price: price,
                                parking: parking
  })
  res.send("Added Listing!")
})

app.post('/getUserListings', function(req, res){
  console.log("getting your listings")
  var user = req.body.email;
  var cursor = db.collection('users').find({email: email});
  var db_data = cursor.toArray(function(err,dat){
    console.log(dat);
    res.send(dat);
  });
})

app.listen(8080, () => console.log("Server is running!"));

