function lcaBT (parent, root, a, b) {
    if (root === -1) {
        return null;
    } 
    if (root === a || root === b) return root;
    var left = lcaBT (root, T [root] [0], a, b);
    var right = lcaBT (root, T [root] [1], a, b);
    if (left !== null && right !== null) return root;
    return (left !== null ? left : right);
}
var a = 7, b = 2;
lcaBT (null, 5, a, b);