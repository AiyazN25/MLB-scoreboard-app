(function(){
    "use strict";

    
    function changeInningsPage(){
        for(let i=0; i < numberOfInningDivGroups; i++){
            let divGroupNum = inningDivGroups[i].getAttribute("data-divGroupNum");
            if(Number(divGroupNum) !== inningsPage){
                inningDivGroups[i].classList.add("hidden");
            }
            else{
                inningDivGroups[i].classList.remove("hidden");
            }
        }
        inningsPage === numberOfInningDivGroups/3 ? nextBtn.classList.add("hidden") : nextBtn.classList.remove("hidden");
        inningsPage === 1 ? prevBtn.classList.add("hidden") : prevBtn.classList.remove("hidden");
    }


    
    // By default, home team stats shown, so home team button is clicked, while
    // away team div is hidden
    var homeTeamButton = document.getElementById("home-team-button");
    var awayTeamButton = document.getElementById("away-team-button");
    var awayTeamDiv = document.getElementById("away-batters");
    var homeTeamDiv = document.getElementById("home-batters");

    homeTeamButton.addEventListener("click", function(){
        homeTeamButton.classList.add("clicked");
        awayTeamButton.classList.remove("clicked");

        awayTeamDiv.classList.add("hidden");
        homeTeamDiv.classList.remove("hidden");
    })

    awayTeamButton.addEventListener("click", function(){
        awayTeamButton.classList.add("clicked");
        homeTeamButton.classList.remove("clicked");

        homeTeamDiv.classList.add("hidden");
        awayTeamDiv.classList.remove("hidden");
    })
    // Now stats of either team's batters can be toggled

    var inningDivGroups = document.getElementsByClassName("innings-div");
    // Each inningDivGroup is a div containing at most 9 innings
    var numberOfInningDivGroups = inningDivGroups.length;
    var inningsPage = 1; // By default on page 1, i.e: first 9 innings displayed initially
    var nextBtn = document.getElementById("next");
    var prevBtn = document.getElementById("prev");
    changeInningsPage();
    // Now by default, only the first 9 innings are shown, and the prev button is hidden
    // as we are on the first page, and the next button is hidden iff there are no more innings (no more than 9)
    // Next, set up feature: toggle the 'page' or the div group to see next/prev 9 innings, if there are any
    nextBtn.addEventListener("click", function(){
        inningsPage += 1;
        changeInningsPage();
    })
    prevBtn.addEventListener("click", function(){
        inningsPage -= 1;
        changeInningsPage();
    })

}());