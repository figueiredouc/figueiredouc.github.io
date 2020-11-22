import { useEffect, useState } from 'react';
import { isString } from 'lodash';

const useSessionStorage = <T>(
  key: string,
  initialValue?: T,
  raw?: boolean
): [T, (value: T) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      const sessionStorageValue = sessionStorage.getItem(key);

      if (!isString(sessionStorageValue)) {
        sessionStorage.setItem(
          key,
          raw ? String(initialValue) : JSON.stringify(initialValue)
        );

        return initialValue;
      }

      return raw ? sessionStorageValue : JSON.parse(sessionStorageValue);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. JSON.parse and JSON.stringify
      // cat throw, too.
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const serializedState = raw ? String(state) : JSON.stringify(state);

      sessionStorage.setItem(key, serializedState);
    } catch {
      // If user is in private mode or has storage restriction
      // sessionStorage can throw. Also JSON.stringify can throw.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return [state, setState];
};

export default useSessionStorage;
