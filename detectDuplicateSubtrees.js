var findDuplicateSubtrees = function(root) {
  let subtrees = new Set();
  let inOutput = new Set();
  let output = [];
  
  postOrder(root);

  return output;

  function postOrder(node, running) {
    if (!node) { return 'null'; }

    let left = 'L' + postOrder(node.left);
    let right = 'R' + postOrder(node.right);
    
    let subtree = `${node.value} (${left}) (${right})`;

    if (subtrees.has(subtree)) {
      if (!inOutput.has(subtree)) {
        output.push(node);
        inOutput.add(subtree);
      }
    } else {
      subtrees.add(subtree);
    }
    return subtree;
  }
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