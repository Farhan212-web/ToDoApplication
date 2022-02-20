const taskBox = document.querySelector('.taskList');
const newBox = document.querySelector('.createNew');
const form = document.querySelector('form');
const itemsLeft = document.querySelector('.items-left')
const deleteButtons = [];
const circles = [];

form.addEventListener("submit", newPost);

function newPost(e) {
    e.preventDefault();

    if(newBox.value === "") {
        return;
    }

    const task = document.createElement("div");
    const p = document.createElement("p");
    const checkButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const cross = document.createElement("img");
    cross.src = "images/icon-cross.svg";

    p.textContent = newBox.value;
    newBox.value = "";
    deleteButton.appendChild(cross);

    task.classList.add("box");
    p.classList.add("toDoBox");
    checkButton.classList.add("circle");
    deleteButton.classList.add("delete-button");

    task.appendChild(p);
    task.appendChild(checkButton);
    task.appendChild(deleteButton);
    taskBox.appendChild(task);

    deleteButtons.push(deleteButton);
    
    let numTask = parseInt(itemsLeft.textContent);
    let totalTasks = numTask + 1;
    itemsLeft.textContent = totalTasks.toString();

    deleteBox();
    circles.push(checkButton);
    checkForCompletion();

};


function deleteBox() { 
    deleteButtons.forEach((item, i) => {
        item.addEventListener("click", function() {
            item.parentNode.parentNode.removeChild(item.parentNode);
            let numTasks = parseInt(itemsLeft.textContent) -1;
            itemsLeft.textContent = numTasks.toString();
        });
    });
};

function checkForCompletion() {
    circles.forEach((item, i) => {
        item.addEventListener("mouseenter", function() {
            if(item.firstChild) {
                return;
            }

            const imgDiv = document.createElement("div");
            const checkImg = document.createElement("img");
            checkImg.src = "images/icon-check.svg";

            checkImg.classList.add("tick");

            imgDiv.appendChild(checkImg);

            imgDiv.classList.add("checkCircle");
            item.appendChild(imgDiv);
        });

        item.addEventListener("mouseleave", function() {
            if(item.parentNode.firstChild.classList.contains("completed-task")) {
                return;
            };

            item.removeChild(item.firstChild);
        });

        item.addEventListener("click", function() {
            const ptag = item.parentNode.firstChild;
            ptag.classList.add("completed-task");
        });
    })
}





