function debounce(fxn, delay) {
  let inDebounce;
  return function() {
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => { fxn.apply(this, arguments) }, delay)
  }
}

function throttle(fxn, delay) {
  let lastRan;
  let inThrottle;
  return function() {
    let now = new Date();
    if (!lastRan) { lastRan = now; }
    clearTimeout(inThrottle);
    inThrottle = setTimeout(() => { 
      lastRan = new Date(); fxn.apply(this, arguments) 
    }, delay - (now - lastRan))
  }
}

// task runner

let app = function() {
  let queue = [];
  let limit = 4;
  let running = 0;
  createBar(queue);
  document.getElementById('butt').addEventListener('click', throttle(() => {
    if (queue.length === 0 || running >= 1) {
      createBar(queue);
    }
    function init() {
      if (running >= limit) { return; }
      running++;
      function next() {
        if (queue.length === 0) {
          running--;
          return;
        } else {
          promisify(queue.shift()).then(() => { next() })
          
        }
      }  
      next();
    };   
    init(); 
  }, 0));
  document.getElementById('butt').addEventListener('click', debounce(() => {
    let node = document.getElementById('bars');
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }, 60000));
};

let createBar = function(queue) {
  let back = document.createElement('div');
  back.classList.add('back');
  let bar = document.createElement('div');
  bar.classList.add('bar');
  back.appendChild(bar);
  document.getElementById('bars').appendChild(back);
  queue.push(back);
};

let promisify = function(current) {
  let start = Date.now();
  return new MyPromise ((resolve, reject) => {
    let interval = setInterval(() => {
      current.children[0].style.width = `${(Date.now() - start) * 600 / 6000}px`
    }, 10);
    setTimeout(() => {
      clearInterval(interval);
      current.children[0].style.width = '600px'
      resolve();
    }, 6000)

  });
}
