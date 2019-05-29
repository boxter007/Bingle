function CellularAutomata(fillShape, emptyShape) {
	var nextGrid = [];
	for (let i = 0; i < G.length; i++) {
		nextGrid[i] = [];
		for (let j = 0; j < G[i].length; j++) {
			var adjCount = 0;
			var twoAwayCount = 0;
			for (var x = -2; x <= 2; x++) {
				for (var y = -2; y <= 2; y++) {
					if ((i + x >= 0 && i + x < G.length) && (j + y >= 0 && j + y < G[i].length)) {
						if (!(x !== 0 && y !== 0) && G[i + x][j + y] == emptyShape) {
							if (x == -2 || x == 2 || y == -2 || y == 2) {
								twoAwayCount++;
							} else {
								adjCount++;
							}
						}
					}
				}
			}
			if ((adjCount >= 5)) {
				nextGrid[i][j] = fillShape;
			} else if (adjCount <= 1) {
				if (twoAwayCount < 3) {
					nextGrid[i][j] = fillShape;
				} else {
					nextGrid[i][j] = emptyShape;
				}
			} else {
				nextGrid[i][j] = emptyShape;
			}
		}
	}
	for (let i = 0; i < nextGrid.length; i++) {
		for (let j = 0; j < nextGrid[i].length; j++) {
			G[i][j] = nextGrid[i][j];
		}
	}
}
for (var iter = 0; iter < generations; iter++) {
	CellularAutomata('#', '.');
}