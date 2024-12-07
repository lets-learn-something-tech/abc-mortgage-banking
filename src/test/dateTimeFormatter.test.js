import { formatDateToLocale } from '../utils/dateTimeFormatter';

describe('formatDateToLocale', () => {

  beforeEach(() => {
    global.navigator.language = 'en-US';
  });

  it('should format a valid date to the correct locale format', () => {
    const date = '2024-12-07T00:00:00Z';
    const expected = new Intl.DateTimeFormat('en-US').format(new Date(date));

    const result = formatDateToLocale(date);

    expect(result).toBe(expected);
  });

  it('should handle invalid date input and return an invalid date string', () => {
    const invalidDate = 'invalid-date';
    const result = formatDateToLocale(invalidDate);

    expect(result).toBe('Invalid Date');
  });

  it('should return "Invalid Date" if the date is null or undefined', () => {
    const resultNull = formatDateToLocale(null);
    const resultUndefined = formatDateToLocale(undefined);

    expect(resultNull).toBe('Invalid Date');
    expect(resultUndefined).toBe('Invalid Date');
  });

  it('should format the date according to a different locale', () => {
    global.navigator.language = 'fr-FR';

    const date = '2024-12-07T00:00:00Z';
    const expected = new Intl.DateTimeFormat('fr-FR').format(new Date(date));

    const result = formatDateToLocale(date);

    expect(result).toBe(expected);
  });

  it('should handle edge cases where the date is a string with an invalid format', () => {
    const result = formatDateToLocale('2024-13-32');
    
    expect(result).toBe('Invalid Date');
  });

  it('should correctly format a date without time (e.g., only the date part)', () => {
    const date = '2024-12-07';
    const expected = new Intl.DateTimeFormat('en-US').format(new Date(date));

    const result = formatDateToLocale(date);

    expect(result).toBe(expected);
  });

  it('should correctly format a future date', () => {
    const futureDate = '2025-12-07T00:00:00Z';
    const expected = new Intl.DateTimeFormat('en-US').format(new Date(futureDate));

    const result = formatDateToLocale(futureDate);

    expect(result).toBe(expected);
  });

  it('should correctly format a past date', () => {
    const pastDate = '2000-01-01T00:00:00Z';
    const expected = new Intl.DateTimeFormat('en-US').format(new Date(pastDate));

    const result = formatDateToLocale(pastDate);

    expect(result).toBe(expected);
  });

});
