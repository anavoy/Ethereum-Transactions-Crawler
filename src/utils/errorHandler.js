/**
 * @param {string} context - Context or location of the error.
 * @param {Error|string} error - Error object or message.
 */
export const logError = (context, error) => {
  const errorMessage = error instanceof Error ? error.message : error;
  const timestamp = new Date().toISOString();

  console.error(`[${timestamp}] [Error] ${context}: ${errorMessage}`);
};
