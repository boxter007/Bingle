var startx = 1;//起始坐标
var starty = 1;//起始坐标
var mapx = 8;//迷宫高度
var mapy = 12;//迷宫宽度
var step = 1;//步数累计
var map = [
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
	['#', '.', '.', '#', '.', '.', '.', '#', '.', '.', '.', '#'],
	['#', '.', '.', '#', '.', '#', '.', '#', '.', '#', '.', '#'],
	['#', '.', '.', '.', '.', '#', '.', '#', '.', '#', '.', '#'],
	['#', '#', '.', '.', '.', '#', '.', '#', '.', '.', '.', '@'],
	['#', '.', '.', '#', '.', '#', '.', '#', '.', '#', '.', '#'],
	['#', '.', '.', '#', '.', '#', '.', '.', '.', '.', '.', '#'],
	['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#']];//迷宫
var bestStep = mapx * mapy;//最短步数,初始化为迷宫的面积
var bestMap ;//最短步数的走法记录

var boardTracer = new Array2DTracer ('迷宫')._setData (map);
var logTracer = new LogTracer ('控制台');
var posTracer = new Array1DTracer ('最短步数')._setData (bestStep);