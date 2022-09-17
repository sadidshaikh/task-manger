const taskIdDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlertDOM = document.querySelector('.form-alert');
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id: taskID, name, completed } = task;

        taskIdDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        if (completed) {
            taskCompletedDOM.checked = true;
        }
    } catch (err) {
        console.log(err);
    }
};
showTask();


// Update task
editFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    editBtnDOM.textContent = 'Loading...';
    try {
        const config = {
            method: 'patch',
            data: {
                name: taskNameDOM.value,
                completed: taskCompletedDOM.checked
            }
        }
        const { data: task } = await axios(`/api/v1/tasks/${id}`, config);
        const { _id: taskID, completed, name } = task;

        taskIdDOM.textContent = taskID
        taskNameDOM.value = name
        tempName = name
        
        if (completed) {
            taskCompletedDOM.checked = true
        }

        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'success, edited task';
        formAlertDOM.classList.add('text-success');

    } catch (err) {
        formAlertDOM.style.display = 'block';
        taskNameDOM.value = tempName;
        formAlertDOM.innerHTML = `error, please try again later`;
    }
    setInterval(() => { editBtnDOM.textContent = 'edit'; }, 1000);
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success');
    }, 3000);
})