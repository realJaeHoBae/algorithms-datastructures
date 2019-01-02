var findDuplicateSubtrees = function(root) {
  console.log(root);
}


function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

let root = new Node(1);
root.left = new Node(2);
root.left.left = new Node(4);
root.right = new Node(3);
root.right.left = new Node(2);
root.right.left.left = new Node(4);
root.right.right = new Node(4);

console.log(findDuplicateSubtrees(root));