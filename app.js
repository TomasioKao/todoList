let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e => {
    // prevent form from submitting
    e.preventDefault();

    // get the value of input
    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoMonth = form.children[1].value;
    let todoDate = form.children[2].value;
    

    if (todoText === "") {
        alert("Please Eneter Some Text");
        return;
    }


    //create todo list
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoMonth+ " / " + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    // create green check and red trash can
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })
    
    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    trashButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;

        todoItem.addEventListener("animationend", () => {
            
                // remove from local storage
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            })
            
            
            todoItem.remove();
        })

        todoItem.style.animation = "scaleDown 0.3s forwards";
    })


    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards"

    //create an object
    let myTodo = {
        todoText: todoText,
        todoMonth: todoMonth,
        todoDate: todoDate
    }

    //store data into an array of objects
    let myList = localStorage.getItem("list");
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }


    //clear the input text
    form.children[0].value = "";
    section.appendChild(todo);
})

let myList = localStorage.getItem("list");
if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {

        //create a todo
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoMonth + " / " + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);


        // create green check and red trash can
        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.addEventListener("click", e => {
            let todoItem = e.target.parentElement;
            todoItem.classList.toggle("done");
        })

        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

        trashButton.addEventListener("click", e => {
            let todoItem = e.target.parentElement;
    
            todoItem.addEventListener("animationend", () => {
                
                // remove from local storage
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) => {
                    if (item.todoText == text) {
                        myListArray.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(myListArray));
                    }
                })

                todoItem.remove();
            })
    
            todoItem.style.animation = "scaleDown 0.3s forwards";
        })

        todo.appendChild(completeButton);
        todo.appendChild(trashButton);

        section.appendChild(todo);
    })
}