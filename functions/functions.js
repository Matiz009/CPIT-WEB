// window.console.log("functions.js loaded");

// navigator.geolocation.getCurrentPosition(function(position) {
//    try {
//      console.log("Latitude: " + position.coords.latitude);
//      console.log("Longitude: " + position.coords.longitude);
//    } catch (error) {
//     console.log(error);
//    }
// });

// //local storage

// localStorage.setItem("name", "John Doe");
// var name = localStorage.getItem("name");
// console.log("Name from local storage: " + name);



// Problem with regular function


function Car(make, model) {
    this.make = make;
    this.model = model;
    console.log("Car created: " + this.make + " " + this.model);
}


audi = new Car("Audi", "A4");
civic = new Car("Honda", "Civic");