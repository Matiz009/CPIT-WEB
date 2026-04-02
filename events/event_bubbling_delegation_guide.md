# 🫧 Beginner's Guide to Event Bubbling & Event Delegation

> A friendly, hands-on introduction for students learning JavaScript DOM events.

---

## 📌 Table of Contents

1. [What is a DOM Event?](#what-is-a-dom-event)
2. [Event Propagation — The Big Picture](#event-propagation)
3. [Event Bubbling](#event-bubbling)
4. [Event Capturing](#event-capturing)
5. [Stopping Propagation](#stopping-propagation)
6. [Event Delegation](#event-delegation)
7. [Real-World Use Cases](#real-world-use-cases)
8. [Common Mistakes](#common-mistakes)
9. [Quick Reference Cheat Sheet](#cheat-sheet)

---

## 1. What is a DOM Event? <a name="what-is-a-dom-event"></a>

A **DOM event** is a signal that something has happened in the browser — a user clicked a button, hovered over an image, pressed a key, or submitted a form.

You "listen" for these events using `addEventListener`.

```html
<button id="myBtn">Click Me!</button>

<script>
  const btn = document.getElementById("myBtn");

  btn.addEventListener("click", function () {
    console.log("Button was clicked!");
  });
</script>
```

> ✅ **Key Terms:**
> - **Event** — Something that happens (click, keypress, scroll…)
> - **Event Listener** — The function that responds to the event
> - **Event Target** — The element the event happened on

---

## 2. Event Propagation — The Big Picture <a name="event-propagation"></a>

When an event fires on an element, it doesn't just stay there. It **travels** through the DOM in three phases:

```
┌──────────────────────────────────────┐
│              document                │  ← Phase 1: Capturing (top → down)
│   ┌──────────────────────────────┐   │
│   │            body              │   │
│   │   ┌──────────────────────┐   │   │
│   │   │        div           │   │   │
│   │   │   ┌──────────────┐   │   │   │
│   │   │   │    button    │ ← │   │   │  ← Phase 2: Target
│   │   │   └──────────────┘   │   │   │
│   │   └──────────────────────┘   │   │
│   └──────────────────────────────┘   │
└──────────────────────────────────────┘
                                ↑
                Phase 3: Bubbling (bottom → up)
```

| Phase | Direction | Description |
|-------|-----------|-------------|
| **Capturing** | Top → Down | Event travels from `document` down to the target |
| **Target** | At element | Event reaches the element that was clicked |
| **Bubbling** | Bottom → Up | Event travels back up to `document` |

By default, event listeners fire during the **bubbling phase**.

---

## 3. Event Bubbling <a name="event-bubbling"></a>

**Bubbling** means: when an event fires on a child element, it "bubbles up" through all its parent elements, triggering their listeners too.

### 🔬 Example

```html
<div id="grandparent">
  Grandparent
  <div id="parent">
    Parent
    <button id="child">Click Me!</button>
  </div>
</div>

<script>
  document.getElementById("grandparent").addEventListener("click", () => {
    console.log("Grandparent clicked!");
  });

  document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent clicked!");
  });

  document.getElementById("child").addEventListener("click", () => {
    console.log("Child (button) clicked!");
  });
</script>
```

### 📋 Output when the button is clicked:

```
Child (button) clicked!
Parent clicked!
Grandparent clicked!
```

> ⚡ The event starts at the button, then "bubbles up" to parent → grandparent.

### 🎯 How to check which element was originally clicked

The **`event.target`** always refers to the element that was originally clicked (the origin), while **`this`** / **`event.currentTarget`** refers to the element whose listener is currently running.

```html
<div id="container">
  <button>Button A</button>
  <button>Button B</button>
</div>

<script>
  document.getElementById("container").addEventListener("click", function (event) {
    console.log("Target (originally clicked):", event.target.tagName);
    console.log("Current Target (listener is on):", event.currentTarget.id);
  });
</script>
```

---

## 4. Event Capturing <a name="event-capturing"></a>

Capturing is the **opposite** of bubbling — the event travels **from the top down** before reaching the target.

To listen during the capturing phase, pass `true` as the third argument to `addEventListener`:

```html
<div id="outer">
  Outer
  <div id="inner">
    Inner
    <button id="btn">Click</button>
  </div>
</div>

<script>
  // Capturing phase (fires first, top → down)
  document.getElementById("outer").addEventListener(
    "click",
    () => console.log("Outer - CAPTURING"),
    true  // 👈 true = capturing phase
  );

  // Bubbling phase (fires second, bottom → up)
  document.getElementById("outer").addEventListener(
    "click",
    () => console.log("Outer - BUBBLING"),
    false // 👈 false (default) = bubbling phase
  );

  document.getElementById("btn").addEventListener("click", () => {
    console.log("Button clicked!");
  });
</script>
```

### 📋 Output:

```
Outer - CAPTURING
Button clicked!
Outer - BUBBLING
```

> 💡 **Tip:** Capturing is rarely used in practice. Bubbling is the default and most common pattern.

---

## 5. Stopping Propagation <a name="stopping-propagation"></a>

Sometimes you want an event to **stop bubbling** so parent elements don't react to it.

### `event.stopPropagation()`

```html
<div id="parent">
  Parent
  <button id="child">Click Me</button>
</div>

<script>
  document.getElementById("parent").addEventListener("click", () => {
    console.log("Parent clicked!"); // Will NOT run
  });

  document.getElementById("child").addEventListener("click", (event) => {
    event.stopPropagation(); // 🛑 Stop bubbling here!
    console.log("Child clicked! Bubble stopped.");
  });
</script>
```

### 📋 Output:

```
Child clicked! Bubble stopped.
```

### `event.preventDefault()`

This is **different** from `stopPropagation`. It prevents the browser's **default behaviour** (like a link navigating to a URL, or a form submitting), but does **not** stop bubbling.

```html
<a id="myLink" href="https://example.com">Click me</a>

<script>
  document.getElementById("myLink").addEventListener("click", (event) => {
    event.preventDefault(); // 🚫 Don't follow the link
    console.log("Link clicked, but navigation prevented!");
  });
</script>
```

| Method | What it does |
|--------|-------------|
| `stopPropagation()` | Stops the event from bubbling up (or capturing down) |
| `preventDefault()` | Prevents the browser's default action |
| `stopImmediatePropagation()` | Stops bubbling AND prevents other listeners on the same element |

---

## 6. Event Delegation <a name="event-delegation"></a>

**Event Delegation** is a powerful pattern that uses bubbling to your advantage.

### 💡 The idea:
Instead of attaching an event listener to **every child element**, attach **one listener to a parent** and let the event bubble up. Then check which child was clicked using `event.target`.

### ❌ Without Event Delegation (Bad Practice)

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
  // Attaching a listener to EVERY li — inefficient!
  const items = document.querySelectorAll("li");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("Clicked:", item.textContent);
    });
  });
</script>
```

> ⚠️ **Problem:** If you add a new `<li>` dynamically, it won't have a listener!

### ✅ With Event Delegation (Best Practice)

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
  const list = document.getElementById("list");

  // One listener on the parent <ul>
  list.addEventListener("click", (event) => {
    // Check that the click actually came from an <li>
    if (event.target.tagName === "LI") {
      console.log("Clicked:", event.target.textContent);
    }
  });

  // Dynamically added items still work! 🎉
  const newItem = document.createElement("li");
  newItem.textContent = "Item 4 (added dynamically)";
  list.appendChild(newItem);
</script>
```

> ✅ Now even dynamically added `<li>` elements respond to clicks — no extra listeners needed!

---

## 7. Real-World Use Cases <a name="real-world-use-cases"></a>

### 🛒 Use Case 1: Shopping Cart — Delete Buttons

```html
<div id="cart">
  <div class="cart-item" data-id="101">
    Laptop <button class="remove-btn">Remove</button>
  </div>
  <div class="cart-item" data-id="102">
    Phone <button class="remove-btn">Remove</button>
  </div>
  <div class="cart-item" data-id="103">
    Headphones <button class="remove-btn">Remove</button>
  </div>
</div>

<script>
  document.getElementById("cart").addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      // Find the parent cart item
      const item = event.target.closest(".cart-item");
      const itemId = item.dataset.id;

      console.log(`Removing item with ID: ${itemId}`);
      item.remove(); // Remove the item from the DOM
    }
  });
</script>
```

---

### 📋 Use Case 2: Dynamic Todo List

```html
<input id="taskInput" type="text" placeholder="Add a task..." />
<button id="addBtn">Add Task</button>
<ul id="todoList"></ul>

<script>
  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const list = document.getElementById("todoList");

  // Add new tasks
  addBtn.addEventListener("click", () => {
    if (input.value.trim() === "") return;

    const li = document.createElement("li");
    li.innerHTML = `${input.value} <button class="done-btn">✅ Done</button>`;
    list.appendChild(li);
    input.value = "";
  });

  // ONE delegated listener handles ALL done buttons (even future ones!)
  list.addEventListener("click", (event) => {
    if (event.target.classList.contains("done-btn")) {
      const task = event.target.parentElement;
      task.style.textDecoration = "line-through";
      task.style.color = "gray";
    }
  });
</script>
```

---

### 🗂️ Use Case 3: Accordion / FAQ Menu

```html
<div id="faq">
  <div class="faq-item">
    <h3 class="question">What is JavaScript?</h3>
    <p class="answer" style="display:none">JavaScript is a programming language for the web.</p>
  </div>
  <div class="faq-item">
    <h3 class="question">What is the DOM?</h3>
    <p class="answer" style="display:none">The DOM is a programming interface for web documents.</p>
  </div>
  <div class="faq-item">
    <h3 class="question">What is event bubbling?</h3>
    <p class="answer" style="display:none">It's when an event propagates from child to parent elements.</p>
  </div>
</div>

<script>
  // One listener on the FAQ container handles all questions
  document.getElementById("faq").addEventListener("click", (event) => {
    if (event.target.classList.contains("question")) {
      const answer = event.target.nextElementSibling;
      answer.style.display = answer.style.display === "none" ? "block" : "none";
    }
  });
</script>
```

---

### 🧭 Use Case 4: Navigation Menu Highlighting

```html
<nav id="navbar">
  <a href="#home" class="nav-link">Home</a>
  <a href="#about" class="nav-link">About</a>
  <a href="#projects" class="nav-link">Projects</a>
  <a href="#contact" class="nav-link">Contact</a>
</nav>

<script>
  document.getElementById("navbar").addEventListener("click", (event) => {
    if (event.target.classList.contains("nav-link")) {
      event.preventDefault();

      // Remove active class from all links
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.remove("active");
      });

      // Highlight the clicked link
      event.target.classList.add("active");
    }
  });
</script>
```

---

## 8. Common Mistakes <a name="common-mistakes"></a>

### ❌ Mistake 1: Forgetting to check `event.target`

```javascript
// ❌ Wrong — fires even if you click the empty space inside the ul
list.addEventListener("click", (event) => {
  console.log("Item clicked:", event.target.textContent);
});

// ✅ Correct — check the target is actually an <li>
list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("Item clicked:", event.target.textContent);
  }
});
```

---

### ❌ Mistake 2: Confusing `event.target` vs `event.currentTarget`

```javascript
document.getElementById("parent").addEventListener("click", (event) => {
  console.log(event.target);        // The element that was ACTUALLY clicked
  console.log(event.currentTarget); // The element the listener is ATTACHED to
});
```

---

### ❌ Mistake 3: Using `stopPropagation` everywhere

Overusing `stopPropagation` can break delegation patterns and make debugging painful. Only use it when truly necessary.

---

### ❌ Mistake 4: Forgetting that not all events bubble

Some events **do not bubble**: `focus`, `blur`, `mouseenter`, `mouseleave`. Use their bubbling equivalents instead:

| Non-bubbling | Bubbling alternative |
|---|---|
| `focus` | `focusin` |
| `blur` | `focusout` |
| `mouseenter` | `mouseover` |
| `mouseleave` | `mouseout` |

---

## 9. Quick Reference Cheat Sheet <a name="cheat-sheet"></a>

```
EVENT BUBBLING
──────────────
- Events bubble UP from child → parent → document (by default)
- event.target     = element originally clicked
- event.currentTarget = element whose listener is running
- event.stopPropagation() = stop the bubble

EVENT CAPTURING
───────────────
- Events capture DOWN from document → parent → child
- Enable with: addEventListener("click", fn, true)
- Rarely used in practice

EVENT DELEGATION
────────────────
- Attach ONE listener to a PARENT
- Use event.target to determine which child was clicked
- Works for dynamically added elements ✅
- More performant than attaching listeners to every child ✅

PREVENT DEFAULT
───────────────
- event.preventDefault() = stop browser's built-in behaviour
- Does NOT stop bubbling

KEY PROPERTIES
──────────────
event.target            → element that triggered the event
event.currentTarget     → element with the listener
event.type              → "click", "keydown", etc.
event.bubbles           → true/false, does this event bubble?
```

---

## 🎓 Summary

| Concept | One-liner |
|---------|-----------|
| **Event Bubbling** | Events travel from the child up to the root after firing |
| **Event Capturing** | Events travel from the root down to the child before firing |
| **stopPropagation()** | Stops the event from travelling further |
| **preventDefault()** | Stops the browser's default action |
| **Event Delegation** | One parent listener handles events from many children via bubbling |

> 💪 **Practice tip:** Open your browser's DevTools console, paste the code examples above into the Console, and try clicking to see bubbling in action!

---

*Happy coding! 🚀*
