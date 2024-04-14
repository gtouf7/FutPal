window.onload = pageLoaded;
function pageLoaded() {

var sportForm = document.forms.f_form;
// position variables
var squadNumber = 0;
var goalkeepers = 1;
var defenders = 1;
var midfielders = 1;
var attackers = 1;
//form position variables
var addPlayerBtn = document.getElementById("submitPlayer");
var newPlayer = document.getElementById("player_in");
var positionChoice = document.getElementById("position");

//step 1 variables
var step_2 = document.getElementById("step-2");
var step_1 = document.getElementById("step-1");
var oppTxt = document.getElementById("opp");
var oppTeam = document.getElementById("opp_in");
var oppBtn = document.getElementById("oppBtn");
var fixture = document.getElementById("nextGame");

step_2.style.display = "none";
fixture.style.display = "none";
oppBtn.onclick = opponentProcess;

function opponentProcess() {
    if (oppTeam.value !== "") {
    oppTxt.innerHTML = oppTeam.value;
    fixture.style.display = "block";
    step_2.style.display = "block";
    step_1.style.display = "none";
    } else {
        alert("Please add the opponents' team name!");
    }
}

//STEP 1: Adding the next opponent
addPlayerBtn.onclick = playerAdded;
sportForm.onsubmit = formSubmitted; //submit trigger

//STEP 2: Adding the players
//player add section
function playerAdded() {
    if (positionChoice.value == "GK") {
        if (goalkeepers == 3) {
            alert("You have enough goalkeepers!");
        } else {
        console.log("works");
        var gk_new = document.getElementById("gk_"+goalkeepers);
        gk_new.innerHTML = newPlayer.value;
        goalkeepers++;
        squadNumber++;
        }
    }

    if (positionChoice.value == "D") {
        if (defenders == 5) {
            alert("You have enough defenders!");
        } else {
        console.log("works");
        var def_new = document.getElementById("def_"+defenders);
        def_new.innerHTML = newPlayer.value;
        defenders++;
        squadNumber++;
        }
    }

    if (positionChoice.value == "M") {
        if (midfielders == 5) {
            alert("You have enough midfielders!");
        } else {
        console.log("works");
        var mid_new = document.getElementById("mid_"+midfielders);
        mid_new.innerHTML = newPlayer.value;
        midfielders++;
        squadNumber++;
        }
    }

    if (positionChoice.value == "A") {
        if (attackers == 5) {
            alert("You have enough attackers!");
        } else {
        console.log("works");
        var att_new = document.getElementById("att_"+attackers);
        att_new.innerHTML = newPlayer.value;
        attackers++;
        squadNumber++;
        }
    }
    return false;
}
//FULL SQUAD: function for the whole form
var successMsg = document.getElementById("success-message");
function formSubmitted() {
    if (squadNumber < 8) {
        alert("You need more players to play the next fixture!");
    } else if (goalkeepers < 2) {
        alert("You need at least one goalkeeper!");
    } else if (defenders < 3) {
        alert("You need at least two defenders!");
    } else if (midfielders < 4) {
        alert("You need at least 3 midfielders!");
    } else if (attackers < 3) {
        alert("You need at least two attackers!");
    } else {
        successMsg.innerHTML = "Squad looks ready. Good luck in your game!"
    }
    return false;
}









}
