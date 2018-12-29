/**
 * Initialize your data structure here.
 */
var HitCounter = function() {
  this.hash = new Map();
};

/**
 * Record a hit.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function(timestamp) {
  this.hash.set(timestamp, this.hash.get(timestamp) + 1 || 1);
};

/**
 * Return the number of hits in the past 5 minutes.
        @param timestamp - The current timestamp (in seconds granularity). 
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function(timestamp) {
  let hits = 0;
  this.hash.forEach((val, key) => {
    if (key > timestamp - 300 && key <= timestamp) {
      hits += val;
    }
  })
  return hits;
};

/** 
 * Your HitCounter object will be instantiated and called as such:
 * var obj = Object.create(HitCounter).createNew()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */