import styles from "./header.module.css";
import { AiOutlinePlusCircle, AiOutlineCalendar } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useState } from "react";
import { AssignmentType } from '../../helpers/type';
import { DayPicker } from "react-day-picker";

type HeaderProps = {
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentType[]>>;
};

export function Header({ setAssignments }: HeaderProps) {
  const [answer, setAnswer] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (answer == '' && e.target.value == ' ')
      return;
    setAnswer(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (answer) {
      setAssignments(prevAssignments => [...prevAssignments, { description: answer, completed: false, dueDate: selectedDate }]);
      setAnswer('');
    } else {
      setError('Please enter a valid assignment name.');
    }
  }

  const toggleDatePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    toggleDatePicker();  // Optionally close the picker on selection
  };

  return (
    <header className={styles.header}>
      {/* This is simply to show you how to use helper functions */}
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input placeholder="Add a new assignment" type="text" value={answer} onChange={handleInputChange} />
        <div>
          <button type="button" className={styles.toggleButton} onClick={toggleDatePicker}>
            <AiOutlineCalendar size={20} />
          </button>
          {isPickerOpen && (
            <div className={styles.datePickerContainer}>
              <DayPicker mode="single" selected={selectedDate} onSelect={handleDateChange} />
            </div>
          )}
        </div>



        {/* <button style="anchor-name: --anchor-btn-1" popovertarget="my-tooltip-1">
          <p aria-hidden="true">?</p>
        </button>
        <div id="my-tooltip-1" className="tooltip" style="position-anchor: --anchor-btn-1" popover>
          <p>The sun dipped, fiery orange melting into buttery yellow. Maya mirrored the hues on canvas, each stroke bittersweet – fleeting beauty, a day gone. Yet, she painted on, for in those streaks lay the promise of a new dawn.</p>
        </div> */}

        <button disabled={
          answer.length === 0}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </header>
  );
}
