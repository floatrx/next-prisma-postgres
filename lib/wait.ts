/**
 * Wait for a given amount of time
 * @param ms - milliseconds (default: 1s)
 */
export const wait = (ms: number = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
