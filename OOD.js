class Deck {
  constructor() {
    this.deck = [];
    this.reset();
    this.shuffle();
  }

  reset() {
    const suits = ['H', 'S', 'D', 'C'];
    const value = [
      'A', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
    ];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < value.length; j++) {
        this.deck.push(`${suits[i]}-${value[j]}`);
      }
    }
  }
  
  shuffle() {
    for (let i = 0; i < this.deck.length; i++) {
      let random = Math.floor(Math.random() * (i + 1));
      let temp = this.deck[i];
      this.deck[i] = this.deck[random];
      this.deck[random] = temp;
    }
  }

  deal() {
    card = this.deck.pop()
    return card;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
  }
  
  deal(deck) {
    this.hand.push(deck.deal());
    console.log(this.hand);
  }

  discard(card) {
    this.hand.splice(this.hand.indexOf(card), 1);
    console.log(this.hand);
  }
}




/////////////


class Vehicle {
  constructor(year) {
    this.year = year;
  }

  getYear() {
    console.log(`A ${this.year} vehicle`);
  }
}

class Car extends Vehicle {
  constructor(year, make, model) {
    super();
    this.year = year;
    this.make = make;
    this.model = model;
    this.type = 'car';
  }

  vehicleType() {
    console.log(`A ${this.year} ${this.make} ${this.model} ${this.type}`);
  }
}

class Motorcycle extends Vehicle {
  constructor(year, make, model) {
    super();
    this.year = year;
    this.make = make;
    this.model = model;
    this.type = 'motorcycle';
  }

  vehicleType() {
    console.log(`A ${this.year} ${this.make} ${this.model} ${this.type}`);
  }
}





//////



class Stack {
  constructor() {
    this.size = 0;
    this.storage = {};
  }

  peek() {
    if (this.size > 0) {
      return this.storage[this.size];
    }
  }

  pop() {
    this.size--;
    let output = this.peek();
    delete this.storage[this.size];
    return output;
  }

  push(data) {
    this.size++;
    this.storage[this.size] = data;
  }
}

class MaxStack extends Stack {
  constructor() {
    super();
    this.maxStack = new Stack();
  }

  push(value) {
    if (value >= this.max()) {
      this.maxStack.push(value);
    }

    super.push(value);
  }

  pop() {
    const value = super.pop();
    if (value === this.max()) {
      this.maxStack.pop();
    }

    return value;
  }

  max() {
    if (this.size === 0) { 
      return -Infinity;
    } else {
      return this.maxStack.peek();
    }
  }
}