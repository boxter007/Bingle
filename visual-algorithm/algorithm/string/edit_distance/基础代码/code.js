logger._print('初始化动态规划表');
logger._print('Y坐标（从上到下）: ' + str1);
logger._print('X坐标（从左到右）: ' + str2);

var dist = (function editDistance(str1, str2, table) {
    //display grid with words
    logger._print('*** ' + str2.split('').join(' '));
    table.forEach(function (item, index) {
        logger._wait(1);
        logger._wait(2);
        var character = (index === 0) ? '*' : str1 [index - 1];
        logger._print(character + '\t' + item);

    });

    //begin ED execution
    for (var i = 1; i < str1.length + 1; i++) {
        logger._wait(4);
        for (var j = 1; j < str2.length + 1; j++) {
            logger._wait(5);
            logger._wait(6);
            if (str1[i - 1] === str2[j - 1]) {
                tracer._select(i - 1, j - 1)._wait(7);
                table[i][j] = table[i - 1][j - 1];
                tracer._notify(i, j, table[i][j])._wait();
                tracer._denotify(i, j);
                tracer._deselect(i - 1, j - 1);
            }
            else {
                tracer._select(i - 1, j);
                tracer._select(i, j - 1);
                tracer._select(i - 1, j - 1)._wait(10);
                table[i][j] = Math.min(table [i - 1] [j], table [i] [j - 1], table [i - 1] [j - 1]) + 1;
                tracer._notify(i, j, table[i][j])._wait();
                tracer._denotify(i, j);
                tracer._deselect(i - 1, j);
                tracer._deselect(i, j - 1);
                tracer._deselect(i - 1, j - 1);
            }
        }
    }

    tracer._select(str1.length, str2.length);
    logger._wait(14);
    return table [str1.length] [str2.length];
})(str1, str2, table);

logger._print('最小编辑距离: ' + dist);