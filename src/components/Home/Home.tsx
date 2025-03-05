import viteLogo from '/vite.svg'
import reactLogo from '../../assets/react.svg'
import styles from './Home.module.css';
import { LoginButton } from '../LoginButton';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <LoginButton></LoginButton>
    </div>
  );
};

export default Home;
