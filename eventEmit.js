class eventEmitter {
  constructor() {
    this.events = {};
  }

  addListener(key, func) {
    if (typeof func !== 'function') { return; }
    if (!this.events[key]) { this.events[key] = []; }
    this.events[key].push(func);
    
  }

  removeListener(key, func) {
    if (typeof func !== 'function' || !this.events[key]) { return; }
    if (!this.events[key]) { return }
    this.events[key] = this.events[key].filter((fxn) => {
      return func.toString() !== fxn.toString();
    });
  }

  removeAllListeners() {
    this.events = {};
  }

  emit(key) {
    if (!this.events[key]) { return; }
    let args = [];
    for (let k in arguments) {
      if (k > 0) { args.push(arguments[k]) }
    }
    this.events[key].forEach((fxn) => {
      fxn.apply(this, args);
    })
  }

  once(key, func) {
    this.addListener(key, () => {
      this.removeListener(key, func);
      func.apply(this, arguments) ;
    })
  }

  listeners(key) {
    return this.events[key] ? this.events[key] : [];
  }
}