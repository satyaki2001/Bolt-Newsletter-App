const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT||3000, function(){
  console.log("Server is started at port 3000!")
});

app.get("/styles.css" , function(req, res) {
res.sendFile ( __dirname + "/\styles.css");
  });


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: "016bf0d4877094a17511f1a36931d8b2-us11",
  server: "us11"
});

app.post("/", function(req, res){

  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;  
  const listId = "26afff9407";

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email
  };

  async function run(){
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    res.sendFile(__dirname + "/success.html")
    console.log(
   `Successfully added contact as an audience member. The contact's id is ${
    response.id
    }.`
   );
  }
  run().catch(e => res.sendFile(__dirname + "/failure.html"));
});




//api key
//016bf0d4877094a17511f1a36931d8b2-us11

//audience id
//26afff9407