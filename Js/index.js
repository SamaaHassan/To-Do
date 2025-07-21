const taskInput= document.getElementById('task-input');
const addButton = document.getElementById('add-task-btn');
const tasklist = document.getElementById('task-list');
console.log(tasklist);
addButton.addEventListener('click',function(){
    console.log(taskInput.value);
    const taskElement =document.createElement('li');
    const taskDone= document.createElement('button');
    const removeButton= document.createElement('button');
    removeButton.textContent='X';
    taskDone.textContent='Done';
    console.log(taskDone);
    taskElement.textContent=taskInput.value;
    taskDone.className='Done-btn';
    taskElement.appendChild(taskDone);
    taskElement.className='task-item';
    tasklist.appendChild(taskElement);
    taskDone.addEventListener('click',function(){
        taskElement.classList.toggle('Done');
    });
    removeButton.addEventListener('click',function(){
        tasklist.removeChild(taskElement);
    });
    taskElement.appendChild(removeButton);
});