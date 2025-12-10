import { useCallback } from 'react';

const useEnterKey = (onSubmit: () => void) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit();
      }
    },
    [onSubmit],
  );
  return handleKeyDown;
};

export default useEnterKey;
