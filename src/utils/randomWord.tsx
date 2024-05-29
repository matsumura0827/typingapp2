// src/utils/randomWord.tsx

const wordsBackup: string[] = [
    'algorithm', 'function', 'variable', 'object', 'class', 'interface', 'array', 'loop', 'conditional', 'inheritance'
];

export const getRandomWord = async (): Promise<string> => {
    try {
        //programmingに関係する単語のランダム生成
        const response = await fetch('https://api.datamuse.com/words?ml=programming&max=1000'); 
        const data = await response.json();
        
        //成功したら
        if (data.length > 0) {
            // 0～data.length-1の範囲の数字を生成
            const randomIndex = Math.floor(Math.random() * data.length);
            return data[randomIndex].word;
        } else {
            throw new Error('No words found');
        }
        //失敗したら
    } catch (error) {
        console.error('Error fetching word:', error);
        // 取れなかったらバックアップの単語リストからランダムな単語を返す
        const randomIndex = Math.floor(Math.random() * wordsBackup.length);
        return wordsBackup[randomIndex];
    }
};
