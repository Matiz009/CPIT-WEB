# JavaScript: Global DOM Objects & Function Types
### A Complete Teaching Guide with Interview Questions

---

## PART 1 — GLOBAL DOM OBJECTS

> The browser gives JavaScript a set of **built-in global objects** the moment a page loads. You don't import them. They just exist.

---

### 1. `window` — The God Object

`window` is the **global scope** in the browser. Every global variable, function, and object lives inside it.

```javascript
window.alert("Hello");     // same as → alert("Hello")
window.console.log("Hi"); // same as → console.log("Hi")

var name = "Mati";
console.log(window.name); // "Mati" — all var declarations go on window
```

**Key properties & methods:**
```javascript
window.innerWidth      // viewport width
window.innerHeight     // viewport height
window.location        // current URL info
window.history         // browser history
window.navigator       // device/browser info
window.localStorage    // persistent storage
window.sessionStorage  // session-only storage
window.setTimeout()    // delay execution
window.setInterval()   // repeated execution
window.fetch()         // make HTTP requests
window.open()          // open new tab/window
window.close()         // close window
```

**Why it matters:**
- It's the root of everything in the browser environment
- Helps you understand why `var` leaks into global scope
- `let` and `const` do NOT attach to `window`

```javascript
var x = 10;
let y = 20;

console.log(window.x); // 10
console.log(window.y); // undefined ← important!
```

---

### 2. `document` — The DOM Entry Point

`document` represents the **entire HTML page**. It's your main tool to read and manipulate the DOM.

```javascript
document.title           // page title
document.URL             // current URL
document.body            // <body> element
document.head            // <head> element
document.documentElement // <html> element
document.cookie          // cookies
document.readyState      // "loading" | "interactive" | "complete"
```

**Selecting elements:**
```javascript
document.getElementById("id")
document.getElementsByClassName("class")   // HTMLCollection
document.getElementsByTagName("tag")       // HTMLCollection
document.querySelector(".box")             // first match
document.querySelectorAll(".box")          // NodeList
```

**Creating & modifying:**
```javascript
const el = document.createElement("div");
document.body.appendChild(el);
document.body.removeChild(el);
document.body.innerHTML = "<p>Hello</p>"; // dangerous with user input (XSS)
```

**Why it matters:**
- Without `document`, you can't touch the HTML
- It's the bridge between JavaScript logic and visible UI

---

### 3. `navigator` — Browser & Device Info

```javascript
navigator.userAgent        // browser info string
navigator.language         // user's language "en-US"
navigator.onLine           // true/false — network status
navigator.geolocation      // GPS location API
navigator.platform         // "Win32", "Linux", "MacIntel"
navigator.cookieEnabled    // true/false
```

**Real use case:**
```javascript
// Check if user is online
if (!navigator.onLine) {
    showOfflineMessage();
}

// Get GPS location
navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords.latitude, pos.coords.longitude);
});
```

---

### 4. `location` — URL Control

```javascript
location.href        // full URL
location.hostname    // "www.example.com"
location.pathname    // "/about"
location.search      // "?id=5&name=mati"
location.hash        // "#section2"
location.protocol    // "https:"

location.reload()          // refresh the page
location.assign("url")     // navigate to URL (adds to history)
location.replace("url")    // navigate (NO history entry)
```

**Real use case:**
```javascript
// Read query parameters
const params = new URLSearchParams(location.search);
const id = params.get("id"); // "5"
```

---

### 5. `history` — Browser Navigation

```javascript
history.back()         // go back
history.forward()      // go forward
history.go(-2)         // go 2 pages back
history.length         // number of history entries

// Modern SPA routing
history.pushState({page: 1}, "title", "/about");    // changes URL, no reload
history.replaceState({page: 2}, "title", "/home");  // replaces current entry
```

**Why it matters:** This is how Single Page Applications (SPAs) like React Router fake navigation without reloading the page.

---

### 6. `localStorage` & `sessionStorage`

```javascript
// localStorage — persists after browser closes
localStorage.setItem("user", "Mati");
localStorage.getItem("user");    // "Mati"
localStorage.removeItem("user");
localStorage.clear();

// sessionStorage — clears when tab closes
sessionStorage.setItem("token", "abc123");
```

**Storing objects:**
```javascript
// Must serialize to JSON
localStorage.setItem("settings", JSON.stringify({ theme: "dark" }));
const settings = JSON.parse(localStorage.getItem("settings"));
```

| | `localStorage` | `sessionStorage` | `cookie` |
|---|---|---|---|
| Expires | Never | Tab close | Custom |
| Size | ~5MB | ~5MB | ~4KB |
| Sent to server | ❌ | ❌ | ✅ |

---

### 7. `console` — Your Debug Partner

```javascript
console.log("basic output")
console.warn("yellow warning")
console.error("red error")
console.table([{name: "Mati"}, {name: "Ali"}])  // renders a table
console.group("Group")                           // collapsible group
console.groupEnd()
console.time("timer")                            // start timer
console.timeEnd("timer")                         // stop & print ms
console.clear()
```

---

### 8. `screen` — Physical Display Info

```javascript
screen.width       // actual screen resolution width
screen.height      // actual screen resolution height
screen.availWidth  // usable width (minus taskbar)
```

---

### 9. `event` (Global Event Object)

Available inside any event handler:
```javascript
document.addEventListener("click", function(event) {
    event.target        // element clicked
    event.type          // "click"
    event.preventDefault()   // stop default behavior
    event.stopPropagation()  // stop bubbling
    event.clientX            // mouse X position
    event.key                // keyboard key pressed
});
```

---

## PART 2 — ALL TYPES OF FUNCTIONS IN JAVASCRIPT

> JavaScript has more ways to write functions than almost any other language. Each type exists for a reason.

---

### 1. Function Declaration

```javascript
function greet(name) {
    return "Hello, " + name;
}

greet("Mati"); // "Hello, Mati"
```

**Key trait: HOISTED**
```javascript
sayHi(); // ✅ works — hoisted to top of scope

function sayHi() {
    console.log("Hi!");
}
```

**When to use:** Top-level utility functions, reusable named logic, anything you want hoisted.

---

### 2. Function Expression

```javascript
const greet = function(name) {
    return "Hello, " + name;
};
```

**Key trait: NOT hoisted**
```javascript
greet(); // ❌ TypeError: greet is not a function

const greet = function() { console.log("Hi!"); };
```

**When to use:** Assigning functions to variables, passing as callbacks, conditional function assignment.

---

### 3. Arrow Function

```javascript
const greet = (name) => "Hello, " + name;

// Multi-line
const greet = (name) => {
    const msg = "Hello, " + name;
    return msg;
};
```

**Key trait: No own `this`** — inherits `this` from surrounding scope

```javascript
// Problem with regular function
const obj = {
    name: "Mati",
    greet: function() {
        setTimeout(function() {
            console.log(this.name); // ❌ undefined — 'this' is window
        }, 1000);
    }
};

// Fixed with arrow function
const obj = {
    name: "Mati",
    greet: function() {
        setTimeout(() => {
            console.log(this.name); // ✅ "Mati" — arrow inherits 'this'
        }, 1000);
    }
};
```

**Cannot be used as constructors:**
```javascript
const Person = (name) => { this.name = name; };
new Person("Mati"); // ❌ TypeError: Person is not a constructor
```

**When to use:** Callbacks, array methods (`.map`, `.filter`, `.reduce`), preserving `this` context.

---

### 4. Anonymous Function

A function **without a name**, usually used inline.

```javascript
setTimeout(function() {
    console.log("Runs after 1s");
}, 1000);

[1, 2, 3].map(function(n) { return n * 2; });
```

**When to use:** One-off callbacks where naming adds no value.

---

### 5. IIFE — Immediately Invoked Function Expression

```javascript
(function() {
    const secret = "hidden";
    console.log("Runs immediately!");
})();

// Arrow IIFE
(() => {
    console.log("Also runs immediately!");
})();
```

**Why it exists:** Creates a **private scope** — variables inside don't leak to global.

```javascript
// Classic module pattern before ES6 modules
const Counter = (function() {
    let count = 0; // private

    return {
        increment: () => ++count,
        decrement: () => --count,
        value: () => count
    };
})();

Counter.increment(); // 1
Counter.increment(); // 2
console.log(count);  // ❌ ReferenceError — count is private
```

**When to use:** Isolating code, avoiding global pollution, module patterns.

---

### 6. Higher-Order Function

A function that **takes a function as argument** OR **returns a function**.

```javascript
// Takes a function
function doTwice(fn) {
    fn();
    fn();
}
doTwice(() => console.log("Hello")); // prints Hello twice

// Returns a function
function multiplier(factor) {
    return (number) => number * factor;
}
const double = multiplier(2);
const triple = multiplier(3);

double(5); // 10
triple(5); // 15
```

Built-in HOFs you use every day:
```javascript
[1,2,3].map(n => n * 2)          // returns new array
[1,2,3].filter(n => n > 1)       // filters elements
[1,2,3].reduce((acc, n) => acc + n, 0) // reduces to single value
[1,2,3].forEach(n => console.log(n))   // side effects only
```

---

### 7. Callback Function

A function **passed as an argument** to be called later.

```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { user: "Mati" };
        callback(data); // called when ready
    }, 2000);
}

fetchData(function(data) {
    console.log(data.user); // "Mati"
});
```

**Callback Hell — the problem:**
```javascript
getUser(id, function(user) {
    getPosts(user.id, function(posts) {
        getComments(posts[0].id, function(comments) {
            // 😵 deeply nested — hard to read and maintain
        });
    });
});
```

**Solution:** Promises → async/await (see below)

---

### 8. Recursive Function

A function that **calls itself** until a base condition is met.

```javascript
function factorial(n) {
    if (n <= 1) return 1;       // base case — MUST exist
    return n * factorial(n - 1); // recursive call
}

factorial(5); // 5 × 4 × 3 × 2 × 1 = 120
```

**Real use case — traverse nested objects:**
```javascript
function countKeys(obj) {
    let count = 0;
    for (let key in obj) {
        count++;
        if (typeof obj[key] === "object") {
            count += countKeys(obj[key]); // recurse into nested objects
        }
    }
    return count;
}
```

**Warning:** Always have a base case. Without it → Stack Overflow error.

---

### 9. Pure Function

A function with **no side effects** that always returns the same output for the same input.

```javascript
// ✅ Pure
function add(a, b) {
    return a + b;
}

// ❌ Impure — modifies external state
let total = 0;
function addToTotal(n) {
    total += n; // side effect
}
```

**Why it matters:**
- Predictable — easy to test
- No hidden bugs from shared state
- Foundation of functional programming

---

### 10. Generator Function

A function that can **pause and resume** execution using `yield`.

```javascript
function* count() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = count();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
```

**Real use case — infinite sequence:**
```javascript
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const gen = idGenerator();
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3 ... never ends, but doesn't crash
```

---

### 11. Async Function

Syntactic sugar over Promises. Makes async code look synchronous.

```javascript
async function getUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error);
    }
}
```

**async always returns a Promise:**
```javascript
async function hello() {
    return "hi";
}

hello(); // Promise { "hi" }
hello().then(val => console.log(val)); // "hi"
```

**When to use:** Any time you're working with APIs, file reads, database calls, or anything time-based.

---

### 12. Constructor Function (Old OOP style)

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        return `Hi, I'm ${this.name}`;
    };
}

const mati = new Person("Mati", 25);
mati.greet(); // "Hi, I'm Mati"
```

**Modern equivalent — ES6 Class:**
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return `Hi, I'm ${this.name}`;
    }
}
```

---

### 13. Closure

A function that **remembers variables from its outer scope** even after that scope is gone.

```javascript
function makeCounter() {
    let count = 0; // private to outer scope

    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
counter(); // 3

// count is inaccessible from outside — that's the power
```

**Classic real-world use:**
```javascript
function createMultiplier(factor) {
    return (n) => n * factor; // remembers 'factor'
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
double(10); // 20
triple(10); // 30
```

---

### Quick Reference Table

| Type | Hoisted | Own `this` | Returns | Best For |
|---|---|---|---|---|
| Declaration | ✅ Yes | ✅ Yes | Any | Utility functions |
| Expression | ❌ No | ✅ Yes | Any | Conditionals, callbacks |
| Arrow | ❌ No | ❌ No | Any | Callbacks, `.map/.filter` |
| IIFE | ❌ No | ✅ Yes | Any | Isolated scopes |
| Async | ❌ No | ✅ Yes | Promise | API calls |
| Generator | ❌ No | ✅ Yes | Iterator | Lazy sequences |
| Recursive | — | — | Any | Tree/nested structures |
| Constructor | ❌ No | ✅ Yes | Object | OOP patterns |

---

## PART 3 — INTERVIEW QUESTIONS

### DOM Objects — Interview Questions

**Beginner**

1. What is the difference between `window` and `document`?
2. How do you get the current URL in JavaScript?
3. What is `localStorage` and how is it different from `sessionStorage`?
4. How do you redirect a user to another page using JavaScript?
5. What does `navigator.onLine` return?

**Intermediate**

6. Why does `var` attach to `window` but `let` and `const` don't?
7. What's the difference between `location.assign()` and `location.replace()`?
8. How would you store an object in `localStorage`?
9. What is `history.pushState()` and why do SPAs need it?
10. What is the difference between `screen.width` and `window.innerWidth`?

**Advanced**

11. How does `event.stopPropagation()` differ from `event.preventDefault()`?
12. What are the security risks of using `document.innerHTML` with user input?
13. If `window` is the global object, what happens when you run JavaScript in Node.js — is `window` still available?
14. How would you build a simple router using `history.pushState`?
15. Explain how you'd use `window.postMessage` for cross-origin communication.

---

### Functions — Interview Questions

**Beginner**

1. What is the difference between a function declaration and a function expression?
2. What does "hoisting" mean in the context of functions?
3. What is an arrow function and how is it different from a regular function?
4. What is a callback function? Give a real example.
5. What is a higher-order function?

**Intermediate**

6. What is a closure? Write a function that uses one.
7. What is an IIFE and why would you use it?
8. What does `async/await` do under the hood?
9. What is the difference between `.map()`, `.filter()`, and `.reduce()`?
10. Why can't you use an arrow function as a constructor?

**Advanced**

11. What is a generator function? When would you use it over a regular function?
12. Explain the difference between a pure function and an impure function. Why does it matter?
13. What is function currying? Write an example.
    ```javascript
    // Expected behavior:
    add(2)(3); // 5
    add(2)(3)(4); // 9
    ```
14. What is the difference between `call()`, `apply()`, and `bind()`?
15. How does JavaScript's call stack behave with recursive functions? What causes a Stack Overflow?

---

### Bonus: Trick Questions

```javascript
// Q1: What does this output and why?
const obj = {
    name: "Mati",
    getName: () => this.name
};
console.log(obj.getName()); // ???
// Answer: undefined — arrow functions don't have own 'this'

// Q2: What does this output?
console.log(typeof null);   // ???
// Answer: "object" — famous JS bug, never fixed for backward compatibility

// Q3: What's the output?
(function() {
    var x = 1;
})();
console.log(x); // ???
// Answer: ReferenceError — x is scoped inside the IIFE

// Q4: What's the output?
const double = (n) => n * 2;
const triple = (n) => n * 3;

function compose(f, g) {
    return (x) => f(g(x));
}

const sextuple = compose(double, triple);
sextuple(5); // ???
// Answer: 30 — triple(5) = 15, double(15) = 30
```

---

## Summary

| Topic | Key Takeaway |
|---|---|
| `window` | Root global object — everything lives here |
| `document` | Entry point to the DOM |
| `navigator` | Device/browser info |
| `location` | URL reading and navigation |
| `history` | Back/forward, SPA routing |
| `localStorage` | Client-side persistent data |
| Declaration | Hoisted — available before definition |
| Arrow | No `this` — ideal for callbacks |
| Closure | Private state — remembers outer scope |
| IIFE | Immediate + isolated — no global pollution |
| Async | Cleaner alternative to callback hell |
| Generator | Pause/resume — lazy evaluation |
| Pure Function | Predictable, testable, no side effects |

---

*Prepared for ICT Students — Web Development Module*
