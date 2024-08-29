import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { AssignmentType } from '../../helpers/type';
import { formatDate } from "../../helpers/helpers";
import { useEffect, useState } from "react";

type assignmentTypeListP = {
  assignments: AssignmentType[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentType[]>>;
};

export function Assignments({ assignments, setAssignments }: assignmentTypeListP) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => { setIsMobile(window.innerWidth < 700); };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <p className={isMobile ? styles.showOnMobile : ""}>Created {isMobile ? "" : "Assignments"}</p>
          <span>{assignments.length}</span>
        </div>
        <div>
          <p className={`${styles.textPurple} ${isMobile ? styles.showOnMobile : ""}`}>Completed {isMobile ? "" : "Assignments"}</p>
          <span>{completedCount} of {assignments.length}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assignments.map((assignment, index) => (
          <Assignment assignment={assignment} key={index} toggleCompletion={() => toggleCompletion(index)} deleteAssignment={() => deleteAssignment(index)} formatDate={formatDate} />
        ))}
      </div>
    </section>
  );
}
