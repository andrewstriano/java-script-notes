// the best way to create objects that will need to be duplicated is by using an object constructor
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function () {
    console.log(name);
  };
}

// first you create a constructor function like above.
// then you can call it using the new keyword.

const player = new Player("steve", "X");
const player2 = new Player("Andrew", "O");
console.log(player.name);
console.log(player2.name);
console.log(Object.keys(player2), Object.values(player2));

player2.sayName(); // you can create functions in the object constructor as well. This returns "Andrew"

// create an object constructor for making book objects. needs to contain title, author, number of pages and if you read it or not

function Book(title, author, numberOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.haveRead = haveRead;
  this.info = function () {
    return `${title} by ${author}, ${numberOfPages}, ${haveRead}`;
  };
  this.prototype = Object.prototype;
}
const theTower = new Book("The Tower", "Kelly Cordes", 400, "have not read");
console.log(theTower.info()); // => "The Tower by Kelly Cordes, 400, have not read"

// every javascript function has a prototype property that is empty by default
// you can attach properties and methods to this to implement inheritance

function Plant() {
  this.country = "Mexico";
  this.isOrganic = true;
}

// Add the showNameAndColor method to the Plant prototype property
Plant.prototype.showNameAndColor = function () {
  console.log(`I am a ${this.name} and my color is ${this.color}`);
};

// Add the amIOrganic method to the Plant prototype property
Plant.prototype.amIOrganic = function () {
  if (this.isOrganic) console.log("I am organic, Baby!");
};

function Fruit(fruitName, fruitColor) {
  this.name = fruitName;
  this.color = fruitColor;
}

// Set the Fruit's prototype to Plant's constructor, thus inheriting all of Plant.prototype methods and properties.
Fruit.prototype = new Plant();

// Creates a new object, aBanana, with the Fruit constructor
const aBanana = new Fruit("Banana", "Yellow");

// Here, aBanana uses the name property from the aBanana object prototype, which is Fruit.prototype:
console.log(aBanana.name); // Banana

// Uses the showNameAndColor method from the Fruit object prototype, which is Plant.prototype. The aBanana object inherits all the properties and methods from both the Plant and Fruit functions.
console.log(aBanana.showNameAndColor()); // I am a Banana and my color is yellow.

const myFriends = { name: "Pete" };

// To find the name property below, the search will begin directly on the myFriends object and will immediately find the name property because we defined the property name on the myFriend object. This could be thought of as a prototype chain with one link.
console.log(myFriends.name);

// In this example, the search for the toString () method will also begin on the myFriends’ object, but because we never created a toString method on the myFriends object, the compiler will then search for it on the myFriends prototype (the object which it inherited its properties from).

// And since all objects created with the object literal inherits from Object.prototype, the toString method will be found on Object.prototype—see important note below for all properties inherited from Object.prototype.

myFriends.toString();

// All objects in JavaScript inherit properties and methods from Object.prototype. These inherited properties and methods are constructor, hasOwnProperty (), isPrototypeOf (), propertyIsEnumerable (), toLocaleString (), toString (), and valueOf ()

// In JavaScript, all objects have a hidden [[Prototype]] property that’s either another object or null.

// We can use obj.__proto__ to access it (a historical getter/setter, there are other ways, to be covered soon).

// The object referenced by [[Prototype]] is called a “prototype”.

// If we want to read a property of obj or call a method, and it doesn’t exist, then JavaScript tries to find it in the prototype.

// Write/delete operations act directly on the object, they don’t use the prototype (assuming it’s a data property, not a setter).

// If we call obj.method(), and the method is taken from the prototype, this still references obj. So methods always work with the current object even if they are inherited.

// The for..in loop iterates over both its own and its inherited properties. All other key/value-getting methods only operate on the object itself.

function Student(name, grade) {
  this.name = name;
  this.grade = grade;
}
// Constructor for student objects

Student.prototype.sayName = function () {
  console.log(this.name);
};
Student.prototype.goToProm = function () {
  console.log("Go to Prom???");
};

// both of these functions are defined directly on the prototype of the Student object. This is better
// then doing it directly inside of the constructor because this one instance of this function is
// shared between all the student objects instead of being created in every iteration of Student.

const person = {
  isHuman: false,
  printIntroduction() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  },
};
const me = Object.create(person);
me.name = "Andrew"; // name is a prop set on me but not human
me.isHuman = true; // inherited props can be overwrtitten.

me.printIntroduction();

function Student() {}
// just an empty constructor of Student Objs

Student.prototype.sayName = function () {
  console.log(this.name);
};
// defining a function on Students Proto

function EighthGrader(name) {
  (this.name = name), (this.grade = 8);
}

EighthGrader.prototype = Object.create(Student.prototype);
// this is setting EG proto to a NEW empty OBJ with its proto pointed to Students proto.
// this set EG up for inheritance without creating issues with overwriting the original
// objects properties.

const carl = new EighthGrader("carl");
carl.sayName(); // console.logs carl

let a = 17;

const func = (x) => {
  let a;
  a = x;
  return a;
};

func(99);

console.log(a);

const Person = (name) => {
  const sayName = () => console.log(`my name is ${name}`);
  return { sayName };
};

const Nerd = (name) => {
  // simply create a person and pull out the sayName function with destructuring assignment syntax!
  const { sayName } = Person(name);
  const doSomethingNerdy = () => console.log("nerd stuff");
  return { sayName, doSomethingNerdy };
};

const jeff = Nerd("jeff");

// const Nerd = (name) => {
//   const prototype = Person(name);
//   const doSomethingNerdy = () => console.log("nerd stuff");
//   return Object.assign({}, prototype, { doSomethingNerdy });
// };
