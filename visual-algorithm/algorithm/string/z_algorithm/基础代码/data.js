var text_tracer = new Array1DTracer('字符串');
var patt_tracer = new Array1DTracer('子串');
var concat_tracer = new Array1DTracer('连接数组');
var tracer = new Array1DTracer('Z数组');

var pattern = "abc";
var text = "xabcabzabc";
var i;

var len = pattern.length + text.length + 1;

var z = new Array(len);
z[0]=0;

patt_tracer._setData(pattern);
text_tracer._setData(text);
tracer._setData(z);
var logger = new LogTracer('控制台');

var concat = pattern + "$" + text;
concat_tracer._setData(concat);
var patLen = pattern.length;
createZarr(concat);
tracer._setData(z);
