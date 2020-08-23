class task {
  name_task = "";
  color_status = "";
  is_checked = false;

  constructor(name_task, color_status) {
    this.name_task = name_task;
    this.color_status = color_status;
  }

  getNameTask() {
    return this.name_task;
  }

  getColorStatus() {
    return this.color_status;
  }

  isChecked() {
    return this.is_checked;
  }

  setChecked(isChecked) {
    this.is_checked = isChecked;
  }
}

var data = [
  new task("Lorem ipsum, dolor sit amet consectetur adipisicing elit.", "blue"),
  new task("Lorem ipsum, dolor sit amet consectetur adipisicing elit.", "red"),
];

//Load list when start app
load_task(data);
const input_search = document.getElementById("input_search");

const btn_add_task = document.getElementById("btn_add_new_task");
const nameTask_el = document.getElementById("name_new_task");
const list_item_color_el = document.getElementsByClassName("item-color");
const btn_active_nav = document.getElementById("btn_active_nav");
const btn_close_nav = document.getElementById("btn_close_nav");

//Window add new task
const window_add_new_task = document.getElementById("window_add_new_task");
const effect_burl = document.getElementById("effect_blur");
const btn_close_window = document.getElementById("close_window");
const btn_sub_add = document.getElementById("btn_sub_add");
const txt_name_new_task = document.getElementById("txt_name_new_task");

btn_add_task.addEventListener("click", (event) => {
  show_window_add_new_task();
});

effect_burl.addEventListener("click", (event) => {
  close_window_add_new_task();
  document.getElementById("nav_bar").classList.remove("active");
});
btn_close_window.addEventListener("click", (event) => {
  close_window_add_new_task();
});
btn_sub_add.addEventListener("click", (event) => {
  let nameTask = nameTask_el.value.trim();
  let colorStatus = "red";
  for (let i = 0; i < list_item_color_el.length; i++) {
    const element = list_item_color_el[i];

    if (element.selected) {
      let classColor = element.classList.value.split(" "); //Get color selected
      if (classColor.includes("blue")) {
        colorStatus = "blue";
      }
      if (classColor.includes("green")) {
        colorStatus = "green";
      }
      if (classColor.includes("yellow")) {
        colorStatus = "yellow";
      }
    }
  }

  if (nameTask != null && nameTask != "" && colorStatus != "") {
    add_new_task(nameTask, colorStatus);
    nameTask_el.value = "";
    refreshCheckSelectedColor();
    close_window_add_new_task();
  } else {
    console.log("Fail add new task");
  }
});

input_search.addEventListener("keydown", (event) => {
  let listTaskSearch = [];

  data.forEach((item) => {
    if (item.getNameTask().indexOf(input_search.value) != -1) {
      listTaskSearch.push(item);
    }
  });

  if (listTaskSearch.length == 0 && input_search.value == "") {
    load_task(data);
  } else {
    load_task(listTaskSearch);
  }
});

btn_active_nav.addEventListener("click", function () {
  effect_burl.classList.add("active");
  document.getElementById("nav_bar").classList.add("active");
});
btn_close_nav.addEventListener("click", function () {
  effect_burl.classList.remove("active");
  document.getElementById("nav_bar").classList.remove("active");
});

function refreshCheckSelectedColor() {
  for (let i = 0; i < list_item_color_el.length; i++) {
    list_item_color_el[i].selected = false;
  }
}

function close_window_add_new_task() {
  window_add_new_task.classList.remove("active");
  effect_burl.classList.remove("active");
}

function show_window_add_new_task() {
  window_add_new_task.classList.add("active");
  effect_burl.classList.add("active");
}

function getNewElementItemTask(nameTask, colorStatus, isChecked) {
  // <li>
  let task_item = document.createElement("li");
  task_item.className = "item-task";
  // </li>

  // <span> color_status
  let span_color_status = document.createElement("span");
  span_color_status.className = "color";
  switch (colorStatus) {
    case "red":
      span_color_status.classList.add("red");
      break;
    case "blue":
      span_color_status.classList.add("blue");
      break;
    case "yellow":
      span_color_status.classList.add("yellow");
      break;
    case "green":
      span_color_status.classList.add("green");
      break;
    default:
      break;
  }
  // </span>  color_status

  // <p> content task
  let p_content = document.createElement("p");
  p_content.className = "content";
  p_content.innerHTML = nameTask;
  if (isChecked) {
    isChecked ? (p_content.style.textDecoration = "line-through") : null;
  }
  // </p> content task

  // <input> check complete task
  let input_check = document.createElement("input");
  input_check.className = "check-complete-task";
  input_check.type = "checkbox";
  input_check.name = "check_complete_task";
  input_check.checked = isChecked;
  // </input> check complete task

  task_item.append(span_color_status);
  task_item.append(p_content);
  task_item.append(input_check);
  return task_item;
}

function load_task(dataLoad) {
  const list_task = document.getElementById("list_task");
  list_task.innerHTML = ""; //Remove all task had in list

  dataLoad.forEach((itemTask) => {
    const elementTaskItem = getNewElementItemTask(
      itemTask.getNameTask(),
      itemTask.getColorStatus(),
      itemTask.isChecked()
    );
    list_task.append(elementTaskItem);
  });
  const list_checkbox_complete_task_el = document.getElementsByClassName(
    "check-complete-task"
  );
  let list_item_color_el = document.getElementsByClassName("item-color");

  //Set event when selected color status
  for (let i = 0; i < list_item_color_el.length; i++) {
    const element = list_item_color_el[i];
    element.addEventListener("click", (event) => {
      for (let j = 0; j < list_item_color_el.length; j++) {
      list_item_color_el[j].selected = false;
      list_item_color_el[j].innerHTML = '';
      }
      element.selected = true;
      element.innerHTML = '<i class="fas fa-check">';
    });
  }

  for (let i = 0; i < list_checkbox_complete_task_el.length; i++) {
    const element = list_checkbox_complete_task_el[i];
    element.addEventListener("change", (event) => {
      data[i].setChecked(element.checked);
      load_task(data);
    });
  }
}

function add_new_task(taskName, colorStatus) {
  data.push(new task(taskName, colorStatus));
  load_task(data);
}
