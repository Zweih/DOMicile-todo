const domicile = require("./domicile/domicile.js");

document.addEventListener("DOMContentLoaded", () => {
  $d("button.todo-delete").$htmlArr.forEach( (btn) => {
    const parent = $d(btn).parent();
    const boundRm = parent.remove.bind(parent);
    $d(btn).on("click", boundRm);
  });

  $d("button.todo-create").on("click", todoCreate);
});

const todoCreate = () => {
  const title = $d("input.title-input").getValueAt(0);
  const body = $d("textarea.body-input").getValueAt(0);

  const latestTodo = ($d(".todo").get($d(".todo").length() - 1));

  const titleEl = document.createElement("H1");
  titleEl.append(document.createTextNode(title))
  const bodyEl = document.createElement("P");
  bodyEl.append(document.createTextNode(body))
  const newTodo = document.createElement("li");
  newTodo.appendChild(titleEl);
  newTodo.appendChild(bodyEl);
  debugger
  $d(latestTodo).append(newTodo);
}