export default function formatDateTime() {
  const currentDate = new Date();
  
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months in JavaScript are zero-indexed.
  const year = currentDate.getFullYear();
  
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
  
  return formattedDateTime;
}

console.log(formatDateTime());

