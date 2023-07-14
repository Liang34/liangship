import { useEffect } from 'react';
// @ts-ignore
export function useListener(node, eventName: string, callback: (e?: any) => {} | void, condition: boolean) {
  useEffect(() => {
    if (condition) {
      window.addEventListener(eventName, callback, false);

      return () => {
        window.removeEventListener(eventName, callback, false);
      }
    }
  }, [condition]);
}