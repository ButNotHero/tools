import type { ClassModsOptions } from '@/types';

/**
 * Получить модификаторы CSS-класса
 * @param prefix Название класса
 * @param mods Модификаторы
 * @param options Настройки
 */
export const getClassMods = (
  prefix: string,
  mods: string | string[],
  options: ClassModsOptions = {},
): string => {
  if (!mods) return '';

  const { divider = '--', ignorePrefix = 'i-' } = options;

  if (typeof mods === 'string' && mods.substring(0, ignorePrefix.length) !== ignorePrefix)
    return `${prefix}${divider}${mods}`;

  if (Array.isArray(mods)) {
    let result = '';
    mods.forEach((mod) => {
      if (mod.substring(0, ignorePrefix.length) !== ignorePrefix) {
        result += `${prefix}${divider}${mod} `;
      }
    });
    return result;
  }

  return '';
};

/**
 * Получить модификаторы для иконки по префиксу
 * @param mods Модификаторы
 * @param prefix Префикс
 */
export const getIconClassMods = (mods: string | string[], prefix = 'i-'): string | string[] => {
  if (!mods) return '';

  if (typeof mods === 'string' && mods.substring(0, prefix.length) === prefix)
    return mods.replace(prefix, '');

  if (Array.isArray(mods)) {
    const result: string[] = [];
    mods.forEach((mod) => {
      if (mod.substring(0, prefix.length) === prefix) {
        result.push(mod.replace(prefix, ''));
      }
    });

    return result;
  }

  return '';
};

/**
 * Является ли код ответа ошибочным
 * @param code Код ответа
 */
export const isErrorHttp = (code: number): boolean => {
  const _code = Number(code);
  return _code >= 400 && _code <= 599 && _code !== 0;
};

/**
 * Получить массив месяцев между двумя датами
 * @param startDate Дата начала
 * @param endDate Дата конца
 */
export const getDateRange = (startDate, endDate) => {
  const start = startDate.split('-');
  const end = endDate.split('-');
  const startYear = parseInt(start[0]);
  const endYear = parseInt(end[0]);
  const dates: string[] = [];

  for (let i = startYear; i <= endYear; i++) {
    const endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    const startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      const month = j + 1;
      const displayMonth = month < 10 ? '0' + month : month;
      dates.push([i, displayMonth, '01'].join('-'));
    }
  }
  return dates;
};

/**
 * Получить массив дней между двумя датами
 * @param startDate Дата начала
 * @param endDate Дата конца
 */
export const getDateDaysRange = (startDate, endDate) => {
  const arr: Date[] = [];
  const dt = new Date(startDate);
  for (; dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};
