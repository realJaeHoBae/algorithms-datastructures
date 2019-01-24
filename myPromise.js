class MyPromise {
  constructor(fxn) {
    this.val = null;
    this.thenCallback = [];
    this.catchCallback = null;
    this.finallyCallback = null;

    fxn(resolve.bind(this), reject.bind(this));

    function resolve(value) {
      this.val = value;
      this.thenCallback.forEach((func) => {
        if (typeof func === 'function') {
          func(this.val);
        }
      })
      
      if (typeof this.finallyCallback === 'function') {
        this.finallyCallback(this.val);
      }
    }

    function reject(value) {
      this.value = value;

      if (typeof this.catchCallback === 'function') {
        this.catchCallback(this.val);
      }

      if (typeof this.finallyCallback === 'function') {
        this.finallyCallback(this.val);
      }
    }
  }

  then(fxn) {
    this.thenCallback.push(fxn);
    return this;
  }

  catch(fxn) {
    this.catchCallback = fxn;
    return this;
  }

  finally(fxn) {
    this.finallyCallback = fxn;
    return this;
  }
}