export function formatDateTime(dateStr: string | null | undefined): { date: string; time: string } {
  if (!dateStr) return { date: "N/A", time: "" };

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { date: "Invalid date", time: "" };

  const optionsDate: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }; // "5 Oct"
  const optionsTime: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false }; // "14:30"

  return {
    date: date.toLocaleDateString("fr-FR", optionsDate),
    time: date.toLocaleTimeString("fr-FR", optionsTime),
  };
}

export function formatFullTimeStr(dateStr: string | null | undefined) {
  const date = formatDateTime(dateStr)
  return `${date.date} ${date.time}`
}