export function vibrate(duration: number = 100): void {
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.vibrate) { return; }

  window.navigator.vibrate(duration);
}
