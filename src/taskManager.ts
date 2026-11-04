import { type Task } from "./types/task.js";

let tasks: Task[] = [];
let nextId = 1;

export function addTask(title: string): void {
    const newTask: Task = {
        id: nextId++,
        title: title,
        completed: false
    }

    tasks.push(newTask);
    saveTasks();
}

export function deleteTask(id: number): void {
    tasks = tasks.filter((task) => {
        return task.id !== id;
    });
    saveTasks();
}

export function toggleTask(id: number): void {
    const task = tasks.find((task) => { return task.id === id });

    if(task) {
        task.completed = !task.completed;
        saveTasks();
    }
}

export function getCompletedTasks(): Task[] {
    return tasks.filter((task) => {
        return task.completed === true;
    });
}

export function getPendingTasks(): Task[] {
    return tasks.filter((task) => {
        return task.completed === false;
    });
}
 
export function getTasks(): Task[] {
    return tasks;
}

function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));   
}

export function loadTasks(): void {
    const savedTasks = localStorage.getItem("tasks");

    try {
        if(savedTasks) {
            tasks = JSON.parse(savedTasks) as Task[]; 
        } else {
            nextId = 1;
        }
    } catch (error) {
        tasks = [];
        nextId = 1;
    }

    const taskIds = tasks.map((task) => {
        return task.id;
    });

    if(taskIds.length > 0) {
        const highestId = Math.max(...taskIds);
        nextId = highestId + 1;
    }
}

