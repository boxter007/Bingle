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

  logger._print(currChar + ' -> ' + nextChar);
  return nextChar;
}

function cipher(str, rotation, direction, cipherTracer) {
  logger._wait(1);
  if (!str) return '';
  logger._wait(2);
  for (var i = 0; i < str.length; i++) {

    cipherTracer._wait(3);

    var currChar = str.charAt(i);
    logger._wait(4);
    if (typeof alphabetMap[currChar] === 'number') { // don't encrpt/decrypt characters not in  alphabetMap
      logger._wait(5);
      var r = rotation;

      logger._print(currChar + ' 向' + (direction == 'up' ? '前' : '后') + '移动 '   +  rotation + ' 位');
      cipherTracer._select(i)._wait(6);

      // perform given amount of rotations in the given direction
      while (r-- > 0) {
        currChar = getNextChar(currChar, direction);
        cipherTracer._notify(i, currChar)._wait(7);
        logger._wait(8);
      }
      logger._wait(9);
      logger._print('当前结果: ' + str);
    } 
    logger._wait(10);
    str = str.substring(0, i) + currChar + str.substring(i + 1);
    logger._wait(11);
    
  }
  logger._wait(12);
  return str;
}

function encrypt(str, rotation) {
  logger._print('加密: ' + str);
  return cipher(str, rotation, 'up', encryptTracer);
}

function decrypt(str, rotation) {
  logger._print('解密: ' + str);
  return cipher(str, rotation, 'down', decryptTracer);
}
logger._wait(27);
var encrypted = encrypt(string, rotation);
logger._print('加密结果: ' + encrypted);

decryptTracer._setData(encrypted);
logger._wait(28);
var decrypted = decrypt(encrypted, rotation);
logger._print('解密结果: ' + decrypted);
