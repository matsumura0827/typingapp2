// src/components/EasyMode.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomWord } from '../utils/randomWord';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Contents.module.css';

const NormalMode: React.FC = () => {
    const [word, setWord] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [typedCorrectly, setTypedCorrectly] = useState<boolean[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(90);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(3);
   // const [escaped, setEscaped] = useState<boolean>(false);
    const navigate = useNavigate();
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameOver(true);
            saveScore();
        }
        return () => {
            if (timerRef.current !== null) {
                window.clearInterval(timerRef.current);
            }
        };
    }, [gameStarted, timeLeft]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!gameStarted || gameOver) return;

            if (e.key === 'Backspace') {
                e.preventDefault();
                return;
            }

            const typedChar = e.key;
            const expectedChar = word[currentIndex];

            if (typedChar === expectedChar) {
                setScore((prevScore) => prevScore + 1);
                setCurrentIndex((prevIndex) => prevIndex + 1);
                setTypedCorrectly((prevTypedCorrectly) => {
                    const updatedTypedCorrectly = [...prevTypedCorrectly];
                    updatedTypedCorrectly[currentIndex] = true;
                    return updatedTypedCorrectly;
                });
            } else {
                // ミスタイプの場合、残り時間を1秒減らす
                setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0));
            }


            if (currentIndex + 1 === word.length) {
                const fetchWord = async () => {
                    try {
                        const newWord = await getRandomWord();
                        setWord(newWord);
                        setCurrentIndex(0);
                        setTypedCorrectly(new Array(newWord.length).fill(null));
                    } catch (error) {
                        console.error('Error fetching word:', error);
                    }
                };
                fetchWord();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameStarted, gameOver, currentIndex, word]);

    const handleStart = () => {
        startCountdown();
    };

    const startCountdown = useCallback(() => {
        const countdownInterval = window.setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 1) {
                    window.clearInterval(countdownInterval);
                    startGame();
                }
                return prevCountdown - 1;
            });
        }, 1000);
    }, []);

    const startGame = useCallback(() => {
        if (gameStarted) return;
        setGameStarted(true);
        setTimeLeft(90);

        const fetchWord = async () => {
            try {
                const newWord = await getRandomWord();
                setWord(newWord);
                setTypedCorrectly(new Array(newWord.length).fill(null));
            } catch (error) {
                console.error('Error fetching word:', error);
            }
        };
        fetchWord();
    }, [gameStarted]);

    const handleBack = async () => {
        if (gameStarted && !gameOver) {
            const confirmMessage = "ゲームを終了してスコアを表示しますか？";
            if (window.confirm(confirmMessage)) {
                //setEscaped(true);
                setGameOver(true);
                saveScore();
            }
        } else if (gameOver) {
            navigate('/');
        } else {
            navigate('/');
        }
    };

    const saveScore = async () => {
        const username = localStorage.getItem('username');
        if (username) {
            try {
                await axios.post('http://localhost:5000/api/scores/normal', {
                    username,
                    score
                });
            } catch (error) {
                console.error('Error saving score:', error);
            }
        }
    };

    const renderScore = () => (
        <div className={styles.gameOver}>
            <h2 className={styles.finalScore}>スコア: {score}</h2>
            <button className={`${styles.button} ${styles.backButton}`} onClick={() => navigate('/')}>戻る</button>
        </div>
    );

    return (
        <div tabIndex={0} className={styles.container}>
            {gameOver ? (
                renderScore()
            ) : (
                <>
                    <h1 className={styles.title}>イージーモード</h1>
                    <h2 className={styles.score}>スコア: {score}</h2>
                    <h2 className={styles.timeLeft}>残り時間: {timeLeft}s</h2>
                    {!gameStarted && <h2 className={styles.countdown}>{countdown}</h2>}
                    <div>
                        <div className={styles.word}>
                            {word.split('').map((char, index) => (
                                <span key={index} style={{ color: typedCorrectly[index] === true ? 'green' : 'white' }}>
                                    {char}
                                </span>
                            ))}
                        </div>
                        {!gameStarted && <button className={styles.button} onClick={handleStart}>スタート</button>}
                        <button className={`${styles.button} ${styles.backButton}`} onClick={handleBack}>逃げる</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default NormalMode;
