function lcaBT (parent, root, a, b) {
    logger._print ('开始新的迭代，父节点: ' + parent + ', 当前根: ' + root);
    if (root === -1) {
        logger._print ('目标没找到，回退')
        return null;
    }
    
    if (parent !== null) treeTracer._visit (root, parent)._wait ();
    else treeTracer._visit (root)._wait ();
    
    if (root === a || root === b) return root;
    
    var left = lcaBT (root, T [root] [0], a, b);
    var right = lcaBT (root, T [root] [1], a, b);
    
    if (left !== null && right !== null) return root;
    if (left === null && right === null) {
        treeTracer._leave (root, parent)._wait ();
    }
    
    return (left !== null ? left : right);
}

var a = 7, b = 2;
logger._print ( a + ' 和 ' + b + ' 的最近公共祖先是: ' + lcaBT (null, 5, a, b));