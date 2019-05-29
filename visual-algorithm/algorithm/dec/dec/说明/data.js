//这里是算法数据准备区域，
//这里的代码仅仅是为了算法执行和图形显示准备的，不参与算法的实现。
var chart = new ChartTracer('图表示例');
var tracer = new Array1DTracer('数组示例');
var logger = new LogTracer('控制台');
var D = Array1D.random(15);
tracer._setData(D);
chart._setData(D);