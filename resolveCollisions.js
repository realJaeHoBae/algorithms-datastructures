var detectCollision = function(array) {
  let output = [], biggestLeft = null, stack = [], destroyed = false;

  for (let i = 0; i < array.length; i++) {
    let current = array[i];
    
    if (current < 0) {
      
      while (stack.length > 0 && stack[stack.length - 1] <= Math.abs(current)) {
        let popped = stack.pop();
        if(popped >= Math.abs(current)) {
          destroyed = true;
          break;
        }
        if (popped > Math.abs(current)) {
          stack.push(popped)
        }
      }
      if (destroyed) { destroyed = false; continue; }
      if (stack.length === 0 ) { output.push(current); }
      
    } else {
      stack.push(current);
    }
  }

  return output.concat(stack);
};




let adetect = [8, -8];

console.log(detectCollision(adetect));

// [10, 2, -5, 1] -> [10, 1] 