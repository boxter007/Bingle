function cipher(str, rotation, direction) {
  if (!str) return '';
  for (var i = 0; i < str.length; i++) {
    var currChar = str.charAt(i);
    if (typeof alphabetMap[currChar] === 'number') {
      var r = rotation;
      while (r-- > 0) {
        currChar = getNextChar(currChar, direction);
      }
    } 
    str = str.substring(0, i) + currChar + str.substring(i + 1);
  }
  return str;
}
function getPosUp(pos) {
  return (pos === alphabet.length - 1) ? 0 : pos + 1;
}
function getPosDown(pos) {
  return (pos === 0) ? alphabet.length - 1 : pos - 1;
}
function getNextChar(currChar, direction) {
  var pos = alphabetMap[currChar];
  var nextPos = direction === 'up' ? getPosUp(pos) : getPosDown(pos);
  var nextChar = alphabet.charAt(nextPos);
  return nextChar;
}

var encrypted = cipher(string, rotation, 'up');
var decrypted = cipher(string, rotation, 'down');