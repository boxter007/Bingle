var string = 'hello! how are you doing?';
var rotation = 5;
var alphabet = 'abcdefghijklmnopqrstuvwxyz';

var alphabetMap = alphabet.split('').reduce(function(map, curr, idx) {
  map[curr] = idx;
  return map;
}, {});

var encryptTracer = new Array1DTracer('加密');
var decryptTracer = new Array1DTracer('解密');
var logger = new LogTracer('控制台');

encryptTracer._setData(string);