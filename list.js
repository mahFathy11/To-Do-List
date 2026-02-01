let myInput = document.querySelector(".addContainer input");
let addTask = document.querySelector(".addContainer .add");
let tasks = document.querySelector(".tasks");

myInput.focus();
// for refreash get data from localStorage
let tasksArr = window.localStorage.getItem("tasksStored")
  ? JSON.parse(window.localStorage.getItem("tasksStored"))
  : [];
createElement(tasksArr);

addTask.onclick = () => {
  myInput.focus();
  // onclick add and store
  if (myInput.value.trim() != "") {
    addTaskTotaskContainer(myInput.value);
    TaskArrToLocalStorage(tasksArr);
    createElement(tasksArr);
  }
  myInput.value = "";
};

function addTaskTotaskContainer(e) {
  // object to contain evry task data (class ,content)
  taskObj = {
    class: `${tasksArr.length}`,
    content: `${e}`,
  };
  // every click plus to actual taskArr and create again from zero
  tasksArr.push(taskObj);
}

function createElement(Arr) {
  tasks.innerHTML = ""; // it create from zero again not append it append taskArr only
  // just take tasks data and create element
  Arr.forEach((e) => {
    let taskItem = document.createElement("div");
    taskItem.className = `task-item ${e.class}`; // look here
    taskItem.appendChild(document.createTextNode(`${e.content}`));

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    taskItem.append(deleteButton);
    tasks.append(taskItem);
  });
}

function TaskArrToLocalStorage(e) {
  window.localStorage.setItem("tasksStored", JSON.stringify(e));
}

tasks.onclick = (e) => {
  deleteFunct(e.target);

  // to add class "done" to element then add it to taskArr then store it
  if (Array.from(e.target.classList).includes("task-item")) {
    e.target.classList.toggle("done");
    e.target.classList.remove("task-item"); // to don't add it again in createElement function => take a look

    tasksArr.forEach((ele) => {
      ele.class = Array.from(e.target.classList).includes(ele.class[0])
        ? e.target.className // change class in taskArr to equal element class (done)
        : ele.class;

      //   if (Array.from(e.target.classList).includes(ele.class[0])) {
      //     ele.class = ele.class.split(" ").includes("done")
      //       ? ele.class[0]
      //       : ele.class + " done";
      //   }
    });
  }
  createElement(tasksArr);
  TaskArrToLocalStorage(tasksArr);
  // if taskArr empty remove from localStorage
  if (tasksArr.length == "0") {
    window.localStorage.removeItem("tasksStored");
  }
};

function deleteFunct(e) {
  if (e.textContent === "Delete") {
    // tasksArr.splice(tasksArr.indexOf(e.parentElement.class), 1); // clase key has same valu as its index [{class:0},{class:1},....]

    // delete task data from taskArr and => make classes after task deleted decrease by 1 to make it arranged (0,1,2,3,...)
    tasksArr.forEach((ele) => {
      if (e.parentElement.childNodes[0].textContent === `${ele.content}`) {
        for (i = tasksArr.indexOf(ele) + 1; i < tasksArr.length; i++) {
          if (tasksArr[i].class.split(" ").includes("done")) {
            tasksArr[i].class = `${parseInt(tasksArr[i].class) - 1} done`;
          } else {
            tasksArr[i].class = `${+tasksArr[i].class - 1}`;
          }
        }
        tasksArr.splice(tasksArr.indexOf(ele), 1);
      }
    });
  }
}

// جمييييييل to make it easier by clicking enter add task
document.onkeydown = (e) => {
  if (e.key === "Enter") {
    addTask.click();
  }
};
