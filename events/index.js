// document.getElementById("grandparent").addEventListener("click", () => {
//     console.log("Grandparent clicked!");
//   });

//   document.getElementById("parent").addEventListener("click", () => {
//     console.log("Parent clicked!");
//   });

//   document.getElementById("child").addEventListener("click", () => {
//     console.log("Child (button) clicked!");
//   });


// document.getElementById("container").addEventListener("click", function (event) {
//     console.log("Target (originally clicked):", event.target.tagName);
//     console.log("Current Target (listener is on):", event.currentTarget.id);
//   });


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