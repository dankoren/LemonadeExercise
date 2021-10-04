
const fs = require('fs');

const filePath = './words.txt'

module.exports = class WordsService{

    wordsCounter = {};

    constructor() {
        this.loadFile(filePath);
    }

    loadFile = (filePath) => {
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
        saveToFile();
    }

    getWordStatistics = (word) => {
        console.log("getWords started, word: " + word);
        return this.wordsCounter[word];
    }

    // extractWords = (text) => {
    //     foo();
    //     const normalizedText = text.toLowerCase()
    //                             .replace('-','')
    //                             .replace(/\d+/g, '')
    //                             .replace(',','');
    //     console.log(normalizedText);
    //     return normalizedText.split(' ');
    // }

// module.exports = {addWords}

    // addWord = (word) => {
    //     if(this.wordsCounter[word]){
    //         this.wordsCounter[word]++;
    //     }
    //     else{
    //         this.wordsCounter[word] = 1;
    //     }
    // }

    // saveToFile = () => {
    //     const data = JSON.stringify(this.wordsCounter);
    //     console.log('data: ' + data);
    //     fs.writeFile(filePath, data, (error) => {
    //         if (error) throw error;
    //     });
    // }
}

// function extractWords(text){
//     const normalizedText = text.toLowerCase()
//     .replace('-','')
//     .replace(/\d+/g, '')
//     .replace(',','');
//     console.log(normalizedText);
//     return normalizedText.split(' ');
// }



// function getInstance()

// function addWords(text){
//     const words = extractWords(text);

//     console.log(words);
    
// }

// function extractWords(text){
//     const normalizedText = text.toLowerCase()
//                             .replace('-','')
//                             .replace(/\d+/g, '')
//                             .replace(',','');
//     console.log(normalizedText);
//     return normalizedText.split(' ');
// }

// module.exports = {addWords}