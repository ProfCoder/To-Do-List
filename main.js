const addItem = document.querySelector('.add-item');
const input = document.querySelector('.input-item');
const addNewTask = document.querySelector('.add');
const resetInput = document.querySelector('.delete-item');
const existingTask = document.querySelector(".existing-tasks");
const sort = document.querySelector(".sort-icon");
const fill = document.querySelector(".drag-drop");
const message = document.querySelector(".message");
const rasif = document.querySelector(".rasif");
let list = [];
let list2 = []
let obj = {};
let count = -1;
let num = -1;
let countSort = 0;

// ----------------------------------------------------------------------------- //
// ------------------------------- Welcome Rasif ------------------------------- //
// ----------------------------------------------------------------------------- //

setTimeout(function(){
    rasif.style.display= "none";
}, 10000);

// ----------------------------------------------------------------------------- //
// ------------------------------- Add New Task -------------------------------- //
// ----------------------------------------------------------------------------- //
addNewTask.addEventListener("click", (e) => {
    e.preventDefault();
    sort.src = "./images/sort-down-gray.png";
    count++;
    let obj = {};
    obj['id'] = count;
    obj['name'] = input.value;
    list.push(obj);
    existingTask.insertAdjacentHTML('beforeend',`
    <p class="task">
        <span class="item" id="${count}">${input.value}</span>
        <span class="delete-existing">X</span>
    </p>`)
    input.value = "";
})
// ----------------------------------------------------------------------------- //
// ------------------------- Render To-Do List on Page ------------------------- //
// ----------------------------------------------------------------------------- //
function renderTasks() {
    list2 = [];
    num = -1
    existingTask.innerHTML = ""
    for (let task of list) {
        let tasks = Object.values(task);
        if (tasks[1]) {
            num++
            let obj = {};
            obj['id'] = num;
            obj['name'] = tasks[1];
            list2.push(obj); 
            existingTask.insertAdjacentHTML('beforeend',`
            <p class="task">
                <span class="item" id="${num}">${tasks[1]}</span>
                <span class="delete-existing">X</span>
            </p>`) 
        }
    }
    list = [...list2]
}
// ----------------------------------------------------------------------------- //
// ------------------------------ Sort To-Do List ------------------------------ //
// ----------------------------------------------------------------------------- //
sort.addEventListener("click", (e) => {
    if (list.length == 0) {
        message.textContent = "There is no task on the list yet."
        setTimeout(function(){
            message.textContent = ""
        }, 5000);
    } else {
        countSort++
        function compare(a, b) {
            if ( a.name < b.name){
                return -1;
            }
            if (a.name > b.name){
                return 1;
            }
            return 0;
        }
        list.sort(compare);
        if (countSort%2 !=0 ) {
            sort.src = "./images/sort-down-black.png";
        } else {
            sort.src = "./images/sort-up-black.png";
            list.reverse()
        }
            renderTasks()
    }
});
// ----------------------------------------------------------------------------- //
// ------------------------------ Reset Input Field ---------------------------- //
// ----------------------------------------------------------------------------- //
resetInput.addEventListener("click", (e) => {
    input.value = ""
})
// ----------------------------------------------------------------------------- //
// --------------------------- Delete Task From List --------------------------- //
// ----------------------------------------------------------------------------- //
existingTask.addEventListener("click", (e) => {
    if (e.target.matches(".delete-existing")) {
        let deleteId = e.target.previousElementSibling.id 
        list.splice(deleteId,1);
    } 
    renderTasks()
})
// ----------------------------------------------------------------------------- //
// --------------------------------- Drag & Drop ------------------------------- //
// ----------------------------------------------------------------------------- //
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);
input.addEventListener('dragover', dragOver);
input.addEventListener('dragenter', dragEnter);
input.addEventListener('drop', dragDrop);

function dragStart(e) {
    setTimeout(() => (e.target.style.display = 'none'), 0);
}

function dragEnd(e) {
    input.value = e.target.textContent;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragDrop(e) {
    input.value = e.target.textContent;
}
