type ArgDate = Date | string;

export class DateService {
  private readonly date: Date | undefined;

  constructor(date: ArgDate = '') {
    if (date && typeof date === 'string') {
      this.date = new Date(date);
    } else if (typeof date === 'object') {
      this.date = date;
    }
  }

  private getDate(date?: ArgDate): Date | undefined {
    if (!date) return undefined;
    if (typeof date === 'string') {
      try {
        return new Date(date);
      } catch (e) {
        console.error('Cannot transform string to date', e);
        return undefined;
      }
    } else if (typeof date === 'object' && date?.getDate()) {
      return date;
    } else {
      return undefined;
    }
  }

  private getTwoNumberDateValue(value: number): string | number {
    if (value < 10) return `0${value}`;
    return value;
  }

  public humanDate(date?: ArgDate): string {
    const _date = this.getDate(date);
    if (!_date) return '';

    try {
      if (typeof date === 'string') return '';

      const dd: string | number = this.getTwoNumberDateValue(_date.getDate());
      const mm: string | number = this.getTwoNumberDateValue(_date.getMonth() + 1);
      const yy: string | number = this.getTwoNumberDateValue(_date.getFullYear());
      // const yy: string | number = checkDateValue(date.getFullYear() % 100);

      return `${dd}.${mm}.${yy}`;
    } catch (e) {
      console.error('Human date', e);
      return '';
    }
  }

  public humanTime(date?: ArgDate): string {
    const _date = this.getDate(date);
    if (!_date) return '';

    try {
      let result = '';

      const startHours = this.getTwoNumberDateValue(_date.getHours());
      const startMinutes = this.getTwoNumberDateValue(_date.getMinutes());
      result = `${startHours}:${startMinutes}`;

      return result;
    } catch (e) {
      console.error('Ошибка при парсинге времени', e);
      return '';
    }
  }

  public humanDateTime(date?: ArgDate): string {
    const _date = this.humanDate(date);
    const time = this.humanTime(date);

    return `${_date} ${time}`;
  }

  public isoDate(date?: ArgDate): string {
    const _date = this.getDate(date);
    if (!_date) return '';

    const pad = (number) => {
      if (number < 10) {
        return `0${number}`;
      }
      return number;
    };

    return `${_date.getFullYear()}-${pad(_date.getMonth() + 1)}-${pad(_date.getDate())}T${pad(
      _date.getHours(),
    )}:${pad(_date.getMinutes())}:${pad(_date.getSeconds())}.${(_date.getMilliseconds() / 1000)
      .toFixed(3)
      .slice(2, 5)}`;
  }
}

export const dateService = new DateService();
