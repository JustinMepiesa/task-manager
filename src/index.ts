import { addTask, deleteTask, toggleTask, getTasks, getCompletedTasks, getPendingTasks} from "./taskManager.js";

addTask("Learn TypeScript");
addTask("Build Task Manager");
addTask("Edit Design Page");

toggleTask(1);

console.log("Completed:", getCompletedTasks());
console.log("Pending:", getPendingTasks());