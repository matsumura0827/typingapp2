import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Auth.module.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                username,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username); 
            setError(null);
            navigate('/');
        } catch (error) {
            setError('ログインに失敗しました。ユーザー名またはパスワードが正しくありません。');
            console.error('Login failed', error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ログイン</h1>
            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        ユーザー名
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>
                        パスワード
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                        />
                    </label>
                </div>
                <button type="submit" className={styles.button}>ログイン</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            <p className={styles.signupLink}>
                アカウントをお持ちでないですか？ <Link to="/signup">サインアップ</Link>
                
            </p>
            <p>ご意見要望は ryo.matsumura@salto.link まで！</p>
        </div>
    );
};

export default Login;
