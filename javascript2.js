// import styles from './styles.module.css';
// import { useState, useEffect } from 'react';

// const Messages = ({ socket }) => {
//   const [messagesRecieved, setMessagesReceived] = useState([]);

//   // Runs whenever a socket event is recieved from the server
//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       console.log(data);
//       setMessagesReceived((state) => [
//         ...state,
//         {
//           message: data.message,
//           username: data.username,
//           __createdtime__: data.__createdtime__,
//         },
//       ]);
//     });

// 	// Remove event listener on component unmount
//     return () => socket.off('receive_message');
//   }, [socket]);

//   function vote() {
//     var button1 = document.getElementById(styles.optionBox);
  
//           if(button1){
//               console.log("clicked option 1");
//               button1.addEventListener("click", function(e) {
//                   socket.emit('button click', {'id':styles.optionBox});
//               });
//           }
    
//     var button2 = document.getElementById(styles.optionBox2);
//           if(button2){
//               button2.addEventListener("click", function(e) {
//                   socket.emit('button click', {'value': button2.value, 'id':'button2'});
//               });
//           }
    
//     var voted = false;
//     socket.on('button msg', function(msg) {
//         // for (const [key, value] of Object.entries(msg.answers)) {
//         //     document.getElementById("h" + key).innerHTML = value; // will need to convert to styles.h1 form etc (maybe no loop)
//         // }
//         console.log(msg.winner);
//         if (msg.winner.length == 1) {
//             document.getElementById(styles.announcer).innerHTML = "By majority vote: <i id='winner'>" + msg.winner[0] + "</i>";
//         } else {
//             let winnerString = ""
//             msg.winner.forEach(function(e) {
//                 winnerString = winnerString + "," + e; 
//             });
//             winnerString = winnerString.slice(1,winnerString.length);
//             document.getElementById(styles.announcer).innerHTML = "There was a tie between: <i id='winner'>" + winnerString + "</i>";
//         }
//         // document.getElementById("button1").style.backgroundColor = "darkolivegreen";
//         // document.getElementById("button2").style.backgroundColor = "saddlebrown";

//     });

//     socket.on('reset msg', function(msg) {
//         for (const [key, value] of Object.entries(msg.answers)) {
//             document.getElementById("h" + key).innerHTML = "";
//             document.getElementById(styles.announcer).innerHTML = "";
//         }
//         button1.style.backgroundColor = "darkolivegreen";
//         button2.style.backgroundColor = "saddlebrown";
//         voted = false;
//     });

//     socket.on('counter', function(msg) { 
//         document.getElementById(styles.counter).innerHTML = msg + " sec";
//     });

//     button1.addEventListener("click", function onClick(event) {
//         if (voted === false) {
//             event.target.style.backgroundColor = "yellow";
//             voted = true;
//         }
//     });
//     button2.addEventListener("click", function onClick(event) {
//         if (voted === false) {
//             event.target.style.backgroundColor = "yellow";
//             voted = true;
//         }
//     });
//   }

//   // dd/mm/yyyy, hh:mm:ss
//   function formatDateFromTimestamp(timestamp) {
//     const date = new Date(timestamp);
//     return date.toLocaleString();
//   }

//   function spawnText(){
//     var elementID =  document.getElementById('chatUserRight');
//     var elementTextID = document.getElementById('chatInput');
//     /* Let's change the name once we get user and online implementation working */
//     var name = "Ryan";
  
//     /*Spawns a chat box for the user */
//     elementID.innerHTML += `
//     <div id="chatName">${name}</div>
//     <div id="chatTextUserBox">${elementTextID.value}</div>
//     `;
//     /* Reset the input field */
//     elementTextID.value = "";
//   }

//   return (
//     <div>
//     <div id={styles.outerBox} >
//         <div id={styles.questionBox}>
//             <div id={styles.questionTitle} className={styles.title}>Question</div>
//             <div id={styles.questionText}>How do you make the best website?</div>
//                 <div id={styles.optionBox} onClick={vote}>
//                     <h4>Option 1</h4>
//                 </div>
//                 <div id={styles.optionBox2}>
//                     <h4>Option 2</h4>
//                 </div>

//             <div id={styles.responsesContainer}>
//                 <div id={styles.humanIcons}></div>
//             </div>

//             <h3 className="winnerText" id="announcer"></h3>
//                 <h1 id="counter">0</h1>

//         </div>


//         <div id={styles.chatLabel}><h2>CHAT</h2></div>
//         <div id={styles.chatBox} >
          
//             <div>
//                 <div className={styles.messagesColumn}>
//                     {messagesRecieved.map((msg, i) => (
//                         <div className={styles.message} key={i}>
//                           <div className={styles.msgUsername}>{msg.username} &nbsp;&nbsp;&nbsp; </div>
//                           <div className={styles.msgMeta}>{formatDateFromTimestamp(msg.__createdtime__)}</div>
//                         <p className={styles.msgText}>{msg.message}</p>
//                         <br />
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div id={styles.chatOnlineLeft}><div id={styles.chatTextOnlineBox}></div></div>
//             <div id={styles.chatUserRight}></div>
//         </div>
//     </div>
      
//     </div>
//   );
// };

// export default Messages;

/*
  This contains javascript functions so the page can change dynamically
*/

function humanIconSpawner(){

    var elementID =  document.getElementById('humanIcons');
    elementID.innerHTML +=`<div id="numOfResponse">0/10<div>`;
    for(var i = 0; i < 10; i++){
        elementID.innerHTML += `<img src="images/humanIcon.png" alt="nigiri" id="images" width = "50" height="50">`;
    }
  }
  
  function spawnText(){
    var elementID =  document.getElementById('messageBox'); //chatUserRight
    var elementTextID = document.getElementById('chatInput');
    /* Let's change the name once we get user and online implementation working */
    var name = "Ryan";
  
    /*Spawns a chat box for the user */
    elementID.innerHTML += `
    <div id="chatName">${name}</div>
    <div id="chatTextUserBox">${elementTextID.value}</div>
    `;

    // elementID.innerText = `${name}`;
    /* Reset the input field */
    elementTextID.value = "";
  }