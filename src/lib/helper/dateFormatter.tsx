export const formatDate = (isoDateString: string, addDays = 0): string => {
  const date = new Date(isoDateString);
  date.setDate(date.getDate() + addDays); // Tambah hari

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
