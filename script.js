const taskBox = document.querySelector('.taskList');
const newBox = document.querySelector('.createNew');
const form = document.querySelector('form');
const itemsLeft = document.querySelector('.items-left')
const deleteButtons = [];
const circles = [];
const activeStatuses = document.querySelectorAll('.active-status > button');
const statusBar = document.querySelector('.active-status');
const removeButton = document.querySelector('.clear-completed');
const mobileBar = document.querySelector('.mobile-bar');
const footer = document.querySelector('.footer');
let activeStatus = 0;

form.addEventListener("submit", newPost);

let x = window.matchMedia('(max-width: 711px)');
moveStatusBar(x);

x.addListener(moveStatusBar);

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
    toggleStatus();

};

removeButton.addEventListener("click", function() {
    let children = taskBox.children;

    for(let i = 0; i < children.length; i++) {
        if(children[i].firstChild.classList.contains("completed-task")) {
            children[i].parentNode.removeChild(children[i]);
            i--;
            itemsLeft.textContent = findNumitems();
        }
    }
});


function deleteBox() { 
    deleteButtons.forEach((item, i) => {
        item.addEventListener("click", function() {
            item.parentNode.parentNode.removeChild(item.parentNode);
            itemsLeft.textContent = findNumitems();
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

function findNumitems() {
    let children = taskBox.children;
    let count = 0;
    for(let i = 0; i < children.length; i++) {
        if(children[i].classList.contains("hidden")) {
            continue;
        }

        count += 1;
    }

    return count.toString();
}

function toggleStatus() {
    let children = taskBox.children;
    activeStatuses.forEach((item, i) => {
        item.addEventListener("click", function() {
            activeStatuses[activeStatus].classList.remove("toggled");
            item.classList.add("toggled");

            activeStatus = i;
            if(item.textContent === "All") {
                for(let i = 0; i < children.length; i++) {
                    children[i].classList.remove("hidden")
                }

            }

            else if(item.textContent === "Completed") {
                for(let i = 0; i < children.length; i++) {
                    if(!children[i].firstChild.classList.contains("completed-task")) {
                        children[i].classList.add("hidden");
                    }

                    else if(children[i].classList.contains("hidden")) {
                        children[i].classList.remove("hidden");
                    }
                }
            }

            else if(item.textContent === "Active") {
                for(let i = 0; i < children.length; i++) {
                    if(children[i].firstChild.classList.contains("completed-task")) {
                        children[i].classList.add("hidden");
                    } 

                    else if(children[i].classList.contains("hidden")) {
                        children[i].classList.remove("hidden");
                    }
                }
            }

            itemsLeft.textContent = findNumitems();
        });
    })
}

function moveStatusBar(x) {
    let temp = statusBar;
    if(x.matches) {
        statusBar.parentNode.removeChild(statusBar);
        mobileBar.appendChild(temp);
    } else {
        const bar = document.querySelector('.status-bar');
        if(!bar.contains(statusBar)) {
            bar.appendChild(statusBar);
        }
    }
}





