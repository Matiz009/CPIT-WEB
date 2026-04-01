// function sendRequestToJazzcash(callback) {
//     setTimeout(() => {
//         console.log("Request sent to Jazzcash");
//         callback();
//     }, 3000);
// }

// function checkUserBalance(callback) {
//     setTimeout(() => {
//         console.log("Checking user balance...");
//         callback();
//     }, 2000);
// }

// function processPayment(callback) {
//     setTimeout(() => {
//         console.log("Processing payment...");
//         callback();
//     }, 1000);
// }

// function processPaymentSuccess() {
//     setTimeout(() => {
//     console.log("Payment processed successfully!");
//     }, 1000);
// }

// // Using callback
// sendRequestToJazzcash(() => {
//     checkUserBalance(() => {
//         processPayment(() => {
//             processPaymentSuccess();
//         });
//     });
// });

// function sendRequestToJazzcash() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Request sent to Jazzcash");
//             resolve();
//         }, 3000);
//     });
// }

// function checkUserBalance() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Checking user balance...");
//             resolve();
//         }, 2000);
//     });
// }

// function processPayment() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Processing payment...");
//             resolve();
//         }, 1000);
//     });
// }

// function processPaymentSuccess() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("Payment processed successfully!");
//             resolve();
//         }, 1000);
//     });
// }

// // Using Promises (chaining)
// sendRequestToJazzcash()
//     .then(() => checkUserBalance())
//     .then(() => processPayment())
//     .then(() => processPaymentSuccess())
//     .catch((error) => {
//         console.error("Something went wrong:", error);
//     });




// using promise

// function sendRequestToJazzcash() {
//     return new Promise((resolve,reject) => {

//         setTimeout((err) => {
//             if(err){
//                 reject("Error sending request to Jazzcash");
//             }
//             fetch("https://jsonplaceholder.typicode.com/posts/");
//             console.log("Data fetched from API...");
//             resolve();
//         }, 3000);
//     });
// }

// function checkUserBalance() {
//     return new Promise((resolve,reject) => {
//         setTimeout((err) => {
//             if(err){
//                 reject("Error checking user balance");
//             }
//             console.log("Checking user balance...");
//             fetch("https://jsonplaceholder.typicode.com/users/");
//             console.log("User data fetched from API...");
//             resolve();
//         }, 2000);
//     });
// }

// function processPayment() {
//     return new Promise((resolve,reject) => {
//         setTimeout((err) => {
//             if(err){
//                 reject("Error processing payment");
//             }
//             console.log("Processed payment...");
//             resolve();
//         }, 3000);
//     });
// }


// sendRequestToJazzcash()
//     .then(() => checkUserBalance())
//     .then(() => processPayment())
//     .catch((error) => {
//         console.error("Something went wrong:", error);
//     }).finally(() => {
//         console.log("Payment process completed.");
//     });



// using async await

async function sendRequestToJazzcash() {
 console.log("Request sent to Jazzcash");
}

async function checkUserBalance() {
console.log("Checking user balance...");
}

async function processPayment() {
console.log("Processing payment...");
}

async function processPaymentSuccess() {
console.log("Payment processed successfully!");
}

async function main() {
    try {
        await sendRequestToJazzcash();
        await checkUserBalance();
        await processPayment();
        await processPaymentSuccess();
    } catch (error) {
        console.error("Something went wrong:", error);
    } finally {
        console.log("Payment process completed.");
    }
}

main();