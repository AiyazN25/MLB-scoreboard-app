var express = require("express");
var app = express();
var request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
});

app.get("/games", function(req, res){
    let url, dateString, favTeam;
    if(req.query.date){
        dateString = req.query.date;
        let year = dateString.substring(0,4);
        let month = dateString.substring(5,7);
        let day = dateString.substring(8);
        url = "http://gd2.mlb.com/components/game/mlb/year_" + year + "/month_" + month + "/day_" + day + "/master_scoreboard.json";
    }
    else {
        url = "http://gd2.mlb.com/components/game/mlb/year_2017/month_07/day_01/master_scoreboard.json";
        dateString = "2017-07-01";
    }
    
    req.query.favTeam ? favTeam = req.query.favTeam : favTeam = "TOR";
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
			let parsedData = JSON.parse(body);
            res.render("gamesList", 
            {
                gamesForTheDayArray: parsedData["data"]["games"]["game"], 
                dateString: dateString,
                favTeam : favTeam
            });
		}
    })
})


app.get("/boxscore", function(req, res){
    let boxscoreLink = req.query.link;
    let url = "http://gd2.mlb.com" + boxscoreLink + "/boxscore.json";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
			let parsedData = JSON.parse(body);
			res.render("boxscore", {boxscore : parsedData["data"]["boxscore"]});
		}
    })
})


app.get("*", function(req, res){
    res.send("Nonexistent route!")
})

// http://localhost:3000 is homepage
app.listen(3000, function(){
    console.log("Serving");
})