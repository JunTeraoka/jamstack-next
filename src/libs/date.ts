//日付のフォーマット変更
export const changeFormatDate = (dateString: string, format: string): string => {
  var dateNumber = Date.parse(dateString);
  var date = new Date(dateNumber);
  format = format.replace(/YYYY/, `${date.getFullYear()}`);
  format = format.replace(/MM/, `${date.getMonth()}`);
  format = format.replace(/DD/, `${date.getDate()}`);
  return format;
};
