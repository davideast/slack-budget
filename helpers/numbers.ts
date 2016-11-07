/**
 * Determines if a value is a number or can be casted to a number
 */
export function isNumber(value: any): boolean {
  return !isNaN(value);
}

/**
 * Casts a string value to a number. Returns NaN for non-numeric values.
 */
export function toNumber(value: string): number {
  return parseFloat(value);
}