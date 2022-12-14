import { useEffect, useRef } from "react";

export const usePrevValue = <T>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current ?? null;
};
