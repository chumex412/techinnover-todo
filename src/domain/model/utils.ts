export class DateFormatOptions {
  format: Intl.DateTimeFormatOptions
  constructor(
    day?: 'numeric' | '2-digit',
    month?: 'numeric' | '2-digit' | 'long' | 'short',
    year?: 'numeric' | '2-digit',
    //weekday?: 'long' | 'short' | 'narrow',
    minute?: 'numeric' | '2-digit',
    hour?: 'numeric' | '2-digit'
  ) {
    this.format = { year, month, day }

    if (hour) this.format.hour = hour

    if (minute) this.format.minute = minute
  }

  useFormat(): Intl.DateTimeFormatOptions {
    return this.format
  }
}
