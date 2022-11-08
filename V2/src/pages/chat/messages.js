import styles from './styles.module.css';
import { useState, useEffect } from 'react';

const Messages = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  function spawnText(){
    var elementID =  document.getElementById('chatUserRight');
    var elementTextID = document.getElementById('chatInput');
    /* Let's change the name once we get user and online implementation working */
    var name = "Ryan";
  
    /*Spawns a chat box for the user */
    // elementID.innerHTML += `
    // <div id="chatName">${name}</div>
    // <div id="chatTextUserBox">${elementTextID.value}</div>
    // `;
    /* Reset the input field */
    // elementTextID.value = "";
  }

  return (
//     <div className={styles.messagesColumn}>
//     {messagesRecieved.map((msg, i) => (
//       <div className={styles.message} key={i}>
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <span className='msgMeta'/*{styles.msgMeta}*/>{msg.username}</span>
//           <span className='msgMeta'/*{styles.msgMeta}*/>
//             {formatDateFromTimestamp(msg.__createdtime__)}
//           </span>
//         </div>
//         <p className={styles.msgText}>{msg.message}</p>
//         <br />
//       </div>
//     ))}
//   </div>

    <div>
      <div>
        <h3 id={styles.headerBox} className={styles.box}>Room Code</h3>
    </div>
    <div id={styles.outerBox} className={styles.box}>
        <div id={styles.questionBox} className={styles.box}>
            <div id={styles.questionTitle} className={styles.title}>Question</div>
            <div id={styles.questionText}>How do you make the best website?</div>
                <div id={styles.optionBox} className={styles.box}>
                    <h4>Option 1</h4>
                </div>
                <div id={styles.optionBox2} className={styles.box}>
                    <h4>Option 2</h4>
                </div>

            <div id={styles.responsesContainer}>
                <div id={styles.humanIcons}></div>
                {/* <body onload="humanIconSpawner();"></body> */}
            </div>
            {/* <div><h2>Chat</h2></div> */}
        </div>
        <div id={styles.chatLabel}><h2>Chat</h2></div>
        <div id={styles.chatBox} className={styles.box}>
            
            <div>
                {/* <form onSubmit={spawnText()}>
                    <input id={styles.chatInput} className={styles.chatInput} type="text" placeholder="Type Here to Chat"></input>
                    <noscript><input type="submit" ></input></noscript>
                </form> */}
                <div className={styles.messagesColumn}>
                    {messagesRecieved.map((msg, i) => (
                        <div className={styles.message} key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className='msgMeta'>{msg.username}</span>
                            <span className='msgMeta'>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                            </span>
                        </div>
                        <p className={styles.msgText}>{msg.message}</p>
                        <br />
                        </div>
                    ))}
                </div>
            </div>

            <div id={styles.chatOnlineLeft}><div id={styles.chatTextOnlineBox}>Hello</div></div>
            <div id={styles.chatUserRight}></div>
        </div>
    </div>
      
    </div>
  );
};

export default Messages;