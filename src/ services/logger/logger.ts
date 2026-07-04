export const logger = {
  // Accepts any number of arguments of any type
  info(...args: unknown[]): void {
    console.log(...args);
  },

  warn(...args: unknown[]): void {
    console.warn(...args);
  },

  error(...args: unknown[]): void {
    console.error(...args);
  },
};
