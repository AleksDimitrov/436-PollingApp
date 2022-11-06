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
  );
};

export default Home;