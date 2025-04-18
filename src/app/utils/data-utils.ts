export class DataUtils {
  static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static getDateString(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  }

  static getDateFromString(dateString: string): Date {
    const parts = dateString.split('/');
    return new Date(
      parseInt(parts[2], 10),
      parseInt(parts[0], 10) - 1,
      parseInt(parts[1], 10)
    );
  }
}
