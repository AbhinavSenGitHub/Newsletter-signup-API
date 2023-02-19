// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));         // all the static folder will be shon on our browser
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  var fName = req.body.firstName;
  var lName = req.body.lastName;
  var eMail = req.body.email;

  const data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/cf9422cd8e"
  const options = {
    method: "POST",
    auth: "abhinav:d1b03f33ee3083480e42c0d765e6e954-us21"
  }

  const request = https.request(url, options, function(response){
    // console.log(response.statusCode);
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data))
    })
  })
  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
})
// API key
// eec45e6583d3436a2c5eb71ea183768f-us21

// API SECOND
// d1b03f33ee3083480e42c0d765e6e954-us21

// audience id
// cf9422cd8e.
