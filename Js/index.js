const taskInput= document.getElementById('task-input');
const addButton = document.getElementById('add-task-btn');
const tasklist = document.getElementById('task-list');
// const errorMsg=document.getElementById('error-msg');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(){
    tasklist.innerHTML='';

    tasks.forEach((task,index) =>{
        const taskElement =document.createElement('li');
        taskElement.className='task-item';

        const taskText =document.createElement('span');
        taskText.textContent=task.text;
        taskElement.appendChild(taskText);

        if(task.completed){
            taskElement.classList.add('Done');
        }

        const taskActions =document.createElement('div');
        taskActions.className = 'task-actions';

        const taskDone =document.createElement('button');
        taskDone.textContent='Done';
        taskDone.className='Done-btn';

        if (task.completed){
            taskDone.classList.add('Done-active');
        }

        taskActions.appendChild(taskDone);

        const removeButton=document.createElement('button');
        removeButton.textContent='X';
        removeButton.className='remove-btn';
        taskActions.appendChild(removeButton);

        taskElement.appendChild(taskActions);
        tasklist.appendChild(taskElement);

        taskDone.addEventListener('click',function(){
            taskElement.classList.toggle('Done');
            taskDone.classList.toggle('Done-active');
            tasks[index].completed =!tasks[index].completed;
            saveTasks();
        });

        removeButton.addEventListener('click',function(){
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });
    });
}

renderTasks();

addButton.addEventListener('click',function(){
    const taskValue = taskInput.value.trim();

    if (taskValue===''){
        taskInput.classList.remove('input-error');

        void taskInput.offsetWidth;

        taskInput.classList.add('input-error');

        taskInput.placeholder='Please enter your task ❗';
        return;
    }

    taskInput.placeholder='Add a new task';
    taskInput.classList.remove('input-error');

    tasks.push({text:taskValue,completed:false});
    saveTasks();

    renderTasks();

    taskInput.value='';
});
taskInput.addEventListener('input', function() {
    if (taskInput.classList.contains('input-error')) {
        taskInput.classList.remove('input-error');
        taskInput.placeholder = 'Add a new task';
    }
});
// console.log(tasklist);
// addButton.addEventListener('click',function(){
//     const taskValue = taskInput.value.trim();
    
//     if (taskValue === ''){
//         taskInput.placeholder =' Please enter your task ❗';
//         taskInput.classList.add('input-error');
//         // errorMsg.textContent='Please enter your task';
//         return;
//     }

//     // errorMsg.textContent='';

//     // console.log(taskInput.value);

//     taskInput.placeholder = 'Add a new task';
//     taskInput.classList.remove('input-error');

//     const taskElement =document.createElement('li');
//     taskElement.className='task-item';

//     const taskText= document.createElement('span');
//     taskText.textContent=taskInput.value;
//     taskElement.appendChild(taskText);

//     const taskDone= document.createElement('button');
//     taskDone.textContent='Done';
//     taskDone.className='Done-btn';
//     taskElement.appendChild(taskDone);

//     const removeButton= document.createElement('button');
//     removeButton.textContent='X';
//     taskElement.appendChild(removeButton);

//     tasklist.appendChild(taskElement);

//     // console.log(taskDone);
//     // taskElement.textContent=taskInput.value;
//     taskDone.addEventListener('click',function(){
//         taskElement.classList.toggle('Done');
//     });
//     removeButton.addEventListener('click',function(){
//         tasklist.removeChild(taskElement);
//     });

//     taskInput.value='';
// });