# Lemonade Word Counter Exercise
A simple word counter server.

## Getting Started:
1. Make sure you have nodeJS and npm installed (i've used nodeJs v14.15.4 and npm v6.14.10).
1. Clone the project to your local machine.
2. Open a terminal and change working directory to the project root folder
3. Run 'npm install'

## Run server
1. Open a terminal and change working directory to the project root folder
2. Run 'npm run start'. The server will start running. It will start listenting on port 4000

## Restart saved words statistics
1. Open the command line and switch to the root directory of the project.
2. Run 'npm run clear'

## APIs

URL: /word

### Word Counter
POST /word

**Accepted inputs**:
1. Simple String:
    * Header needs to contain key 'InputType' with value 'text'
    * Body needs to contain plain text. for example: '-Hi, my n-ame is dan95- my ,nam-e is mao642'

2. A file path:
    * Header needs to contain key 'InputType' with value 'filePath'
    * Body needs to contain a file path (which contains the text). for example 'C:\test.txt'

3. A URL:
    * Header needs to contain key 'InputType' with value 'url'
    * Body needs to contain a url, which is expected to return text by a HTTP GET. for example 'http://api.plos.org/search?q=title:DNA'

**Return**
API will return status code indicating its result.

### Word Statistics
GET /word

**Accepted input**:
URL needs to contain a query parameter named 'word' with its value.
for example:  'http://localhost:4000/word/?word=exercise'

**Return**
API will return status code indicating its result.
And a number indicatiting the word's number of occurences.
