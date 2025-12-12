import { useCallback } from 'react';

const useEnterKey = (onSubmit: (e: React.FormEvent) => void) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        onSubmit(e);
      }
    },
    [onSubmit],
  );
  return handleKeyDown;
};

export default useEnterKey;
