import React, { useEffect, useState } from 'react';
import { CalendarDay, DayPicker, Modifiers } from "react-day-picker";
import styles from "./calendar.module.css";
interface DayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  day: CalendarDay;
  modifiers: Modifiers;
}

type params = {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setIsPickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Calendar({ selectedDate, setSelectedDate, setIsPickerOpen }: params) {
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const match = window.matchMedia('(hover: none)').matches;
    setIsMobile(match);
  }, []);

  const handleDateChange = (date: Date | undefined) => {
    // Toggle the selected date if the same date is clicked again (to deselect on mobile)
    if (selectedDate && date && date.getTime() === selectedDate.getTime()) {
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
    }
    setIsPickerOpen((prev) => !prev);
  };

  const DayButton = ({ day, ...buttonProps }: DayButtonProps) => {
    const isHovered = hoveredDay && day.date.toDateString() === hoveredDay.toDateString();
    const dayStyle: React.CSSProperties = {
      backgroundColor: isHovered ? 'hsl(240, 96%, 67%)' : '',
      color: 'white',
      cursor: 'pointer',
      borderRadius: "10px",
    };

    return isMobile ? (
      // Mobile Button: no hover effects, handle touch interactions
      <button
        {...buttonProps}
        style={dayStyle}
        onClick={() => handleDateChange(day.date)}
      />
    ) : (
      // Non-Mobile Button: includes hover effects
      <button
        {...buttonProps}
        style={dayStyle}
        onMouseEnter={() => setHoveredDay(day.date)}
        onMouseLeave={() => setHoveredDay(null)}
      />
    );
  };

  return (
    <div className={styles.datePickerContainer + ' ' + styles.infobox}>
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={handleDateChange}
        classNames={{
          selected: styles.selected, chevron: styles.chev,
        }}
        components={{
          DayButton: (props) => <DayButton {...props} />
        }}
        styles={{
          day: {
            backgroundColor: "rgb(130, 130, 130)",
            borderRadius: "10px",
            color: "white",
          },
        }}
      />
    </div>
  );
}
