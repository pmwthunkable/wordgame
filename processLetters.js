const lineReader = require('line-reader');
const fs = require('fs');

const wordDict = {};
const possibleWordKeysSet = new Set();

lineReader.open('SOWPODS.txt', function(err, reader) {
  runNextLine(reader);
});

const runNextLine = (reader) => {
  if (reader.hasNextLine()) {
    reader.nextLine(function(err, line) {
      addWordToDict(line);
      runNextLine(reader);
    });
  } else {
    fs.writeFile('wordKeys.js', getFileString(), (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('words saved');
    });
  }
}

const addWordToDict = (line) => {
  //console.log(line)
  if (line.length < 4) return
  const key = Array.from(new Set(line.split(''))).sort().join('');
  if (key.length === 7) {
    possibleWordKeysSet.add(key);
  }
  if (!wordDict[key]) {
    wordDict[key] = [line];
  } else {
    wordDict[key].push(line)
  }
}

const getFileString = () => {
  return `
var allKeys = ${JSON.stringify(wordDict)};

var possibleWordKeys = ${JSON.stringify(Array.from(possibleWordKeysSet))};
`;  
}
