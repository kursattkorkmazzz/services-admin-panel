export default function DateParser(date?: string | null): string {
  if (!date) {
    return "Belirtilmemiş";
  }
  const dateObject = new Date(Date.parse(date));
  return `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()} - ${dateObject.getHours()}:${dateObject.getMinutes()}`;
}
