 var printTree = function(root) {

  let queue = [root], BFS = [], output = [];

  while(queue.length > 0) {
    let dummy = [];
    let observed = false;
    for (let i = 0; i < queue.length; i++) {
      if (queue[i]) {
        observed = true;
        dummy.push(queue[i].left, queue[i].right);
      } else {
        dummy.push(null, null)
      }
    }
    if (observed) { BFS.push(queue.map((elem) => { return elem ? elem.val : elem })) }
      queue = observed ? dummy : [];
  }

  for (let depth = 0; depth < BFS.length; depth++) {
    output[depth] = [];
    let padding = Math.pow(2, BFS.length - depth - 1) - 1;

    for (let col = 0; col < BFS[depth].length; col++) {
      for (let i = 0; i < padding; i++) {  output[depth].push(""); }
      output[depth].push(BFS[depth][col] === null ? "" : BFS[depth][col].toString());
      for (let i = 0; i < padding; i++) {  output[depth].push(""); }
      if (col < BFS[depth].length - 1) { output[depth].push(""); }
    } 
  }

  return output;
};

let leaf1 = { val : 3, left : null , right : null };
let leaf2 = { val : 2, left : null , right : null };
let root = { val : 1, left : leaf1 , right : leaf2 };

console.log(printTree(root));
