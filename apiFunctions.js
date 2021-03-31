const getRandomPuzzle = () => {
  const answerKey = possibleWordKeys[Math.floor(Math.random()*possibleWordKeys.length)];
  const requiredLetter = answerKey[Math.floor(Math.random()*answerKey.length)]
  const answerWords = [];
  const answerKeyArray = answerKey.split('');
  answerKeyArray.splice(answerKeyArray.indexOf(requiredLetter), 1);
  const answerLetters = answerKeyArray.join('');
  const comboArray = getCombinations(answerKeyArray);
  comboArray.forEach(combo => {
    const comboWords = allKeys[(requiredLetter + combo).split('').sort().join('')];
    Array.prototype.push.apply(answerWords, comboWords);
  })

  return {answerLetters, requiredLetter, answerWords};
}

const getCombinations = (chars) => {
  var result = [];
  var f = function(prefix, chars) {
    for (var i = 0; i < chars.length; i++) {
      result.push(prefix + chars[i]);
      f(prefix + chars[i], chars.slice(i + 1));
    }
  }
  f('', chars);
  return result;
}

ThunkableWebviewerExtension.receiveMessageWithReturnValue(function(message, callback) {
  if (message === 'getRandomPuzzle') {
    callback(getRandomPuzzle());
  } else {
    callback(null);
  }
});

ThunkableWebviewerExtension.postMessage('pageLoaded');
