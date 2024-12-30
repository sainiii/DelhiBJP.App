import { Injectable } from '@angular/core';
import { parseISO, format, set } from 'date-fns';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {

  constructor() { }

  /**
   * Convert local date-time (from Ionic datetime component) to UTC format
   * @param localDateTime - The date-time string from the Ionic datetime component
   * @param timeZone - The user's timezone (e.g., 'America/New_York')
   * @returns - UTC date-time string
   */
  convertToUtc(localDateTime: string): string {
    if (!localDateTime.includes('Z')) {
      localDateTime = localDateTime + 'Z';
    }
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = fromZonedTime(localDateTime, userTimeZone);
    return zonedDate.toISOString();
  }

  /**
   * Convert UTC date-time to user's local timezone
   * @param utcDateTime - The UTC date-time string
   * @returns - Local date-time string in the specified timezone
   */
  convertToLocal(utcDateTime: string): string {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // const utcDate = parseISO(utcDateTime);
    if (!utcDateTime.includes('Z')) {
      utcDateTime = utcDateTime + 'Z';
    }
    const zonedDate = toZonedTime(utcDateTime, userTimeZone);
    return format(zonedDate, 'yyyy-MM-dd\'T\'HH:mm:ssxxx');
  }

  /**
   * Convert time in a date-time variable to zero
   * @param date 
   * @returns - Date without time, time converted to zeros
   */
  convertTimeZero(date: Date): Date {
    return set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
  }

  /**
   * Convert time in a date-time to max time i.e. 23:59:59:999
   * @param date 
   * @returns - Date with time, time converted to max time
   */
  convertTimeMax(date: Date): Date {
    return set(date, { hours: 23, minutes: 59, seconds: 59, milliseconds: 0 });
  }
}
