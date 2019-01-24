Array.prototype.myReduce = function(callback, initial) {
  let accumulating = initial || this[0];
  let start = initial ? 0 : 1;
  for (let i = start; i < this.length; i++) {
    accumulating = callback(accumulating, this[i]);
  }
  return accumulating;
};

Array.prototype.myMap = function(callback) {
  let output = [];
  for (let i = 0; i < this.length; i++) {
    output.push(callback(this[i], i, this));
  }
  return output;
}

Array.prototype.flatten = function() {
  let output = [];

  checkArray(this);

  return output;

  function checkArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) { checkArray(arr[i]) }
      else { output.push(arr[i]) }
    }
  }
}






function mySetInterval(func, delay) {
  return setTimeout(() => {
    func();
    mySetInterval(func, delay)
  }, delay)
}

function myClearInterval(id) {
  clearTimeout(id);
}




Function.prototype.bind1 = function(scope) {
  let func = this;
  let arg = [];
  for (let k in arguments) {
    if (k > 0) { arg.push(arguments[k]); }
  }

  return function() {
    let postArg = [];
    for (let k in arguments) {
      postArg.push(arguments[k]);
    }
    return func.apply(scope, arg.concat(postArg));
  }
}