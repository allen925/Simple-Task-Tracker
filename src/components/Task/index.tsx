import styles from "./task.module.css";
import { TbTrash } from "react-icons/tb";
import { TaskType } from '../../helpers/type';
import { BsCheckCircleFill } from "react-icons/bs";
import { formatDate } from "../../helpers/helpers";

type TaskProps = {
  task: TaskType;
  toggleCompletion: () => void;
  deleteTask: () => void;
}

export function Task({ task, toggleCompletion, deleteTask }: TaskProps) {

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={toggleCompletion}>
        {task.completed ? <BsCheckCircleFill /> : <div />}
      </button>

      <p className={task.completed ? styles.textCompleted : ""}>{task.description}</p>
      <div style={{ display: "flex" }}>
        {task.dueDate ? <p className={task.completed ? styles.textCompleted : ""}>Deadline: {formatDate(task.dueDate)}</p> : ''}
        <button className={styles.deleteButton}>
          <TbTrash size={20} onClick={deleteTask} />
        </button>
      </div>
    </div>
  );
}
