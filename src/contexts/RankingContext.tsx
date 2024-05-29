// src/contexts/RankingContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RankingContextType {
    ranking: number[];
    addScore: (score: number) => void;
}

const RankingContext = createContext<RankingContextType | undefined>(undefined);

export const useRanking = () => {
    const context = useContext(RankingContext);
    if (!context) {
        throw new Error('useRanking must be used within a RankingProvider');
    }
    return context;
};

export const RankingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ranking, setRanking] = useState<number[]>([]);

    const addScore = (score: number) => {
        setRanking((prevRanking) => [...prevRanking, score].sort((a, b) => b - a).slice(0, 10));
    };

    return (
        <RankingContext.Provider value={{ ranking, addScore }}>
            {children}
        </RankingContext.Provider>
    );
};
