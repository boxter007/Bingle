function randString(length) {
  var choices = 'abcdefghijklmnopqrstuvwxyz';
  var text = '';

  for (var i = 0; i < length; i++) {
    text += choices[Integer.random(0, choices.length - 1)];
  }

  return text;
}

//var plainText = randString (5);
var plainText = 'secret';
var ptTracer = new Array1DTracer('加密');
var ctTracer = new Array1DTracer('解密');
var logger = new LogTracer('控制台');

ptTracer._setData(plainText);