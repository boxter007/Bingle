var text = ['h','e','l','l','o',' ','s','i','r',' ','h','e','l','l','o'];
var pattern = ['h','e','l','l','o'];

var Q = 101; // A prime number 
var D = 256; // number of characters in the input alphabet

var tracer1 = new Array1DTracer('字符串')._setData(text);
var tracer2 = new Array1DTracer('子串')._setData(pattern);
var logger = new LogTracer('控制台');