/*
  This contains javascript functions so the page can change dynamically
*/

function humanIconSpawner(){

  var elementID =  document.getElementById('humanIcons');
  elementID.innerHTML +=`<div id="numOfResponse">0/10<div>`;
  for(var i = 0; i < 10; i++){
      elementID.innerHTML += `<img src="../images/humanIcon.png" alt="nigiri" id="images" width = "50" height="50">`;
  }
}

function spawnText(){
  var elementID =  document.getElementById('chatUserRight');
  var elementTextID = document.getElementById('chatInput');
  /* Let's change the name once we get user and online implementation working */
  var name = "Ryan";

  /*Spawns a chat box for the user */
  elementID.innerHTML += `
  <div id="chatName">${name}</div>
  <div id="chatTextUserBox">${elementTextID.value}</div>
  `;
  /* Reset the input field */
  elementTextID.value = "";
}