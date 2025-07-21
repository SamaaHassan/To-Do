const taskInput= document.getElementById('task-input');
const addButton = document.getElementById('add-task-btn');
const tasklist = document.getElementById('task-list');
const errorMsg=document.getElementById('error-msg');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(){
    tasklist.innerHTML='';

    tasks.forEach((task,index) =>{
        
    })
}
console.log(tasklist);
addButton.addEventListener('click',function(){
    const taskValue = taskInput.value.trim();
    
    if (taskValue === ''){
        taskInput.placeholder =' Please enter your task ❗';
        taskInput.classList.add('input-error');
        // errorMsg.textContent='Please enter your task';
        return;
    }

    // errorMsg.textContent='';

    // console.log(taskInput.value);

    taskInput.placeholder = 'Add a new task';
    taskInput.classList.remove('input-error');

    const taskElement =document.createElement('li');
    taskElement.className='task-item';

    const taskText= document.createElement('span');
    taskText.textContent=taskInput.value;
    taskElement.appendChild(taskText);

    const taskDone= document.createElement('button');
    taskDone.textContent='Done';
    taskDone.className='Done-btn';
    taskElement.appendChild(taskDone);

    const removeButton= document.createElement('button');
    removeButton.textContent='X';
    taskElement.appendChild(removeButton);

    tasklist.appendChild(taskElement);

    // console.log(taskDone);
    // taskElement.textContent=taskInput.value;
    taskDone.addEventListener('click',function(){
        taskElement.classList.toggle('Done');
    });
    removeButton.addEventListener('click',function(){
        tasklist.removeChild(taskElement);
    });

    taskInput.value='';
});