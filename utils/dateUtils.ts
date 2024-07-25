export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Membuat fungsi untuk mengonversi waktu ke format ISO string lokal
export const toLocalISOString = (date: Date) => {
  const pad = (num: number) => (num < 10 ? "0" : "") + num;

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // bulan dalam JavaScript dimulai dari 0
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5);

  const timezoneOffset = -date.getTimezoneOffset();
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
  const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${sign}${offsetHours}:${offsetMinutes}`;
};

export const getCurrentMount = () => {
  const d = new Date();
  const currMonth = d.getMonth();
  return currMonth;
};

export const getCurrentYear = () => {
  const d = new Date();
  return d.getFullYear();
};
