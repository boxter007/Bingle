/*
 code assumes that plainText contains ONLY LOWER CASE ALPHABETS
 */

Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};



function encrypt(plainText) {
  logger._wait(1);
  var cypherText = '';

  function cryptAlpha(alpha) {
    logger._wait(3);
    var index = alpha.charCodeAt(0) - 'a'.charCodeAt(0);
    logger._wait(4);
    var result = ((keys.a * index) + keys.b).mod(N);

    logger._print(alpha + ' 的编码为： ' + index);
    logger._wait(5);
    result += 'a'.charCodeAt(0);
    logger._wait(6);
    return String.fromCharCode(result);
  }

  logger._print('开始仿射加密');
  logger._print('加密公式: <span style="color:red">((keys.a * index_of_alphabet) + keys.b) % N</span>');
  logger._print('keys.a=' + keys.a + ', keys.b=' + keys.b + ', N=' + N);
  logger._wait(8);
  for (var i in plainText) {
    ptTracer._select(i)._wait();
    ptTracer._deselect(i);
    logger._wait(9);

    cypherText += cryptAlpha(plainText [i]);

    ptTracer._notify(i, cypherText.slice(-1))._wait();
    ptTracer._denotify(i);
    logger._wait(10);
  }
  logger._wait(11);
  return cypherText;
}

function decrypt(cypherText) {
  logger._wait(14);
  var plainText = '';
  var aInverse = (function () {
    logger._wait(16);
    for (var i = 1; i < N; i++) {
      logger._wait(17);
      if (((keys.a * i).mod(N)) === 1) {
        logger._wait(18);
        return i;
      }
    }
  })();

  logger._print('a<sup>-1</sup> = ' + aInverse);

  function decryptAlpha(alpha) {
    var index = alpha.charCodeAt(0) - 'a'.charCodeAt(0);
    var result = (aInverse * (index - keys.b)).mod(N);

    logger._print( alpha + ' 的编码为： ' + index);

    result += 'a'.charCodeAt(0);
    return String.fromCharCode(result);
  }

  logger._print('开始仿射解密');
  logger._print('解密公式: <span style="color:red">(a<sup>-1</sup> * (index - keys.b)) % N</span>');
  logger._print('keys.b=' + keys.b + ', N=' + N);
  logger._wait(28);
  for (var i in cypherText) {
    ctTracer._select(i)._wait();
    ctTracer._deselect(i)._wait();
    logger._wait(29);
    plainText += decryptAlpha(cypherText [i]);
    logger._wait(30);
    ctTracer._notify(i, plainText.slice(-1))._wait();
    ctTracer._denotify(i)._wait();
  }
  logger._wait(31);
  return plainText;
}
logger._wait(34);
var keys = {a: 5, b: 7},N = 26;
logger._wait(35);
var cipherText = encrypt(plainText);
ctTracer._setData(cipherText);
logger._wait(36);
decrypt(cipherText);
logger._print('完成');