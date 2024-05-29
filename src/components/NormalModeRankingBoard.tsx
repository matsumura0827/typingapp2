// src/components/NormalModeRankingBoard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RankingBoard.module.css';

interface ScoreEntry {
    username: string;
    score: number;
}

const NormalModeRankingBoard: React.FC = () => {
    const [ranking, setRanking] = useState<ScoreEntry[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/scores/normal');
                setRanking(response.data);
            } catch (error) {
                console.error('Error fetching normal mode scores:', error);
            }
        };

        fetchRanking();
    }, []);

    const handleBack = () => {
        navigate('/normal');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>ランキングボード</h2>
            <ul className={styles.list}>
                {ranking.map((entry, index) => (
                    <li key={index} className={styles.item}>
                        <span className={styles.rank}>{index + 1}</span>
                        <span className={styles.username}>{entry.username}</span>
                        <span className={styles.score}>{entry.score}</span>
                    </li>
                ))}
            </ul>
            <button onClick={handleBack} className={styles.button}>戻る</button>
        </div>
    );
};

export default NormalModeRankingBoard;
