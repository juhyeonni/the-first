export function getFormattedElapsedTime(
  inputdate: Date | number,
  base?: Date | number
): string {
  const date = new Date(inputdate);
  const baseDate = base ? new Date(base) : new Date();
  const diffInSeconds = Math.floor(
    (baseDate.getTime() - date.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    return Math.floor(diffInSeconds / 60) + '분 전';
  } else if (diffInSeconds < 86400) {
    return Math.floor(diffInSeconds / 3600) + '시간 전';
  } else if (diffInSeconds < 604800) {
    return Math.floor(diffInSeconds / 86400) + '일 전';
  } else {
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0') +
      ' ' +
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0')
    );
  }
}
