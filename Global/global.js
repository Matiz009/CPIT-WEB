// console.log(document.scripts);

// console.log(history.length);
// console.log(window);

// console.log('a');
// console.log('b');
// console.log('c');
// console.log('d');
// setTimeout(() => {
//     console.log('e');
// }, 0);
// console.log('f');
// console.log('g');

// let elements=document.getElementsByTagName('p');
// console.log(elements[0]);

// document.write('Hello World from document.write()');
// document.writeln(`Host: ${location.hostname} Path: ${location.pathname} Protocol: ${location.protocol}`);

// console.log(screen.width);
// console.log(screen.height);
// console.log(screen.availWidth);
// console.log(screen.availHeight);
// console.log(screen.colorDepth);
// console.log(screen.pixelDepth);
// console.log(screen.orientation);
// console.log(screen.orientation.type);
// console.log(screen.orientation.angle);
// console.log(screen.orientation.lock('landscape-primary'));
// console.log(screen.orientation.type);
// if (navigator.userAgentData) {
//   navigator.userAgentData.getHighEntropyValues(['model', 'platformVersion'])
//     .then(ua => { console.log(ua.model); }); // Might return "Pixel 6" or "SM-G991B"
// }


let classElements1 = document.getElementsByClassName('one');
console.log(classElements1);
for(let i=0;i<classElements1.length;i++){
    classElements1[i].innerHTML = `<p>This is class element ${i}</p>`;
}


let elementsViaQuery = document.querySelector('.two');
console.log(elementsViaQuery);
elementsViaQuery.innerHTML = `<p>This is class element via query selector </p>`;