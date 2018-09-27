const domicile = require("./domicile/domicile.js");

document.addEventListener("DOMContentLoaded", () => {
  addButtonListeners();
});

const todoCreate = () => {
  const title = $d("input.title-input").getValueAt(0);
  const body = $d("textarea.body-input").getValueAt(0);

  const titleEl = document.createElement("h1");
  titleEl.append(document.createTextNode(title))
  const bodyEl = document.createElement("p");
  bodyEl.append(document.createTextNode(body));
  const nextTodo = document.createElement("li");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo-delete");
  deleteButton.appendChild(document.createTextNode('Delete Todo'));

  nextTodo.appendChild(titleEl);
  nextTodo.appendChild(bodyEl);
  nextTodo.appendChild(deleteButton);
  nextTodo.classList.add("todo");

  $d(".todos").append(nextTodo);

  addButtonListeners();
}

const addButtonListeners = () => {
  $d("button.todo-delete").each( (btn) => {
    const parent = $d(btn).parent();
    const boundRm = parent.remove.bind(parent);
    $d(btn).on("click", boundRm);
  });

  $d("button.todo-create").on("click", todoCreate);
};