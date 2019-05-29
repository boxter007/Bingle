function bst_insert ( root, element, parent ) { 
    var treeNode = T[root];
    var propName = '';    
    if ( element < root ) {
        propName = 'left';
    } else if ( element > root) {
        propName = 'right';
    }
    if(propName !== '') {
        if ( !treeNode.hasOwnProperty(propName) ) {
            T[element] = {};
        } else {
            bst_insert ( treeNode[propName], element, root );
        }
    }
}
var Root = elements[0]; 
T[Root] = {};
for (var i = 1; i < elements.length; i++) {
    bst_insert ( Root, elements[i] ); 
}
