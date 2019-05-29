function sort(a){
    logger._wait(1);
   if (a.length <= 1){
        logger._wait(2);
        return a;
   }
    logger._wait(3);
    var mid = parseInt(a.length/2);
    logger._wait(4);
    var left = [];
    logger._wait(5);
    var right = [];
    logger._wait(6);
    var center = [];
    ltracer._setData(left);
    ctracer._setData(center);
    rtracer._setData(right);

    for(var item = 0; item < a.length ; item ++){
        logger._wait(7);
        logger._wait(8);
        if (a[item] < a[mid]){
            left.push(a[item]);
            ltracer._setData(left);
            ltracer._select(left.length - 1)._wait(9);
            ltracer._deselect(left.length - 1);
        }
        else if (a[item] > a[mid]){
            logger._wait(10);
            right.push(a[item]);
            rtracer._setData(right);
            rtracer._select(right.length - 1)._wait(11);
            rtracer._deselect(right.length - 1);
        }
        else{
            center.push(a[item]);
            ctracer._setData(center);
            ctracer._select(center.length - 1)._wait(13);
            ctracer._deselect(center.length - 1);
        }
    }
    logger._print('传入队列：（' + a + '）拆分为：')
    logger._print('===>左侧队列：（'+left + '）');
    logger._print('===>中间队列：（'+center +'）');
    logger._print('===>右侧队列：（'+right + '）');
    logger._wait(15);
    var l = sort(left);
    var r = sort(right);
    logger._print('左侧队列：（'+l + '）');
    logger._print('中间队列：（'+center +'）');
    logger._print('右侧队列：（'+r + '）');
    var x = l.concat(center).concat(r);
    logger._print('===>合并为：（' + x + '）')
    ftracer._setData(x)._wait(16);
    return x;
}
logger._wait(18);
sort(D);