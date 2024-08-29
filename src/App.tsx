import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { useState } from "react";
import { TaskType } from './helpers/type';
import "react-day-picker/dist/style.css";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  return (
    <>
      <Header setTasks={setTasks} />
      <Tasks tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;


/**
 * structure (props): 
 * App -> Header (setTasks)                   
 *        -> Calendar (selectedDate, setSelectedDate, setIsPickerOpen)
 *     -> Tasks (tasks, setTasks) 
 *        -> Task (task, toggleCompletion, deleteTask)
 */