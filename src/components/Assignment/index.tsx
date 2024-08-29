import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { AssignmentType } from '../../helpers/type';
import { BsCheckCircleFill } from "react-icons/bs";

type AssignmentProps = {
  assignment: AssignmentType;
  toggleCompletion: () => void;
  deleteAssignment: () => void;
  formatDate(date: Date): string | null;
}

export function Assignment({ assignment, toggleCompletion, deleteAssignment, formatDate }: AssignmentProps) {

  return (
    <div className={styles.assignment}>
      <button className={styles.checkContainer} onClick={toggleCompletion}>
        {assignment.completed ? <BsCheckCircleFill /> : <div />}
      </button>

      <p className={assignment.completed ? styles.textCompleted : ""}>{assignment.description}</p>
      <div style={{ display: "flex" }}>
        {assignment.dueDate ? <p className={assignment.completed ? styles.textCompleted : ""}>Deadline: {formatDate(assignment.dueDate)}</p> : ''}
        <button className={styles.deleteButton}>
          <TbTrash size={20} onClick={deleteAssignment} />
        </button>
      </div>
    </div>
  );
}
