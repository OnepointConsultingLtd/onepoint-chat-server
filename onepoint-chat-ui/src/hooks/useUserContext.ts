import { useUser, useSession } from '@clerk/clerk-react';
import { useRef, useEffect } from 'react';

export function useUserContext() {
  const { isSignedIn, isLoaded } = useUser();
  const { session } = useSession();
  const anonymousIdRef = useRef<string | null>(localStorage.getItem('anonymousId'));

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      if (!anonymousIdRef.current) {
        const newId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('anonymousId', newId);
        anonymousIdRef.current = newId;
      }
    } else if (isSignedIn) {
      localStorage.removeItem('anonymousId');
      anonymousIdRef.current = null;
    }
  }, [isSignedIn, isLoaded]);

  const result = {
    userId: session?.user?.id || null,
    isSignedIn: isSignedIn || false,
    isLoaded,
    anonymousId: anonymousIdRef.current,
  };
  
  return result;
}
