// const taskInput= document.getElementById('task-input');
// const addButton = document.getElementById('add-task-btn');
// const tasklist = document.getElementById('task-list');
// // const errorMsg=document.getElementById('error-msg');
// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// function saveTasks() {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function renderTasks(){
//     tasklist.innerHTML='';

//     tasks.forEach((task,index) =>{
//         const taskElement =document.createElement('li');
//         taskElement.className='task-item';

//         const taskText =document.createElement('span');
//         taskText.textContent=task.text;
//         taskElement.appendChild(taskText);

//         if(task.completed){
//             taskElement.classList.add('Done');
//         }

//         const taskActions =document.createElement('div');
//         taskActions.className = 'task-actions';

//         const taskDone =document.createElement('button');
//         taskDone.textContent='Done';
//         taskDone.className='Done-btn';

//         if (task.completed){
//             taskDone.classList.add('Done-active');
//         }

//         taskActions.appendChild(taskDone);

//         const removeButton=document.createElement('button');
//         removeButton.textContent='X';
//         removeButton.className='remove-btn';
//         taskActions.appendChild(removeButton);

//         taskElement.appendChild(taskActions);
//         tasklist.appendChild(taskElement);

//         taskDone.addEventListener('click',function(){
//             taskElement.classList.toggle('Done');
//             taskDone.classList.toggle('Done-active');
//             tasks[index].completed =!tasks[index].completed;
//             saveTasks();
//         });

//         removeButton.addEventListener('click',function(){
//             tasks.splice(index,1);
//             saveTasks();
//             renderTasks();
//         });
//     });
// }

// renderTasks();

// addButton.addEventListener('click',function(){
//     const taskValue = taskInput.value.trim();

//     if (taskValue===''){
//         taskInput.classList.remove('input-error');

//         void taskInput.offsetWidth;

//         taskInput.classList.add('input-error');

//         taskInput.placeholder='Please enter your task ❗';
//         return;
//     }

//     taskInput.placeholder='Add a new task';
//     taskInput.classList.remove('input-error');

//     tasks.push({text:taskValue,completed:false});
//     saveTasks();

//     renderTasks();

//     taskInput.value='';
// });
// taskInput.addEventListener('input', function() {
//     if (taskInput.classList.contains('input-error')) {
//         taskInput.classList.remove('input-error');
//         taskInput.placeholder = 'Add a new task';
//     }
// });
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
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
//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// تأكد من أن هذا الكود موجود في ملف index.js الخاص بك.

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    // تحميل المهام عند تحميل الصفحة
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // استخدام تفويض الأحداث (Event Delegation) للتعامل مع أزرار المهام
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item'); // البحث عن أقرب عنصر مهمة

        if (!taskItem) return; // إذا لم يكن النقر داخل عنصر مهمة، لا تفعل شيئاً

        const taskId = taskItem.dataset.id; // الحصول على ID المهمة

        if (target.classList.contains('task-checkbox')) { // **التعامل مع مربع الاختيار**
            toggleDone(taskId, target.checked); // تمرير حالة التحديد
        } else if (target.classList.contains('remove-btn')) {
            removeTask(taskId);
        } else if (target.classList.contains('notes-btn')) { // **التعامل مع زر الملاحظات**
            toggleNotesBox(taskItem);
        }
    });

    // **التعامل مع تغيير الملاحظات في صندوق الملاحظات**
    taskList.addEventListener('input', (e) => {
        const target = e.target;
        if (target.classList.contains('notes-box')) {
            const taskItem = target.closest('.task-item');
            const taskId = taskItem.dataset.id;
            saveNotes(taskId, target.value);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            taskInput.classList.add('input-error');
            setTimeout(() => {
                taskInput.classList.remove('input-error');
            }, 500);
            return;
        }

        const taskId = Date.now().toString(); // ID فريد للمهمة
        const task = {
            id: taskId,
            text: taskText,
            done: false, // حالة الافتراضية للمهمة غير مكتملة
            notes: '' // حقل الملاحظات الجديد
        };

        saveTask(task); // حفظ المهمة الجديدة
        renderTask(task); // عرض المهمة الجديدة في القائمة

        taskInput.value = '';
    }

    function renderTask(task) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.dataset.id = task.id; // تخزين ID المهمة في عنصر HTML

        if (task.done) {
            taskItem.classList.add('Done'); // إضافة الكلاس Done إذا كانت المهمة مكتملة
        }

        // **إنشاء wrapper لمربع الاختيار والنص**
        const taskContentWrapper = document.createElement('div');
        taskContentWrapper.classList.add('task-content-wrapper');

        // **مربع الاختيار (Checkbox) بدلاً من زر Done**
        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.classList.add('task-checkbox');
        taskCheckbox.checked = task.done; // تحديد حالة مربع الاختيار بناءً على المهمة

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;

        taskContentWrapper.appendChild(taskCheckbox);
        taskContentWrapper.appendChild(taskTextSpan);

        const taskActionsDiv = document.createElement('div');
        taskActionsDiv.classList.add('task-actions');

        // **زر الملاحظات**
        const notesBtn = document.createElement('button');
        notesBtn.classList.add('notes-btn');
        notesBtn.textContent = 'Notes';

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent ='X';
        taskActionsDiv.appendChild(notesBtn); // إضافة زر الملاحظات
        taskActionsDiv.appendChild(removeBtn);

        taskItem.appendChild(taskContentWrapper); // إضافة wrapper لمربع الاختيار والنص
        taskItem.appendChild(taskActionsDiv);

        // **صندوق الملاحظات (textarea)**
        const notesBox = document.createElement('textarea');
        notesBox.classList.add('notes-box');
        notesBox.placeholder = 'Add your...';
        notesBox.style.display = 'none'; // إخفاء مبدئياً
        notesBox.value = task.notes || ''; // تحميل الملاحظات المحفوظة

        taskItem.appendChild(notesBox); // إضافة صندوق الملاحظات إلى عنصر المهمة

        taskList.appendChild(taskItem);
    }

    // **تعديل دالة toggleDone للتعامل مع مربع الاختيار**
    function toggleDone(taskId, isChecked) {
        let tasks = getTasks();
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.done = isChecked; // تعيين حالة المهمة بناءً على isChecked
            }
            return task;
        });
        saveAllTasks(tasks);
        updateTaskDisplay(taskId);
    }

    function updateTaskDisplay(taskId) {
        const taskItem = taskList.querySelector(`[data-id="${taskId}"]`);
        if (taskItem) {
            const task = getTasks().find(t => t.id === taskId);
            if (task) {
                if (task.done) {
                    taskItem.classList.add('Done'); // إضافة كلاس Done
                } else {
                    taskItem.classList.remove('Done'); // إزالة كلاس Done
                }
                // التأكد من تزامن مربع الاختيار مع حالة المهمة
                taskItem.querySelector('.task-checkbox').checked = task.done;
            }
        }
    }

    function removeTask(taskId) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.id !== taskId);
        saveAllTasks(tasks);
        taskList.querySelector(`[data-id="${taskId}"]`).remove();
    }

    // **دالة لتبديل رؤية صندوق الملاحظات**
    function toggleNotesBox(taskItem) {
        const notesBox = taskItem.querySelector('.notes-box');
        if (notesBox.style.display === 'none') {
            notesBox.style.display = 'block'; // إظهار الصندوق
            notesBox.focus(); // تركيز المؤشر على الصندوق
        } else {
            notesBox.style.display = 'none'; // إخفاء الصندوق
        }
    }

    // **دالة لحفظ الملاحظات**
    function saveNotes(taskId, notesContent) {
        let tasks = getTasks();
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                task.notes = notesContent;
            }
            return task;
        });
        saveAllTasks(tasks);
    }

    // دوال التعامل مع Local Storage
    function getTasks() {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    }

    function saveTask(task) {
        const tasks = getTasks();
        tasks.push(task);
        saveAllTasks(tasks);
    }

    function saveAllTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => renderTask(task));
    }
});