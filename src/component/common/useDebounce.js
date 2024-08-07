import { useEffect, useState } from "react";

export const useDebounce = (input, timer = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(input);
  useEffect(() => {
    let timeout = setTimeout(() => {
    //   if (!input) return;
      setDebouncedValue(input);
    }, timer);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);
  return debouncedValue;
};
