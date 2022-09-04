const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = 3000;
const https = require("https");
const { json } = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName, lastName, email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us18.api.mailchimp.com/3.0/lists/1b7354d2c3";
  const options = {
    method: "POST",
    auth: "pratik:6d44a809e401a05bd88e25cb6b6bae61-us18",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html")
    } else {
     res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", (req,res)=>{
  res.redirect("/")
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port`);
});

// api key mailchimp
// 6d44a809e401a05bd88e25cb6b6bae61-us18

// list id
// 1b7354d2c3
