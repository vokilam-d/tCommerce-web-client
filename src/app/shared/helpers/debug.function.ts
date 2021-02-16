export const logDebug = (message: string, onlyServer: boolean = true) => {
  return;
  if (onlyServer && typeof window !== 'undefined') { return; }

  console.log(`${new Date().toISOString()} - ${message}`);
}
