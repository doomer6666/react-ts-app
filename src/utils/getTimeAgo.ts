const getRussianWordForm = (
  number: number,
  forms: [string, string, string],
): string => {
  const rem10 = number % 10;
  const rem100 = number % 100;

  if (rem10 === 1 && rem100 !== 11) {
    return forms[0];
  }

  if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 >= 20)) {
    return forms[1];
  }

  return forms[2];
};

const getTimeAgo = (time: string): string => {
  const date = new Date(time + 'Z');
  const now = new Date();

  const nowInUTC = new Date(now.toISOString());
  const diffMs = nowInUTC.getTime() - date.getTime();

  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) {
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} ${getRussianWordForm(diffMonths, ['месяц', 'месяца', 'месяцев'])} назад`;
  }
  if (diffDays >= 1) {
    return `${diffDays} ${getRussianWordForm(diffDays, ['день', 'дня', 'дней'])} назад`;
  }
  if (diffHours >= 1) {
    return `${diffHours} ${getRussianWordForm(diffHours, ['час', 'часа', 'часов'])} назад`;
  }
  if (diffMins >= 1) {
    return `${diffMins} ${getRussianWordForm(diffMins, ['минуту', 'минуты', 'минут'])} назад`;
  }

  return 'только что';
};

export default getTimeAgo;
