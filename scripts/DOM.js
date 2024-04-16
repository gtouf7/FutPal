var squadNumber = 0;
var goalkeepers = 1;
var defenders = 1;
var midfielders = 1;
var attackers = 1;
window.onload = pageLoaded;
function pageLoaded() {

//var sportForm = document.forms.f_form;
// position variables

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


//error variables
var error = document.getElementById("error");
var errorIn = document.getElementById("errorTeamIn");

step_2.style.display = "none";
fixture.style.display = "none";
oppBtn.onclick = opponentProcess;
//form button var
var squadBtn = document.getElementById("subSQ");

//OPPONENT function
function opponentProcess() {
    if (oppTeam.value !== "") {
    oppTxt.innerHTML = oppTeam.value;
    fixture.style.display = "block";
    step_2.style.display = "block";
    step_1.style.display = "none";
    } else {
        errorIn.style.display = "block";
        errorIn.innerHTML = "Please add the opponent's team name!";
        errorIn.style.color = "red";
        oppTeam.style.background ="red";
        oppTeam.focus();
    }
}

//STEP 1: Adding the next opponent
addPlayerBtn.onclick = playerAdded;
//sportForm.onclick = formSubmitted; //submit trigger

//STEP 2: Adding the players
//player add section
function playerAdded() {

    if (positionChoice.value == "X" || newPlayer.value == "") {
        console.log("works");
        error.style.display = "block";
        error.innerHTML = "Please enter the player's name and preffered position!";
        error.style.color = "red";
        newPlayer.style.background = "red";
        newPlayer.focus();
    }
    if (positionChoice.value == "GK") {
        if (goalkeepers == 3) {
            error.style.display = "block";
            error.innerHTML = "You have enough players in this position!";
            error.style.color = "red";
            newPlayer.value = "";
        } else if (newPlayer.value !== "") {
        console.log("works");
        var gk_new = document.getElementById("gk_"+goalkeepers);
        gk_new.innerHTML = newPlayer.value;
        error.style.display = "none";
        newPlayer.value = "";
        newPlayer.style.background = "white";
        newPlayer.focus();
        goalkeepers++;
        squadNumber++;
        }
    }

    if (positionChoice.value == "D") {
        if (defenders == 5) {
            error.style.display = "block";
            error.innerHTML = "You have enough players in this position!";
            error.style.color = "red";
            newPlayer.value = "";
        } else if (newPlayer.value !== "") {
        console.log("works");
        var def_new = document.getElementById("def_"+defenders);
        def_new.innerHTML = newPlayer.value;
        error.style.display = "none";
        newPlayer.value = "";
        positionChoice.value = "X";
        newPlayer.style.background = "white";
        newPlayer.focus();
        defenders++;
        squadNumber++;
        }
    }

    if (positionChoice.value == "M") {
        if (midfielders == 5) {
            error.style.display = "block";
            error.innerHTML = "You have enough players in this position!";
            error.style.color = "red";
            newPlayer.value = "";
        } else if (newPlayer.value !== "") {
        console.log("works");
        var mid_new = document.getElementById("mid_"+midfielders);
        mid_new.innerHTML = newPlayer.value;
        newPlayer.value = "";
        error.style.display = "none";
        newPlayer.style.background = "white";
        newPlayer.focus();
        midfielders++;
        squadNumber++;
        }
    }

    if (positionChoice.value == "A") {
        if (attackers == 5) {
            error.style.display = "block";
            error.innerHTML = "You have enough players in this position!";
            error.style.color = "red";
            newPlayer.value = "";
        } else if (newPlayer.value !== "") {
        console.log("works");
        var att_new = document.getElementById("att_"+attackers);
        att_new.innerHTML = newPlayer.value;
        error.style.display = "none";
        newPlayer.value = "";
        newPlayer.style.background = "white";
        newPlayer.focus();
        attackers++;
        squadNumber++;
        }
    }
    
    return false;
}
//FULL SQUAD: function for the whole form
var successMsg = document.getElementById("success-message");
function formSubmitted() {
    console.log(squadNumber);
    console.log(goalkeepers);


    if (squadNumber < 8) {
        console.log('ts');
        error.innerHTML = "You don't have enough players to attend the next game!";
        error.style.color = "red";
        error.style.display = "block";
        return false;
    } else if (goalkeepers < 2) {
        console.log('g');
        error.innerHTML = "You need at least 1 goalkeeper!";
        error.style.color = "red";
        error.style.display = "block";
        return false;
    } else if (defenders < 3) {
        console.log('d');
        error.innerHTML = "You need at least 2 defenders!";
        error.style.color = "red";
        error.style.display = "block";
        return false;
    } else if (midfielders < 4) {
        console.log('m');
        error.innerHTML = "You need at least 3 midfielders!";
        error.style.color = "red";
        error.style.display = "block";
        return false;
    } else if (attackers < 3) {
        console.log('a');
        error.innerHTML = "You need at least 2 attackers!";
        error.style.color = "red";
        error.style.display = "block";
        return false;
    } else {
        console.log('s');   
        successMsg.innerHTML = "Squad looks ready. Good luck in your game!"
    }
    return false;
}

squadBtn.onclick = formSubmitted;


}
