import { Task } from "../Task";
import styles from "./tasks.module.css";
import { TaskType } from '../../helpers/type';
import { useEffect, useState } from "react";

type taskTypeListP = {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export function Tasks({ tasks, setTasks }: taskTypeListP) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => { setIsMobile(window.innerWidth < 700); };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const completedCount = tasks.reduce((count, task) => {
    return count + (task.completed ? 1 : 0);
  }, 0);

  const toggleCompletion = (index: number) => {
    setTasks(currentTasks =>
      currentTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index: number) => {
    setTasks(currentTasks =>
      currentTasks.filter((_, i) => i !== index)
    );
  };

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p className={isMobile ? styles.showOnMobile : ""}>Created {isMobile ? "" : "Tasks"}</p>
          <span>{tasks.length}</span>
        </div>
        <div>
          <p className={`${styles.textPurple} ${isMobile ? styles.showOnMobile : ""}`}>Completed {isMobile ? "" : "Tasks"}</p>
          <span>{completedCount} of {tasks.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task, index) => (
          <Task task={task} key={index} toggleCompletion={() => toggleCompletion(index)} deleteTask={() => deleteTask(index)} />
        ))}
      </div>
    </section>
  );
}
