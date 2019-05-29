function encrypt(plainText) {
  var cypherText = '';
  function cryptAlpha(alpha) {
    var index = alpha.charCodeAt(0) - 'a'.charCodeAt(0);
    var result = ((keys.a * index) + keys.b).mod(N);
    result += 'a'.charCodeAt(0);
    return String.fromCharCode(result);
  }
  for (var i in plainText) {
    cypherText += cryptAlpha(plainText [i]);
  }
  return cypherText;
}
function decrypt(cypherText) {
  var plainText = '';
  var aInverse = (function () {
    for (var i = 1; i < N; i++) {
      if (((keys.a * i).mod(N)) === 1) {
        return i;
      }
    }
  })();
  function decryptAlpha(alpha) {
    var index = alpha.charCodeAt(0) - 'a'.charCodeAt(0);
    var result = (aInverse * (index - keys.b)).mod(N);
    result += 'a'.charCodeAt(0);
    return String.fromCharCode(result);
  }
  for (var i in cypherText) {
    plainText += decryptAlpha(cypherText [i]);
  }
  return plainText;
}

var keys = {a: 5, b: 7}, N = 26;
var cipherText = encrypt(plainText);
decrypt(cipherText);