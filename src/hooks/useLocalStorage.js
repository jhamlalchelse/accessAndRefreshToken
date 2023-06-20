import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
  // SSR in Next.js
  if (typeof window === undefined) return initValue;

  // if value is already store in local storage
  const localValue = JSON.parse(localStorage.getItem(key));
  if (localValue) return localValue;

  // return result of function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

const useLocalStorage = (key, initVal) => {
  const [value, setValue] = useState(() => {
    return getLocalValue(key, initVal);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
