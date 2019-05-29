function Move(x , y)
{
	//判断是否到终点
	if (map[x, y] == '@')
	{
		if(step < bestStep)
		{
			bestStep = step;
			bestMap = map;
		}
		return;
	}
	//判断是否越界或者是否已经经过
	if (x < 0 || y < 0 || x >= mapx || y >= mapy || map[x, y] != '.')
		return;
	//标记轨迹
	map[x, y] = step;
	step++;
	//开始右、左、下、上移动
	Move(x + 1, y );
	Move(x - 1, y );
	Move(x , y + 1);
	Move(x , y - 1);
	//此节点回退
	map[x, y] = 0;
	step--;  
}