function place(cur){
    var y = parseInt(cur / 9);
    var x = parseInt(cur % 9);
    tracer._select(y,x);
    if (origin[y][x] != 0){
        cur += 1 ;
        //tracer._deselect(y,x);
        if (cur == 81){
            for (var i = 0; i < map.length; i++){
                return true;
            }
        }
        return place(cur);
    }
    else{
        for (var j = 1; j<10; j++){
            if (check(y,x,j)){
                map[y][x] = j;
                tracer._notify(y,x,map[y][x])._wait();
                cur += 1;
                if (cur == 81){
                    return true;
                }
                if (!place(cur)){
                    cur -= 1;
                    map[y][x] = 0;
                    tracer._notify(y,x,map[y][x]);
                }
                else
                {
                  return true;
                }
            }
        }
        tracer._denotify(y,x,map[y][x]);
    }
}
function check(y, x, j){
    for (var item = 0; item < map[y].length; item++){
      if (j == map[y][item]){
        return false;
      }  
    }
    for (var item = 0; item < map.length; item++){
      if (j == map[item][x]){
        return false;
      }
    }
    var lty = parseInt(y / 3) * 3;
    var ltx = parseInt(x - x % 3);
    for(var i = lty; i < lty + 3; i++){
        for (var k = ltx; k < ltx + 3; k++){
            if (map[i][k] == j){
                return false;
            }
        }
    }
    return true;
}
place(0);