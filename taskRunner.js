const https = require('https');

function Runner(max) {
  this.max = max;
  this.running = 0;
  this.taskQueue = [];
}

Runner.prototype.run = function() {
  if ((this.running < this.max) && this.taskQueue.length > 0) {
    this.running++;
    console.log(this.running);
    let current = this.taskQueue.shift();
    current
    .then((result) => { this.running--; this.run() })
    .catch((err) => { console.log(err); this.running--; this.run(); })
  }
}

Runner.prototype.add = function(promise) {
  this.taskQueue.push(promise);
  this.run();
}

function Promisify(title) {
  return new MyPromise((resolve, reject) => {
    https.get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data = JSON.parse(chunk.toString()) });
      res.on('end', () => { resolve(data) });
    }).on('error', (e) => { reject(e) })
  })
}

function MyPromise(fxn) {
  this.thenCallbacks = [];
  this.onCatch = null;
  this.onFinally = null;
  this.value = undefined;

  fxn(resolver.bind(this), rejector.bind(this));

  function resolver(value) {
    this.value = value;
    this.thenCallbacks.forEach((func) => {
      func(this.value);
    }, this);

    if (typeof this.onFinally === 'function') {
      this.onFinally(this.value);
    }
  }

  function rejector(value) {
    this.value = value;

    if (typeof this.onCatch === 'function') {
      this.onCatch(this.value);
    }

    if (typeof this.onFinally === 'function') {
      this.onFinally(this.value);
    }
  }
}

MyPromise.prototype.then = function(cb) {
  this.thenCallbacks.push(cb)
  return this;
}

MyPromise.prototype.catch = function(cb) {
  this.onCatch = cb;
  return this;
}

MyPromise.prototype.finally = function(cb) {
  this.onFinally = cb;
  return this;
}












let runner = new Runner(5);
runner.add(Promisify('a'))
runner.add(Promisify('b'))
runner.add(Promisify('c'))
runner.add(Promisify('d'))
runner.add(Promisify('e'))
runner.add(Promisify('f'))
runner.add(Promisify('g'))
setTimeout(() => { runner.add(Promisify('d'))}, 500)
setTimeout(() => { runner.add(Promisify('d'))}, 500)
setTimeout(() => { runner.add(Promisify(''))}, 1000)
setTimeout(() => { runner.add(Promisify('d'))}, 900)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify(''))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 500)
setTimeout(() => { runner.add(Promisify('d'))}, 500)
setTimeout(() => { runner.add(Promisify('d'))}, 1000)
setTimeout(() => { runner.add(Promisify(''))}, 900)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 500)
setTimeout(() => { runner.add(Promisify(''))}, 500)
setTimeout(() => { runner.add(Promisify('d'))}, 1000)
setTimeout(() => { runner.add(Promisify('d'))}, 900)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify(''))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 1500)
setTimeout(() => { runner.add(Promisify('d'))}, 1500)
setTimeout(() => { runner.add(Promisify('d'))}, 1000)
setTimeout(() => { runner.add(Promisify('d'))}, 900)
setTimeout(() => { runner.add(Promisify('d'))}, 1700)
setTimeout(() => { runner.add(Promisify('d'))}, 1700)
setTimeout(() => { runner.add(Promisify('d'))}, 1700)
setTimeout(() => { runner.add(Promisify('d'))}, 1500)
setTimeout(() => { runner.add(Promisify('d'))}, 2500)
setTimeout(() => { runner.add(Promisify('d'))}, 2000)
setTimeout(() => { runner.add(Promisify('d'))}, 2900)
setTimeout(() => { runner.add(Promisify('d'))}, 3700)
setTimeout(() => { runner.add(Promisify('d'))}, 2700)
setTimeout(() => { runner.add(Promisify('d'))}, 1700)
setTimeout(() => { runner.add(Promisify('d'))}, 2500)
setTimeout(() => { runner.add(Promisify('d'))}, 1500)
setTimeout(() => { runner.add(Promisify('d'))}, 1000)
setTimeout(() => { runner.add(Promisify('d'))}, 900)
setTimeout(() => { runner.add(Promisify('d'))}, 400)
setTimeout(() => { runner.add(Promisify('d'))}, 700)
setTimeout(() => { runner.add(Promisify('d'))}, 5700)
setTimeout(() => { runner.add(Promisify('d'))}, 5700)
