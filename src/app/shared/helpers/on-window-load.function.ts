export function onWindowLoad(thisArg: any, fn: Function) {
  if (typeof document === 'undefined') { return; }

  const callFn = () => setTimeout(() => fn.apply(thisArg), 800);

  if (document.readyState === 'complete') {
    callFn();
  } else {
    window.addEventListener('load', callFn);
  }
}
