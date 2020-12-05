


const tasks = getTasksFromLocalStorage();
const mainEl = document.querySelector("#main");
const taskListEl = document.querySelector("#taskList");
const errorNameEl = document.querySelector("#NameError");
const errorTaskEl = document.querySelector("#TaskError");
const errorDateEl = document.querySelector("#dateError");
const errorTimeEl = document.querySelector("#timeError");
const inputNameEl = document.querySelector("#nameInput");
const inputTaskEl = document.querySelector("#taskInput");
const inputDateEl = document.querySelector("#dateInput");
const inputTimeEl = document.querySelector("#timeInput");





main();

function getTasksFromLocalStorage() {
    let tasksJson = localStorage.getItem("tasks");
    let tasksCoverted = JSON.parse(tasksJson) || [];
    return tasksCoverted;
}


function main() {
    let formEl = document.querySelector("#addTask");
    formEl.addEventListener("submit", onSubmit);
    showAll();
    inputNameEl.addEventListener("click", cleanError)
    inputTaskEl.addEventListener("click", cleanError)
    inputDateEl.addEventListener("click", cleanError)
    inputTimeEl.addEventListener("click", cleanError)
}

function showAll() {
    for (let i = 0; i < tasks.length; i++) {
        let taskEl = creatComponent(tasks[i]);
        taskListEl.appendChild(taskEl);
    }
}

function onSubmit(e) {
    e.preventDefault();

    let formEl = e.target;
    let taskName = formEl.discription.value.trim();
    let taskText = formEl.text.value.trim();
    let taskDate = formEl.date.value;
    let taskTime = formEl.time.value;
    let id = Date.now();


    let task = {
        id: Math.random(),
        taskName,
        taskText,
        taskDate,
        taskTime,
        id,
    };
    if (taskName.trim() === "") {
        errorNameEl.innerText = "Please enter a name of the task";

        return;
    }

    if (taskName.trim().length > 10) {
        errorNameEl.innerText = "max 10 letters";
        return;
    }

    if (taskText.trim() === "") {
        errorTaskEl.innerText = "Please enter the task";
        return;
    }
    if (taskDate.trim() === "") {
        errorDateEl.innerText = "Choose date";
        return;
    }
    if (taskTime.trim() === "") {
        errorTimeEl.innerText = "Choose time";
        return;
    }

    tasks.push(task);
    savetaskToLocalStorage();
    addComponet(task);
    inputNameEl.value = "";
    inputTaskEl.value = "";
    inputDateEl.value = "";
    inputTimeEl.value = "";


}

function clearInput() {
    inputNameEl.value.trim() = "";
    inputTaskEl.value.trim() = "";
    inputDateEl.value.trim() = "";
    inputTimeEl.value.trim() = "";
}

function cleanError() {
    errorNameEl.innerText = "";
    errorTaskEl.innerText = "";
    errorDateEl.innerText = "";
    errorTimeEl.innerText = "";
  
  }

function savetaskToLocalStorage() {
    let tasksJson = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksJson);
}

function addComponet(task) {
    let taskEl = creatComponent(task);
    taskListEl.appendChild(taskEl);
}



function creatComponent(task) {

    let componetEl = document.createElement("div");
    componetEl.classList.add("card", "card.show");
    componetEl.innerHTML = `
    
    <div class="nameTag">${task.taskName}</div>
    <div class="textTag">${task.taskText}</div> 
    <div class="timeTag">${task.taskTime}</div><br/>
    <div class="dateTag">${task.taskDate}</div>
    <button class="deleteBtn">Done!</button>
    `;

    let deleteBtnEl = componetEl.querySelector(".deleteBtn");
    deleteBtnEl.addEventListener("click", function () {

        deleteTask(task, componetEl);

    });
    return componetEl;

}

function deleteTask(task, componetEl) {
    for (let i = 0; i < tasks.length; i++) {
        let taskInState = tasks[i];
        if (taskInState.id === task.id) {
            tasks.splice(i, 1);
            savetaskToLocalStorage();
            break;
        }
    }
    componetEl.remove();
}

