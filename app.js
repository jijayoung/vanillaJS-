// login
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASS = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event){
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASS);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);
    paintGreetings(username);
}

function paintGreetings(username){
    greeting.innerText = `Hello, ${username}!`;
    greeting.classList.remove(HIDDEN_CLASS);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASS);
    loginForm.addEventListener("submit",onLoginSubmit)
} else{
    paintGreetings(savedUsername);
}


// clock
const jsClock = document.querySelector("#clock");

function clock(){
    const today = new Date();
    const years = today.getFullYear();
    const month = today.getMonth()+1;
    const date = today.getDate();
    const hours = String(today.getHours()).padStart(2,"0");
    const minutes = String(today.getMinutes()).padStart(2,"0");
    const seconds = String(today.getSeconds()).padStart(2,"0");
    
    jsClock.innerText = `${years}/${month}/${date} ${hours}:${minutes}:${seconds}`;
}
clock();
setInterval(clock,1000);


// backgroundImage
const bgImgs = ['img/01.jpg','img/02.jpg','img/03.jpg'];
function bgChange(){
  const randomBg = bgImgs[Math.floor(Math.random() * bgImgs.length)];
  document.body.setAttribute("style",`background:url(${randomBg}) no-repeat left top;background-size:cover`);
}
bgChange();


// todo
const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}

function delToDo(event){
    const li = event.target.parentElement;
    li.remove(); 
    toDos = toDos.filter(toDos => toDos.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodoObj){
    const  li = document.createElement("li");
    li.id = newTodoObj.id;
    const  span = document.createElement("span");
    const button = document.createElement("button");
    button.innerText = "x";
    button.addEventListener("click",delToDo);
    li.appendChild(span);
    li.appendChild(button);
    span.innerText = newTodoObj.text;
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text : newTodo,
        id : Date.now()
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener('submit',handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null){
    const parsedTodos = JSON.parse(savedToDos);
    toDos = parsedTodos;
    parsedTodos.forEach(paintToDo);
}

// weather
const API_KEY = "4894c0387d720a3859b89c458533519e"; 

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=KR`;
    fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
            const city = document.querySelector("#weather span");
            const weather = document.querySelector("#weather em");
            const iconContainer = document.querySelector("#weather strong");

            city.innerText = `${data.name}, ${data.main.temp}°,`;
            weather.innerText = `${data.weather[0].main}`;
            iconContainer.setAttribute("style",`background-image:url('https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png')`);
        })
}

function onGeoError(){
    alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);