import { addTask, deleteTask, toggleTask, getTasks, getCompletedTasks, getPendingTasks} from "./taskManager.js";
import type { Task } from "./types/task.js";

const taskForm = document.querySelector<HTMLFormElement>("#task-form");
const taskInput = document.querySelector<HTMLInputElement>("#task-input");
const taskList = document.querySelector<HTMLElement>("#task-list");
const filterAll = document.querySelector<HTMLButtonElement>("#filter-all");
const filterPending = document.querySelector<HTMLButtonElement>("#filter-pending");
const filterCompleted = document.querySelector<HTMLButtonElement>("#filter-completed");

if (!taskForm || !taskInput) {
    throw new Error("Required form elements were not found.");
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) return;

    addTask(title);
    renderTasks(getTasks(), "all");
    
    taskInput.value = "";
});

type TaskFilter = "pending" | "completed" | "all";

function renderTasks(taskArray: Task[], filter: TaskFilter): void {

    if(!taskList) {
        return;
    }

    taskList.innerHTML = "";

    if(taskArray.length === 0) {
        const li = document.createElement("li");

        if(filter === "all") {
            li.textContent = "No tasks yet. Add your first task!";
        } else if(filter === "completed"){
            li.textContent = "No completed tasks yet!";
        } else {
            li.textContent = "No pending tasks!";
        }

        taskList.appendChild(li);

        return;
    }

    taskArray.forEach((task) => {
        const li = document.createElement("li");
        li.dataset.id = String(task.id);

        const taskTitle = document.createElement("span");

        taskTitle.textContent = task.title;

        const completeTaskButton = document.createElement("button");
        completeTaskButton.textContent = task.completed ? "Undo" : "Complete";

        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.textContent = "Delete";

        if(task.completed) {
            taskTitle.style.textDecoration = "line-through";
            taskTitle.style.color = "gray";
        }

        completeTaskButton.addEventListener("click", () => {
            const taskId = Number(li.dataset.id);

            toggleTask(taskId);
            renderTasks(getTasks(), "all");
        });

        deleteTaskButton.addEventListener("click", () => {
            const taskId = Number(li.dataset.id);
            deleteTask(taskId);
            renderTasks(getTasks(), "all");
        });

        li.appendChild(taskTitle);
        li.appendChild(completeTaskButton);
        li.appendChild(deleteTaskButton);
        taskList.appendChild(li);
    })
}

filterAll?.addEventListener("click", () => {
    renderTasks(getTasks(), "all");
});

filterCompleted?.addEventListener("click", () => {
    renderTasks(getCompletedTasks(), "completed");
});

filterPending?.addEventListener("click", () => {
    renderTasks(getPendingTasks(), "pending");
});

renderTasks(getTasks(), "all");