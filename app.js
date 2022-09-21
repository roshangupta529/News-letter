const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const request = require("request");
 
const app =  express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const Email = req.body.email;
    const url = "https://us4.api.mailchimp.com/3.0/lists/4bcf3cbb34";
    const options ={
        method: "POST",
        auth: "angela1:fd8d2a94f77b14c7c113e1d4a29c6120-us4"
    };

    const data = {
        members: [
            { email_address: Email,
                status: "Subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
             }
        ]
    };
    const jsonData = JSON.stringify(data);

    const request = https.request(url, options, function(response){
        if(response.statusCode  == 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        request.write(jsonData);
        request.end();





    })

})

app.post("/failure.html", function(req,res){
    res.redirect("/");
})

app.listen(2800, function(){
    console.log(" Server is running at port 2800");

});

// api key    ac420d126e48fe0a7e06805be10160fb-us13