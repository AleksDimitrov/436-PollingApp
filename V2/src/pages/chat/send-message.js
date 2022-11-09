import styles from './styles.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now();
      // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
      socket.emit('send_message', { username, room, message, __createdtime__ });
      setMessage('');
    }
  };

  return (
    <div>
      <div>
      <button className={styles.sendBtn} onClick={sendMessage}> Send</button>
      </div>

      <div className={styles.sendMessageContainer}>
        <input
          id={styles.chatInput}
          className={styles.chatInput} //messageInput
          placeholder='Type Here to Chat'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>

    </div>
  );
};

export default SendMessage;