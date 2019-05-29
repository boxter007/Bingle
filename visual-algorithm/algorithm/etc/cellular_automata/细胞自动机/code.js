function CellularAutomata(fillShape, emptyShape) {
	tracer._wait(1);
	var nextGrid = [];

	for (let i = 0; i < G.length; i++) {
		tracer._wait(2);
		tracer._wait(3);
		nextGrid[i] = [];
		for (let j = 0; j < G[i].length; j++) {
			tracer._wait(4);
			tracer._wait(5);
			var adjCount = 0;
			tracer._wait(6);
			var twoAwayCount = 0;
			//look at the states of the neighboring cells
			for (var x = -2; x <= 2; x++) {
				tracer._wait(7);
				for (var y = -2; y <= 2; y++) {
					tracer._wait(8);
					tracer._wait(9);
					if ((i + x >= 0 && i + x < G.length) && (j + y >= 0 && j + y < G[i].length)) {
						tracer._wait(10);
						if (!(x !== 0 && y !== 0) && G[i + x][j + y] == emptyShape) {
							tracer._wait(11);
							if (x == -2 || x == 2 || y == -2 || y == 2) {
								tracer._wait(12);
								twoAwayCount++;
							} else {
								tracer._wait(14);
								adjCount++;
							}
						}
					}
				}
			}
			tracer._wait(20);
			//change the current cell's state according to these rules
			if ((adjCount >= 5)) {
				tracer._wait(21);
				nextGrid[i][j] = fillShape;
			} else if (adjCount <= 1) {
				tracer._wait(22);
				tracer._wait(23);
				if (twoAwayCount < 3) {
					tracer._wait(24);
					nextGrid[i][j] = fillShape;
				} else {
					tracer._wait(26);
					nextGrid[i][j] = emptyShape;
				}
			} else {
				tracer._wait(29);
				nextGrid[i][j] = emptyShape;
			}
		}
	}
	
	for (let i = 0; i < nextGrid.length; i++) {
		tracer._wait(33);
		for (let j = 0; j < nextGrid[i].length; j++) {
			tracer._wait(34);
			tracer._denotify(i, j, G[i][j]);
			tracer._select(i, j)._wait(35);
			G[i][j] = nextGrid[i][j];
			if (G[i][j] == fillShape) {
				tracer._notify(i, j, G[i][j]);
			} else {
				tracer._notify(i, j, G[i][j]);
				tracer._denotify(i, j, G[i][j]);
				tracer._deselect(i, j);
			}
		}
	}
}
tracer._wait(39);
for (var iter = 0; iter < generations; iter++) {
	tracer._wait(40);
	CellularAutomata('#', '.');
}