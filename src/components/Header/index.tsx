import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useState } from "react";
import { AssignmentType } from '../../helpers/type';
// import { DayPicker } from "react-day-picker";

type HeaderProps = {
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentType[]>>;
  // setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  // selectedDate: Date | undefined;, setSelectedDate, selectedDate 
};

export function Header({ setAssignments}: HeaderProps) {
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (answer == '' && e.target.value == ' ')
      return;
    setAnswer(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); 
    if (answer) {
      setAssignments(prevAssignments => [...prevAssignments, {description:answer, completed:false}]);
      setAnswer(''); 
    } else {
      setError('Please enter a valid assignment name.');
    }
  }

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      {/* <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} />; */}
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input placeholder="Add a new assignment" type="text" value={answer} onChange={handleInputChange} />
        <button disabled={
          answer.length === 0}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>} 
    </header>
  );
}
