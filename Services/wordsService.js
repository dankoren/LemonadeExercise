const fs = require('fs');
const getWords = require('get-words');

const filePath = './words.txt'

module.exports = class WordsService{

    wordsCounter = {};

    constructor() {
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

        loadFile(filePath);
    }

    addWords = (text) =>{
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

        const normalizedText = text.toLowerCase();
        const words = getWords(normalizedText, {keepContraction: true, breakCompoundWord: true});

        words.forEach(word=> addWord(word));
        saveToFile(); // Making the data persistence
    }

    getWordStatistics = (word) => {
        if(this.wordsCounter && this.wordsCounter[word]){
            return this.wordsCounter[word];
        }
        else{
            return 0;
        }
    }
}