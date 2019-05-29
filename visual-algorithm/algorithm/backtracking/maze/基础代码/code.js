Move(startx, starty);
boardTracer = new Array2DTracer ('棋盘')._setData (bestMap);
        
function Move(x , y)
{
	logTracer._wait(4);
	if (map[x, y] == -2)
	{
		logTracer._wait(6);
		if(step < bestStep)
		{
			logTracer._wait(8);
			bestStep = step;
			posTracer._notify (bestStep);
			logTracer._wait(9);
			bestMap = map;
		}
		logTracer._wait(11);
		return;
	}
	//判断是否越界或者是否已经经过
	logTracer._wait(14);
	if (x < 0 || y < 0 || x >= mapx || y >= mapy || map[x, y] != 0)
	{
		logTracer._wait(15);
		return;
	}
	//标记轨迹
	logTracer._wait(17);
	map[x, y] = step;
	step++;
	boardTracer._notify ( x, y, step)._wait(18);
	boardTracer._denotify( x, y);
	boardTracer._select ( x, y);
	//开始右、左、下、上移动
	logTracer._wait(20);
	Move(x + 1, y );
	logTracer._wait(21);
	Move(x - 1, y );
	logTracer._wait(22);
	Move(x , y + 1);
	logTracer._wait(23);
	Move(x , y - 1);
	//此节点回退
	logTracer._wait(25);
	map[x, y] = 0;
	step--;
	boardTracer._notify ( x, y, '.')._wait(26);
	boardTracer._denotify( x, y);
	boardTracer._deselect( x, y);  
}