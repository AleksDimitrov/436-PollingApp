import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

const Home = ({username, setUsername, room, setRoom, socket}) => {
    const navigate = useNavigate();
    const joinRoom = () => {
        if (room !== '' && username !== '') {
            socket.emit('join_room', { username, room });
        }
        navigate('/chat', { replace: true });
    };

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

    <div className='container'/*{styles.container}*/>
      <div className='formContainer'/*{styles.formContainer}*/>
        <h1>{`||PickOne||`}</h1>
        <input className={styles.input} placeholder='Username...' 
        onChange={(e) => setUsername(e.target.value)} />

        <select className={styles.input}
        onChange={(e) => setRoom(e.target.value)} >
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button className='btn btn-secondary' style={{ width: '60%' }}
          onClick={joinRoom}>Join Room</button>
      </div>
    </div>

        // <div>
    //   <div>
    //     <h3 id={styles.headerBox} className={styles.box}>Room Code</h3>
    // </div>
    // <div id={styles.outerBox} className={styles.box}>
    //     <div id={styles.questionBox} className={styles.box}>
    //         <div id={styles.questionTitle} className={styles.title}>Question</div>
    //         <div id={styles.questionText}>How do you make the best website?</div>
    //             <div id={styles.optionBox} className={styles.box}>
    //                 <h4>Option 1</h4>
    //             </div>
    //             <div id={styles.optionBox2} className={styles.box}>
    //                 <h4>Option 2</h4>
    //             </div>

    //         <div id={styles.responsesContainer}>
    //             <div id={styles.humanIcons}></div>
    //             {/* <body onload="humanIconSpawner();"></body> */}
    //         </div>
            
    //     </div>
    //     <div><h2>Chat</h2></div>
    //     <div id={styles.chatBox} className={styles.box}>
            
    //         <div>
    //             <form onSubmit={spawnText()}>
    //                 <input id={styles.chatInput} className={styles.chatInput} type="text" placeholder="Type Here to Chat"></input>
    //                 <noscript><input type="submit" ></input></noscript>
    //             </form>
    //         </div>

    //         <div id={styles.chatOnlineLeft}><div id={styles.chatTextOnlineBox}>Hello</div></div>
    //         <div id={styles.chatUserRight}></div>
    //     </div>
    // </div>
      
    // </div>
  );
};

export default Home;