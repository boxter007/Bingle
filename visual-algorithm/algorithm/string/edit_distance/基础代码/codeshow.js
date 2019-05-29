var dist = (function editDistance(str1, str2, table) {
    table.forEach(function (item, index) {
        var character = (index === 0) ? '*' : str1 [index - 1];
    });
    for (var i = 1; i < str1.length + 1; i++) {
        for (var j = 1; j < str2.length + 1; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                table[i][j] = table[i - 1][j - 1];
            }
            else {
                table[i][j] = Math.min(table [i - 1] [j], table [i] [j - 1], table [i - 1] [j - 1]) + 1;
            }
        }
    }
    return table [str1.length] [str2.length];
})(str1, str2, table);