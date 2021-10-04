
const fs = require('fs');

const filePath = './words.txt'

module.exports = class WordsService{

    wordsCounter = {};

    constructor() {
        loadFile(filePath);

        const loadFile = (filePath) => {
            if(!fs.existsSync(filePath)){
                fs.writeFileSync(filePath, '');
            }
            else{
                const data = fs.readFileSync(filePath);
                const plainText = data.toString();
                if(plainText){
                    this.wordsCounter = JSON.parse(plainText);
                }
            }
        }
    }

    addWords = (text) =>{
        const extractWords = (text) => {
            const normalizedText = text.toLowerCase()
                                    .replace(/\d+|-|,/g, '')
            return normalizedText.split(' ');
        }

        const addWord = (word) => {
            if(this.wordsCounter[word]){
                this.wordsCounter[word]++;
            }
            else{
                this.wordsCounter[word] = 1;
            }
        }

        const saveToFile = () => {
            const data = JSON.stringify(this.wordsCounter);
            fs.writeFile(filePath, data, (error) => {
                if (error) throw error;
            });
        }

        const words = extractWords(text);
        words.forEach(word=> addWord(word));
        saveToFile(); // Making the data persistence
    }

    getWordStatistics = (word) => {
        return this.wordsCounter[word];
    }
}