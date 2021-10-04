
var WordsService = require('../Services/wordsService.js');
const http = require('http');
const fs = require('fs');

const service = new WordsService();

function wordCounter(req, res){
    console.log('wordCounter started');

    const inputType = req.header('InputType');

    try {
        if(inputType === 'text'){
            const text = req.body;
            service.addWords(text.toString());
            res.status(200).send();
        }
        else if(inputType === 'filePath'){
            const filePath = req.body;
            const text = fs.readFileSync(filePath);
            service.addWords(text.toString());
            res.status(200).send();
        }
        else if(inputType === 'url'){
            const url = req.body;

            http.request(url, (response) => {
                let text = '';
                response.on('data', (chunk) => text += chunk);
                response.on('end', () => {
                    service.addWords(text.toString())
                });
            }).end();
            res.status(200).send();
        }
        else{
            console.log('Unsupported InputType');
            res.status(400).send();
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send();
    }
}

function wordStatistics(req,res){ 
    console.log('wordStatistics started');
    const word = req.query['word'];
    if(word){
        const count = service.getWordStatistics(word);
        res.status(200).send(count.toString());
    }
    else{
        res.status(400).send();
    }

}

function test(req,res){
    console.log('aaaa');
    http.request('http://api.plos.org/search?q=title:DNA', (response) => {
        console.log("response:::: " + response.toString().substring(0,5));
        let text = '';
        response.on('data', (chunk) => {
            text += chunk
            console.log("chunk: " + chunk);
        });
        response.on('end', () => {
            console.log('text: ' + text);
            //service.addWords(text.toString())
        });
    }).end();
    res.status(200).send();
}

module.exports = { wordCounter, wordStatistics, test}