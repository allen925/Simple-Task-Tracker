import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { AssignmentType } from '../../helpers/type';

type assignmentTypeListP = {
  assignments: AssignmentType[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentType[]>>;
};

export function Assignments({ assignments, setAssignments }: assignmentTypeListP) {

  const completedCount = assignments.reduce((count, assignment) => {
    return count + (assignment.completed ? 1 : 0);
  }, 0);

  const toggleCompletion = (index: number) => {
    setAssignments(currentAssignments =>
      currentAssignments.map((assignment, i) =>
        i === index ? { ...assignment, completed: !assignment.completed } : assignment
      )
    );
  };

  const deleteAssignment = (index: number) => {
    setAssignments(currentAssignments =>
      currentAssignments.filter((_, i) => i !== index)
    );
  };

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{completedCount} of {assignments.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assignments.map((assignment, index) => (
          <Assignment assignment={assignment} key={index} toggleCompletion={() => toggleCompletion(index)} deleteAssignment={() => deleteAssignment(index)}/>
        ))}
      </div>
    </section>
  );
}
