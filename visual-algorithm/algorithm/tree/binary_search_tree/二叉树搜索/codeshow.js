function bst(item, node, parent) {
  if (item < node) { 
    if (T[node][0] != -1) {
      bst(item, T[node][0], node);
    } 
  } else {						
    if (T[node][1] != -1){
      bst(item, T[node][1], node);
    }
  }
}
bst(key, 5); 