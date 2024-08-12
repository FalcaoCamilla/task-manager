export function FormatDate(date: Date): string {
  //to do
  const month = String(date.getMonth() + (date.getMonth() === 0 ? 1 : 0)).padStart(2, '0'); //Garante que exiba dois dígitos e inclua o '0' caso necessário
  const day = String(date.getDate()).padStart(2, '0');

  return `${day}/${month}`;
}