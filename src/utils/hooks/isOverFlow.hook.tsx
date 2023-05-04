import * as React from 'react';

export const useIsOverflow = (
  ref: React.RefObject<HTMLElement>,
  callback?: (hasOverflow: boolean) => void
): boolean | undefined => {
  const [isOverflow, setIsOverflow] = React.useState<boolean | undefined>(undefined);

  React.useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current ? current.scrollHeight > current.clientHeight : false;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
