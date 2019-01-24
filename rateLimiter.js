function rateLimiter(fxn, max, delay) {
  let running = 0;
  let count = 0;
  function run() {
    let past = new Date();
    if (running >= max) { return; }
    running++;
    fxn
    .then(() => {
      count++;
      console.log(count);
      let now = new Date();
      running--;
      if (now - past > delay) {
        run();
      } else {
        setTimeout(() => {
          run();
        }, delay - (now - past))
      }

    })
  }
  
  while(running < max) {
    run();
  }
}

function Promisify() {
  return new Promise((resolve, reject) => {
    https
    .get(`https://jsonmock.hackerrank.com/api/movies/search/?Title=a`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data = JSON.parse(chunk.toString()) });
      res.on('end', () => { resolve(data) });
    }).on('error', (err) => { reject(err) });
  });
}