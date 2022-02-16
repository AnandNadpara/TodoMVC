var _a;
import Todo from "./model.js";
import render, { changeStyle } from "./view.js";
const todo = new Todo([]);
(_a = document.querySelector(".selectAll")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    todo.selectAll();
    render(todo.getTodo(), todo.getState(), todo.itemsActive());
});
let todoInputField = document.querySelector(".todoInputField");
function addNewTask(task) {
    let id = todo.getLastId();
    todo.add({
        id: id,
        task: task,
        status: false,
    });
    todoInputField.value = "";
    let popup = document.querySelector(".popup");
    popup.style.display = "none";
    render(todo.getTodo(), todo.getState(), todo.itemsActive());
}
todoInputField.addEventListener("keydown", (e) => {
    if (e && e.keyCode === 13 && todoInputField.value.trim()) {
        addNewTask(todoInputField.value.trim());
    }
});
function debouncing(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(args); }, timeout);
    };
}
function popup() {
    let popup = document.querySelector(".popup");
    let value = todo.searchInTodo(todoInputField.value);
    if (value) {
        popup.innerHTML = `"${value}" already exists in todos`;
        popup.style.display = "block";
    }
    else
        popup.style.display = "none";
}
const inputDebounce = debouncing(() => popup());
todoInputField.addEventListener("input", inputDebounce);
let addButton = document.querySelector(".add");
addButton.addEventListener("click", () => {
    if (todoInputField.value.trim())
        addNewTask(todoInputField.value.trim());
});
let todoList = document.querySelector(".todoList");
function checkedToggle(e) {
    todo.changeState(e.target.parentNode.id.slice(4));
    changeStyle(e.target.parentNode.id, todo.itemsActive());
}
todoList.addEventListener("change", (e) => { checkedToggle(e); });
todoList.addEventListener("click", (e) => {
    if (e.target.nodeName === "BUTTON") {
        todo.destroy(e.target.parentNode.id.slice(4));
        render(todo.getTodo(), todo.getState(), todo.itemsActive());
    }
    else if (e.target.nodeName === "P") {
        e.target.parentNode.querySelector(".toggle").checked = !e.target.parentNode.querySelector(".toggle").checked;
        checkedToggle(e);
    }
});
let footer = document.querySelector("footer");
footer.addEventListener("click", (e) => {
    var _a, _b;
    if (e.target.nodeName === "A") {
        (_a = document.querySelector("." + todo.getState().toLowerCase())) === null || _a === void 0 ? void 0 : _a.classList.toggle("selected");
        todo.filterState(e.target.textContent);
        (_b = document.querySelector("." + todo.getState().toLowerCase())) === null || _b === void 0 ? void 0 : _b.classList.toggle("selected");
        render(todo.getTodo(), todo.getState(), todo.itemsActive());
    }
    else if (e.target.nodeName === "BUTTON") {
        todo.clearCompleted();
        render(todo.getTodo(), todo.getState(), todo.itemsActive());
    }
});
render(todo.getTodo(), todo.getState(), 0);
