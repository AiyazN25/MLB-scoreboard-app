(function(){
    "use strict";
    
    window.onload = function(){
        
        function goToBoxScorePage(){
            window.location.href = "/boxscore?link=" + this.getAttribute("data-boxScoreLink");
        }
        

        function createDiv(text, classList){
            // Creates and returns a div element given its text content and classlist
            var div = document.createElement("div");
            if(classList){
                div.classList.add(...classList);
            }
            if(text){
                var texForDiv = document.createTextNode(text);
                div.appendChild(texForDiv);
            }
            return div;
        }

        
        function addGameToListViewOfGames(gameObj){
            // Given a game object, build a div element of the home team, home score, away team,
            // away score, and status
            var gameDiv = createDiv(null, ["square", "list-element"]);
            var boxscoreLink = gameObj["game_data_directory"];
            gameDiv.setAttribute("data-boxscoreLink", boxscoreLink);
            // gameDiv.onclick = goToBoxScorePage;
            gameDiv.addEventListener("click", goToBoxScorePage);
            var gameStatus = gameObj["status"]["status"];

            var homeTeamTextDiv = createDiv("Home Team: " + gameObj["home_team_name"], ["team-name"]);
            var homeTeamScore = gameStatus !== "Cancelled" ? gameObj["linescore"]["r"]["home"] : null;
            var homeTeamScoreDiv = createDiv(homeTeamScore, ["team-score"]);

            var awayTeamTextDiv = createDiv("Away Team: " + gameObj["away_team_name"], ["team-name"]);
            var awayTeamScore = gameStatus !== "Cancelled" ? gameObj["linescore"]["r"]["away"] : null;
            var awayTeamScoreDiv = createDiv(awayTeamScore, ["team-score"]);

            if(gameStatus !== "Cancelled"){
                if(homeTeamScore > awayTeamScore){
                    homeTeamTextDiv.classList.add("winning-team");
                    homeTeamScoreDiv.classList.add("winning-team");
                }
                else {
                    awayTeamTextDiv.classList.add("winning-team");
                    awayTeamScoreDiv.classList.add("winning-team");
                }
            }
            
            var statusDiv = createDiv(gameStatus, ["team-name"]);

            gameDiv.appendChild(homeTeamTextDiv);
            gameDiv.appendChild(homeTeamScoreDiv);
            gameDiv.appendChild(awayTeamTextDiv);
            gameDiv.appendChild(awayTeamScoreDiv);
            gameDiv.appendChild(statusDiv);

            
            
            gamesContainer.appendChild(gameDiv);
            
        }

        
        function convertDate(date) {
            var yyyy = date.getFullYear().toString();
            var mm = (date.getMonth()+1).toString();
            var dd  = date.getDate().toString();
          
            var mmChars = mm.split('');
            var ddChars = dd.split('');
          
            return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
        }


        function changePageAccordingToDate(dateObject){
            var dateStringForNextDay = convertDate(dateObj);
            window.location.href = "/games?date=" + dateStringForNextDay;
        }
        

        // Get the div that stores the JSONfeed and date
        var JSONFeedDiv = document.getElementById("JSONFeed");
        // Get the date for this view
        var dateString = JSONFeedDiv.getAttribute("data-date");
        var dateObj = new Date(dateString +"T03:24:00");
        var dateVisible = dateObj.toString().substring(0,15);
        // Display the date for the user
        document.getElementById("date-text").appendChild(document.createTextNode(dateVisible));
        // Toggle next/prev with the buttons
        document.getElementById("next").addEventListener("click", function(){
            dateObj.setDate(dateObj.getDate() + 1);
            changePageAccordingToDate(dateObj);
        })
        document.getElementById("prev").addEventListener("click", function(){
            dateObj.setDate(dateObj.getDate() - 1);
            changePageAccordingToDate(dateObj);
        })
        var JSONFeedStr = JSONFeedDiv.getAttribute("data-JSONFeed");
        var gamesForTheDayArray = JSONFeedStr ? JSON.parse(JSONFeedStr) : null;
        var gamesContainer = document.querySelector("#container");

        if(!gamesForTheDayArray){
            let h2 = document.createElement("h2");
            h2.classList.add("instruction")
            let text = document.createTextNode("No games today!");
            h2.appendChild(text);
            gamesContainer.appendChild(h2);
        }
        else if(!(gamesForTheDayArray instanceof Array)){
            addGameToListViewOfGames(gamesForTheDayArray);
        }
        else {
            var TORBlueJaysGame = gamesForTheDayArray.find(function(game){
                return game["home_team_name"] === "Blue Jays" || game["away_team_name"] === "Blue Jays";
            });
            if(TORBlueJaysGame){
                addGameToListViewOfGames(TORBlueJaysGame);
            }
            gamesForTheDayArray.forEach(function(game){
                if(game["home_team_name"] !== "Blue Jays" && game["away_team_name"] !== "Blue Jays"){
                    addGameToListViewOfGames(game);
                }
            })


        }
    }

}());

