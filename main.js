const todo_input = document.querySelector('.input');
const btn = document.querySelector('.add');
const list = document.querySelector('.todo-list');
let editingIndex = -1; // To track the index of the item being edited

//re-rendering todo list from localstorage whenever browser gets refreshed
window.addEventListener("load", (e) => {
    getTodo();
});



btn.addEventListener('click', (e) => {
    e.preventDefault();

    let taskItem = todo_input.value;
    if (taskItem !== "") {

        //getting todo items from local storage array
        let todos = localStorage.getItem('My-Todos');

        if (todos === null) {
            todo_list = [];
        } else {
            todo_list = JSON.parse(todos);
        }

        todo_list.push(taskItem);
        localStorage.setItem("My-Todos", JSON.stringify(todo_list));
        todo_input.value = ""; // Clear the input field
        getTodo();
    }
});

function getTodo() {
    let todos = localStorage.getItem('My-Todos');

    if (todos === null) {
        todo_list = [];
    } else {
        todo_list = JSON.parse(todos);
    }

    // Clearing the list content before re-rendering
    list.innerHTML = '';

    todo_list.forEach((item, index) => {
        const list_el = document.createElement('div');
        list_el.classList.add('list-content');
        list.appendChild(list_el);

        const todo_item = document.createElement('div');
        todo_item.classList.add('task-content');
        list_el.appendChild(todo_item);

        const input = document.createElement('input');
        input.type = 'text';
        input.value = ` ${item}`;
        input.setAttribute('readonly', 'readonly');
        if (index === editingIndex) {
            input.removeAttribute('readonly');
        }

        todo_item.appendChild(input);

        const actions = document.createElement('div');
        actions.classList.add('actions');
        list_el.appendChild(actions);

        const edit = document.createElement('button');
        edit.innerText = editingIndex === index ? "Save" : "Edit";
        edit.classList.add('edit');
        edit.addEventListener('click', () => {
            if (editingIndex === -1) {
                editingIndex = index;
                getTodo(); // Re-rendering to make the input field editable
            } else {
                // Save the edited task
                todo_list[index] = input.value.trim();
                localStorage.setItem("My-Todos", JSON.stringify(todo_list));
                editingIndex = -1;
                getTodo(); // Re-render to reflect changes
            }
        });

        const del = document.createElement('button');
        del.innerText = "Delete";
        del.classList.add('delete');
        del.addEventListener('click', () => {
            // Delete the task
            todo_list.splice(index, 1);
            localStorage.setItem("My-Todos", JSON.stringify(todo_list));
            getTodo(); // Re-render to reflect changes
        });

        actions.appendChild(edit);
        actions.appendChild(del);
    });
}
