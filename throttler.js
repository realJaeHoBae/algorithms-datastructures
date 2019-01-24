const https = require('https');


class Throttler {
  constructor(n) {
    this.limit = n;
    this.queue = [];
    this.running = 0;
    this.totalRan = 0;
  }

  enqueue(promise, title) {
    this.queue.push(promise(title));
    this.run();
  }

  run() {
    if (this.running >= this.limit || this.queue.length === 0) { return; }
    this.running++;
    console.log('currenting running', this.running);
    let current = this.queue.shift();
    firePromise.call(this, current, 3);
    
    function firePromise(current, limit) {
      if (limit === 0) { console.log('Okay, giving up attempt'); this.running--; this.run(); return; }
      current.then((res) => { this.totalRan++; this.running--; console.log('toal ran', this.totalRan); this.run(); })
      .catch((err) => {console.log(err, `Errored out, ${limit} attempts remaining`); firePromise.call(this, current, limit - 1) });
    }
  }
}

function fetchData(title) {
  return new MyPromise((resolve, reject) => {
    https.get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}`, (res) => {
      let data = '';
      res.on('data', chunk => {data = JSON.parse(chunk.toString())});
      res.on('end', () => { resolve(data) });
    })
    .on('error', e => { reject(e) })
  })
}

let taskRunner = new Throttler(3);
// for (let i = 0; i < 200; i++) {
//   taskRunner.enqueue(fetchData, 'a');
// }

// rate limiter allows n executions in a given t time

class rateLimiter {
  constructor(callBack, size, time) {
    this.time = time;
    this.limit = size;
    this.running = 0;
    this.callBack = callBack;
  }

  execute() {
    if (this.running >= this.limit) { console.log(`blocked! currently running ${this.running}/${this.limit}`); return; }
    this.running++;
    this.callBack.apply(this, arguments);
    setTimeout(() => { this.running--; }, this.time)
  }
}

// let fetchBatMan = new rateLimiter((query, time) => {
//   setTimeout(() => { console.log(`fetched ${query}`) }, time)
// }, 2, 1000)

// setInterval(() => { fetchBatMan.execute('BatMan', 100) }, 10)

class eventEmitter {
  constructor() {
    this.events = {};
  }

  addListerner(key, func) {
    if (typeof func !== 'function') return;
    if (!this.events[key]) { this.events[key] = []; }
    this.events[key].push(func);
  }

  removeListener(key, func) {
    if (typeof func !== 'function' || !this.events[key]) { return; }
    this.events[key] = this.events[key].filter(fxn => {
      return func.toString() !== fxn.toString();
    })
  }

  removeAllListeners() {
    this.events = {};
  }

  emit(key) {
    if (!this.events[key]) return;
    let args = arguments.slice(1);

    this.events[key].forEach((fxn) => {
      fxn.apply(this, args);
    })
  }

  once(key, func) {
    this.addListener(key, () => {
      this.removeListener(key, func);
      func.apply(this, arguments);
    })
  }

}