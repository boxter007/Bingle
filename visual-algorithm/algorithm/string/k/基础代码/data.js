function randString(length) {
  var result = Math.random().toString(36);
  return result.substring(result.length - length);
}
var string = randString(15);
var startIndex = Math.floor(Math.random() * 10); 
var substring = string.substr(startIndex, 5); 
var track = Array.apply(null, Array(substring.length)).map(Number.prototype.valueOf, 0);
var  stringTracer = new Array1DTracer('字符串') ,
  substrTracer = new Array1DTracer('子串'),
  trackTracer = new Array1DTracer('跟踪器');
var logger = new LogTracer('控制台');
trackTracer._setData(track);
substrTracer._setData(substring);
stringTracer._setData(string);
