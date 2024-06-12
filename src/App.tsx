import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import { useState } from "react";
import { AssignmentType } from './helpers/type';


function App() {
  const [assignments, setAssignments] = useState<AssignmentType[]>([]);
  return (
    <>
      <Header setAssignments={setAssignments}/>
      <Assignments assignments={assignments} setAssignments={setAssignments}/>
    </>
  );
}

export default App;
