import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Contents.module.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleEasyMode = () => {
        navigate('/easy');
    };

    const handleNormalMode = () => {
        navigate('/normal');
    };

    return (
        <div className={styles.container}>
            <h1>SALTOBI -コードマスター改-</h1>
            <img src="src/assets/code-ninja.jpg" className={styles.image} alt="Ninja" />
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={handleEasyMode}>イージーモード</button>
                <button className={styles.button} onClick={handleNormalMode}>ノーマルモード</button>
            </div>
            <div className={styles.logoutContainer}>
                <button className={`${styles.button} ${styles.logoutButton}`} onClick={handleLogout}>ログアウト</button>
            </div>
        </div>
    );
};

export default Home;
