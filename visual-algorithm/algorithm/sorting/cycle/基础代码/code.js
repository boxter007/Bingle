logger._print('原始数组 = [' + D.join(', ') + ']');
var N = D.length;
var writes = 0;   // number of writing performed
var pos;          // the index of item in the sorted array
var item;         // an item in the array
var temp;         // a temp value used for storing swapped item
logger._wait(0);
logger._wait(1);
logger._wait(2);
logger._wait(3);
logger._wait(4);

for (var cycleStart = 0; cycleStart <= N - 2; cycleStart++) {
  logger._wait(5);
  logger._wait(6);

  item = D[cycleStart];

  // find where to put the item
  logger._wait(7);
  pos = cycleStart;
  tracer._select(cycleStart);

  for (var i = cycleStart + 1; i <= N - 1; i++) {
    tracer._select(i)._wait(8)._deselect(i);
    logger._wait(9);
    if (D[i] < item) {
      logger._wait(10);
      pos++;
    }
  }

  // if the item is already there, this is not a circle
  logger._wait(13);
  if (pos === cycleStart) {
    tracer._deselect(cycleStart);
    logger._wait(14);
    continue;
  }

  // otherwise put the item there or right after any duplicates
  while (item === D[pos]) {
    logger._wait(16);
    logger._wait(17);
    pos++;
  }

  // write item to new index and increment writes
  temp = D[pos];
  D[pos] = item;
  item = temp;
  writes++;
  logger._wait(19);
  logger._wait(20);
  logger._wait(21);
  logger._wait(22);
  logger._print('在索引 ' + pos + ' 写入' + D[pos]  );
  
  tracer._select(pos)._wait()._deselect(pos);
  tracer._notify(pos, D[pos])._notify(cycleStart, D[cycleStart])._wait();
  tracer._denotify(pos)._denotify(cycleStart);

  // rotate the rest of the cycle
  while (pos !== cycleStart) {
    logger._wait(23);
    logger._wait(24);
    pos = cycleStart;

    for (i = cycleStart + 1; i <= N - 1; i++) {
      tracer._select(i)._wait(25)._deselect(i);
      logger._wait(26);
      if (D[i] < item) {
        logger._wait(27);
        pos++;
      }
    }

    while (item === D[pos]) {
      logger._wait(30);
      logger._wait(31);
      pos++;
    }

    temp = D[pos];
    D[pos] = item;
    item = temp;
    logger._wait(33);
    logger._wait(34);
    logger._wait(35);
    logger._print('在索引 ' + pos + ' 写入' + D[pos]  );
    
    tracer._select(pos)._wait()._deselect(pos);
    tracer._notify(pos, D[pos])._notify(cycleStart, D[cycleStart])._wait(36);
    tracer._denotify(pos)._denotify(cycleStart);

    writes++;
  }
}