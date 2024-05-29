import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import styles from './Auth.module.css';

interface SignupResponse {
    message: string;
}

const Signup: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response: AxiosResponse<SignupResponse> = await axios.post('http://localhost:5000/api/signup', {
                username,
                password
            });

            setSuccess(response.data.message);
            setError(null);
            setTimeout(() => navigate('/login'), 1000);
        } catch (error) {
            setError('ユーザー登録に失敗しました。');
            console.error('Signup failed', error);
        }
    };

    const handleBack = () => {
        navigate('/Login');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ユーザー登録</h1>
            <form onSubmit={handleSignup} className={styles.form}>
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
                <button type="submit" className={styles.button}>登録</button>
                <button onClick={handleBack} className={`${styles.button} ${styles.backButton}`}>戻る</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
        </div>
    );
};

export default Signup;
