const uppercase = (text: string) => {
  return text.toUpperCase();
};

function formatDate(date: Date) {
  if (!date) return null;

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const formattedDate = `${month} ${day} ${year}`;
  return date.getTime() < new Date().setHours(0,0,0,0) ? `${formattedDate} (passed)` : formattedDate;
}

export { uppercase, formatDate };
