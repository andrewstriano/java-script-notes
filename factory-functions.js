// Factory function pattern
const personFactory = (name, age) => {
  const sayHello = () => console.log("hello!");
  return { name, age, sayHello };
};

const jeff = personFactory("jeff", 27);

console.log(jeff.name); // jeff

jeff.sayHello(); // hello!

const Person2 = function (name, age) {
  // same as above just built using the constructor pattern
  this.sayHello = () => console.log("hello!");
  this.name = name;
  this.age = age;
};

const andrew = new Person2("andrew", 27);

console.log(andrew.name); // andrew
andrew.sayHello(); // hello!

const factory = (param1, param2) => {
  const someFunction = () => console.log("result of function");
  return { param1, param2, someFunction }; // if the name of the properties are exactly the same as the variables youre referencing you can use this object shorthand.
};

const factoryProduct = factory("p1", 69);

console.log(factoryProduct.param1); // p1
console.log(factoryProduct.param2); // 69
factoryProduct.someFunction(); // results of function

// helpful hint!
const name = "maynard";
const color = "red";
const number = 34;
const food = "rice";

console.log(name, color, number, food); // maynard red 34 rice
console.log({ name, color, number, food }); // {name: 'maynard', color: 'red', number: 34, food: 'rice'}

// --------------------------------------------SCOPE-------------------------------------------------

let a = 17;

const func = (x) => {
  let a = x; // it is not 99 because a was re-declared inside this function giving it block-level scope
};

func(99);
console.log(a); // 17

const func2 = (x) => {
  a = x;
};

func2(99);
console.log(a); // 99 because a is a global variable, func2 has access to it, and when 99 is passed it overwrites a.

// ------------------------------------------Private variables and Functions ----------------------

const FactoryFunction = (string) => {
  const capitalizeString = () => string.toUpperCase(); // cant be accessed outside the function
  const printString = () => console.log(`-------${capitalizeString()}-------`); // cant be accessed outside the function
  return { printString }; // can be accessed because this is being returned, making it a public function
};

const taco = FactoryFunction("taco");

// printString(); // error
// capitalizeString(); // error
// taco.capitalizeString(); // error
taco.printString(); // -------TACO------- this works because of the concept of CLOSURE

const counterCreator = () => {
  let count = 0;
  return () => {
    console.log(count);
    count++;
  };
};

const counter = counterCreator(); // this works because the counterCreator function returns a function
// count is defined in the original function thus retaining scope inside that function, but is accessible by our outside counter.
counter(); // 0
counter(); // 1
counter(); // 2
counter(); // 3
counter(); // 4
counter(); // 5

// factories are just a function that returns a usable object to us for later use in our code.

const Player = (name, level) => {
  let health = level * 2;
  const getLevel = () => level;
  const getName = () => name;
  const die = () => {
    console.log(`player ${name} has died`);
  };
  const damage = (x) => {
    health -= x;
    if (health <= 0) {
      die();
    }
  };
  const attack = (enemy) => {
    if (level >= enemy.getLevel()) {
      damage(1);
      console.log(`${name} has damaged enemy ${enemy.getName()}`);
    }
  };
  return { attack, damage, getLevel, getName };
};

const jim = Player("jim", 10);
const badGuy = Player("jeff", 5);

jim.attack(badGuy); // jim has damaged jeff!

// --------------------------------------------------------------------------------Inheritance with factories-----------------------------------------------------------------------

const Person = (name) => {
  const sayName = () => console.log(`my name is ${name}`);
  return { sayName };
};

// if you want something specific do as follows
const Nerd = (name) => {
  // create a person and pull out the sayName function with destructuring assignment syntax
  const { sayName } = Person(name);
  const doSomethingNerdy = () => console.log("nerd stuff");
  return { sayName, doSomethingNerdy };
};

const jefferey = Nerd("jeff");

jefferey.sayName(); // my name is jeff
jefferey.doSomethingNerdy(); // nerd stuff

const Nerd2 = (name) => {
  const prototype = Person(name);
  const doSomethingNerdy = () => console.log("nerd stuff");
  return Object.assign({}, prototype, { doSomethingNerdy }); // Object.assign(target, source, source) this returns the target with all enumerable own properties from the sources.
};

// another example
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj2); // { a: 0, b: { c: 0 } }

const drew = Nerd2("drew");
console.log("dddd");
drew.sayName(); // my name is drew
drew.doSomethingNerdy(); // nerd stuff

// -------------------------------------------------------------------------------------modules--------------------------------------------------------------------------------------

// const calculator = (() => {
//   const add = (a, b) => a + b;
//   const sub = (a, b) => a - b;
//   const mul = (a, b) => a * b;
//   const div = (a, b) => a / b;
//   return {
//     add,
//     sub,
//     mul,
//     div,
//   };
// })();

// console.log(calculator.add(3, 5)); // 8
// console.log(calculator.sub(6, 2)); // 4
// console.log(calculator.mul(14, 5534)); // 77476

function Greeter(name) {
  this.name = name || "John Doe";
}

Greeter.prototype.hello = function hello() {
  return "Hello, my name is " + this.name;
};

var george = new Greeter("George");

var msg = george.hello();

console.log(msg); // Hello, my name is George

// factory function version of the above

const proto = {
  hello() {
    return `hello, my name is ${this.name}`;
  },
};

const greeter = (name) =>
  Object.assign(Object.create(proto), {
    name,
  });

const greg = greeter("greg");

const message = greg.hello();
console.log(message);

const calculator = (() => {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const div = (a, b) => a / b;
  const mul = (a, b) => a * b;
  const mod = (a, b) => a % b;
  const sqr = (a, b) => a ** b;
  return {
    add,
    sub,
    div,
    mul,
    mod,
    sqr,
  };
})();

console.log(calculator.add(1, 2));
console.log(calculator.sub(5, 2));
console.log(calculator.div(10, 2));
console.log(calculator.mul(3, 2));
console.log(calculator.mod(7, 2));
console.log(calculator.sqr(2, 2));
