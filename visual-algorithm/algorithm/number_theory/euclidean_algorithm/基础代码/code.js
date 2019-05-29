logger._print("寻找 " + a[0] + " 和 " + a[1] + " 的最大公约数");
logger._wait(0);
if(a[0] > a[1]) {
    logger._wait(1);
    var tmp = a[0];
    logger._wait(2);
    a[0] = a[1];
    logger._wait(3);
    a[1] = tmp;
    logger._print("第一个数大于第二个数. 交换数字.");
    tracer._setData(a)._wait();
}

while(a[0] > 0) {
    logger._wait(5);
    logger._print(a[1] + " 除以 " + a[0] + " 的余数为 " + a[1]%a[0]);
    logger._print("将余数赋值给第二个数");
    logger._wait(6);
    a[1] %= a[0];
    logger._print("开始交换数字，保证第一个数小于第二个数");
    tracer._notify(1, a[1])._wait(7);
    var tmp = a[0];
    logger._wait(8);
    a[0] = a[1];
    logger._wait(9);
    a[1] = tmp;
    tracer._notify(0, a[0]);
    tracer._notify(1, a[1])._wait();
    tracer._denotify(0);
    tracer._denotify(1);
}

logger._print("最大公约数为： " + a[1]);