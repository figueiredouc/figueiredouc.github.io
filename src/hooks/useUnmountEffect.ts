import { useEffect } from 'react';

const useUnmountEffect = (fn: () => void) => {
  useEffect(() => {
    return () => fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useUnmountEffect;
