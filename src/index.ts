export * from './date';
import type { ClassModsOptions } from '@/types';

export type ClassMods = undefined | string | string[];

/**
 * Получить модификаторы CSS-класса
 * @param prefix Название класса
 * @param mods Модификаторы
 * @param options Настройки
 */
export const getClassMods = (
  prefix: string,
  mods: ClassMods,
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
export const getIconClassMods = (mods: ClassMods, prefix = 'i-'): string | string[] => {
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
 * Является ли код ответа успешным
 * @param code Код ответа
 */
export const isSuccessHttp = (code: number): boolean => {
  return !isErrorHttp(code);
};

/**
 * Получить дату без времени
 * @param date
 */
const getDateWithoutTime = (date: Date): string => {
  if (!date) return '';

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join(
    '-',
  );
};

/**
 * Получить массив месяцев между двумя датами
 * @param startDate Дата начала
 * @param endDate Дата конца
 */
export const getDateRange = (startDate: string, endDate = ''): string[] => {
  if (!startDate) return [];

  const start = startDate.split('-');
  const end = endDate ? endDate.split('-') : Date().split('-');
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

/**
 * Получить значение в булевом формате
 * @param value Значение
 */
export const getBool = (value: unknown): boolean => {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return false;
};

/**
 * Получить данные из токена
 * @param token Токен
 */
export const parseJwt = <T>(token: string): T | null => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

/**
 * Получить ширину для установки в inline-style
 * @param width Ширина
 * @param unit Единица измерения
 */
export const getStyleWidth = (width: number | string, unit = 'px') => {
  return {
    width: isNaN(<number>width) ? width : `${width}${unit}`,
    'min-width': width,
    'max-width': width,
  };
};

export const windowDefined = (): boolean => typeof window !== 'undefined';

/**
 * Запретить/Разрешить скролл объекта document
 * @param forceType Принудительный запрет или разрешения скролла
 */
export const toggleBodyScroll = (forceType: 'remove' | 'add' | '' = '') => {
  if (!windowDefined()) return;

  if (forceType === 'remove') {
    document.body.style.overflow = 'auto';
    document.body.classList.remove('scrolling-disabled');
    return;
  }
  if (forceType === 'add') {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('scrolling-disabled');
    return;
  }

  const currentOverflow = document.body.style.overflow;

  if (currentOverflow === 'hidden') {
    document.body.style.overflow = 'auto';
  } else {
    document.body.style.overflow = 'hidden';
  }

  document.body.classList.toggle('scrolling-disabled');
};
