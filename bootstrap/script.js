let text = document.getElementById("text");
console.log(text);
console.log(text.innerText);
console.log(text.innerHTML);

text.style.color = "red";
text.style.fontSize = "30px";
text.style.fontWeight = "bold";
text.style.textAlign = "center";

text.innerText = "Hello World";
text.innerHTML = "Hello <b>World</b>";

let image=document.getElementById('img').src= "../img/img.jpg";
document.getElementById('img').style.width="500px";
console.log(image);
console.log(document.getElementById('img'));
document.getElementById('img').style.display = "none";
text.style.display = "none";

