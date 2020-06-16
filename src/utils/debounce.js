export default function debounce(callback, timeout) {
  var timeoutRef = null;
  return function (...args) {
    clearTimeout(timeoutRef);
    timeoutRef = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
}
