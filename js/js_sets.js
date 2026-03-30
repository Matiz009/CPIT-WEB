// const users= new Set([
//     'A','B','C',true,'23','12','tas','sat'
// ]);
// console.log(users);
// for(let user of users){
//     console.log(user);
// }
// const numbers= new Set();
// numbers.add(12);
// numbers.add('13');
// numbers.add('23');
// numbers.add('tas')

// for(let num of numbers){
//     num+=20;
//     console.log(num);
// }

// numbers.forEach((num)=>{
//     num=num+23;
//     console.log(num);
// });
// //numbers.clear();
// //clear method is used to reset all elements of set

// console.log(numbers);

// numbers.delete(numbers);

// let a = numbers.has('23');
// console.log(a);


// let c = users.union(numbers);
// console.log(c);

// c = users.intersection(numbers);

// console.log(c);

// c = numbers.intersection(users);
// console.log(c);

// c=numbers.difference(users);
// console.log(c);

// console.log('The difference of set'+numbers + 'and'+ users + 'is ' + c);

// let fruits=['a','b','c','d'];
// for(let fruit of fruits){
//     document.write(fruit);
// }

// console.log(document);
// // console.log(document.getElementsByName('name'));
// console.log(document.getElementsByTagName('li'));
// console.log(document.getElementById('1').innerText);
// console.log(document.getElementById('1').innerHTML);
// console.log(document.getElementById('list').innerText);
// console.log(document.getElementById('list').innerHTML);
// console.log(document.getElementsByClassName('listelemenets'));


const divs_HC = document.getElementsByClassName("box"); // HTMLCollection — LIVE
const divs_NL = document.querySelectorAll(".box");      // NodeList — STATIC

console.log(divs_HC.length); // 3
console.log(divs_NL.length); // 3

// Now add a new element to the DOM
const newDiv = document.createElement("div");
newDiv.className = "box";
document.body.appendChild(newDiv);

console.log(divs_HC.length); // 4 ← updated automatically!
console.log(divs_NL.length); // 3 ← frozen at query time



