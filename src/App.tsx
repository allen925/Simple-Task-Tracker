import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { AssignmentType } from './helpers/type';
import "react-day-picker/dist/style.css";

function App() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);

  return (
    <>
      <Header setAssignments={setAssignments} />
      <Assignments assignments={assignments} setAssignments={setAssignments} />
    </>
  );
}

export default App;


/**
 * structure (props): 
 * App -> Header (setAssignments)                   
 *        -> Calendar (selectedDate, setSelectedDate, setIsPickerOpen)
 *     -> Assignments (assignments, setAssignments) 
 *        -> Assignment (assignment, toggleCompletion, deleteAssignment)
 */