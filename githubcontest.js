// Selectors
const startButton = document.querySelector("button");
const mainContainer = document.querySelector(".container");
const startContainer = document.querySelector(".start-container");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const continueBtn1  = document.querySelector(".continue1");
const continueBtn2  = document.querySelector(".continue2");
const inputPlayer1 = document.querySelector(".input-player1");
const inputPlayer2 = document.querySelector(".input-player2");
const playersInfo = document.querySelector(".players-info");

  // Variables for Users' Info
const player1Image = document.querySelector(".player1-image");
const player2Image = document.querySelector(".player2-image");
const player1Name = document.querySelector(".player1-name");
const player2Name = document.querySelector(".player2-name");
const player1Username = document.querySelector(".player1-username");
const player2Username = document.querySelector(".player2-username");
const player1Location = document.querySelector(".player1-location");
const player2Location = document.querySelector(".player2-location");
const player1Followers = document.querySelector(".player1-followers");
const player2Followers = document.querySelector(".player2-followers");
const player1Following = document.querySelector(".player1-following");
const player2Following = document.querySelector(".player2-following");
const player1Repos = document.querySelector(".player1-repos");
const player2Repos = document.querySelector(".player2-repos");

  // Variables for Result Page
const confirmWinner = document.querySelector(".confirm");
const firstPlayer = document.querySelector(".first-player");
const secondPlayer = document.querySelector(".second-player");
const firstPlayerResult = document.querySelector(".result-first");
const secondPlayerResult = document.querySelector(".result-second");
const initiateButton = document.querySelector(".initiate");
const StartOverButton = document.querySelector(".start-over");
const reselectButton = document.querySelector(".reselect");
const awaitingResult = document.querySelector(".waiting");

let xhr = new XMLHttpRequest();
let xhr1 = new XMLHttpRequest();
let userNames;


// Event Listeners
startButton.addEventListener("click", enterPlayer1);
continueBtn1.addEventListener("click", enterPlayer2);
continueBtn2.addEventListener("click", displayPlayersInfo);
initiateButton.addEventListener("click", startDuel);
reselectButton.addEventListener("click", reselectPlayers);
StartOverButton.addEventListener("click", ()=>{
    window.location.reload();
});

// Functions
function enterPlayer1(){
    startContainer.classList.add("d-none");
    player1.classList.remove("d-none");
    
}


function enterPlayer2(){
    let player1User = inputPlayer1.value;
    
    if(!player1User){
        alert("Kindly enter player one Username!");
        return;
    }
    else{
    player1.classList.add("d-none");
    player2.classList.remove("d-none");
}
}


function displayPlayersInfo(){
    let player1User = inputPlayer1.value;
    let player2User = inputPlayer2.value;
    
    if(!player2User){
        alert("Kindly enter player two Username!");
        return;
    }
    else{
        
        player2.classList.add("d-none");
        playersInfo.classList.remove("d-none");
        
        getPlayer1Details(player1User);
         
       getPlayer2Details(player2User); 
    }
}


function getPlayer1Details(player){
    
    xhr.open("GET", `https://api.github.com/users/${player}`,  true);
     xhr.responseType= "text";
        xhr.onload= ()=>{
           if(xhr.status===200){
            userNames = JSON.parse(xhr.responseText);
            
        player1Name.innerHTML = userNames.name;
        player1Username.innerHTML = userNames.login;
        player1Location.innerHTML = userNames.location;
        player1Followers.innerHTML = userNames.followers;
        player1Following.innerHTML = userNames.following;
        player1Repos.innerHTML = userNames.public_repos;
            
            
        }
        else {
                firstPlayerResult.innerHTML ="Kindly provide a valid username!";
                firstPlayerResult.style.color ="red";
                initiateButton.classList.add("d-none");
            
            }
            
    };
    
    xhr.send();
}


function getPlayer2Details(player){
    
    xhr1.open("GET", `https://api.github.com/users/${player}`,  true);
     xhr1.responseType= "text";
        xhr1.onload= ()=>{
           if(xhr1.status===200){
            userNames = JSON.parse(xhr1.responseText);
               
        player2Name.innerHTML = userNames.name;
        player2Username.innerHTML = userNames.login;
        player2Location.innerHTML = userNames.location;
        player2Followers.innerHTML = userNames.followers;
        player2Following.innerHTML = userNames.following;
        player2Repos.innerHTML = userNames.public_repos;
          

        }
            else {
                secondPlayerResult.innerHTML ="Kindly provide a valid username!";
                secondPlayerResult.style.color ="red";
                initiateButton.classList.add("d-none");
            
            }
            
    };
    
    xhr1.send();
}


function startDuel(){
    let player1Result = Number.parseFloat(player1Followers.innerHTML) + Number.parseFloat(player1Following.innerHTML) + (Number.parseFloat(player1Repos.innerHTML)/2);
    
    let player2Result = Number.parseFloat(player2Followers.innerHTML) + Number.parseFloat(player2Following.innerHTML) + (Number.parseFloat(player2Repos.innerHTML)/2);
    
    playersInfo.classList.add("d-none");
    
    awaitingResult.classList.remove("d-none");
    
    setTimeout(()=>{
        awaitingResult.classList.add("d-none");
        playersInfo.classList.remove("d-none");
        confirmWinner.innerHTML ="Winner";
        reselectButton.classList.add("d-none");
        initiateButton.classList.add("d-none");
        StartOverButton.classList.remove("d-none");
        
        if(player1Result > player2Result){
            firstPlayer.innerHTML ="Winner";
            secondPlayer.innerHTML ="Loser";
            firstPlayerResult.innerHTML = "Score: " + player1Result;
            secondPlayerResult.innerHTML = "Score: " + player2Result;    
        }
        else if(player1Result < player2Result){
            firstPlayer.innerHTML ="Loser";
            secondPlayer.innerHTML ="Winner";
            firstPlayerResult.innerHTML = player1Result;
            secondPlayerResult.innerHTML = player2Result;
        }
    },2000);
   
}


function reselectPlayers(){
    playersInfo.classList.add("d-none");
    enterPlayer1();
}