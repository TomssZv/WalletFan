const formatDate = (date: string) => {
  const originalDate = new Date(date);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[originalDate.getMonth()];
  const day = originalDate.getDate();
  const year = originalDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

export default formatDate;
