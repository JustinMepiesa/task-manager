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
}

export function deleteTask(id: number): void {
    tasks = tasks.filter((task) => {
        return task.id !== id;
    });
}

export function toggleTask(id: number): void {
    const task = tasks.find((task) => { return task.id === id });

    if(task) {
        task.completed = !task.completed;
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