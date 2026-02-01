import { useUser, useSession } from '@clerk/clerk-react';
import { useRef, useEffect } from 'react';

export function useUserContext() {
  const { isSignedIn, isLoaded } = useUser();
  const { session } = useSession();
  const anonymousIdRef = useRef<string | null>(null);

  // Generate/retrieve anonymous ID for non-logged-in users
  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      // Generate or retrieve anonymous ID from localStorage
      let anonymousId = localStorage.getItem('anonymousId');
      if (!anonymousId) {
        anonymousId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('anonymousId', anonymousId);
      }
      anonymousIdRef.current = anonymousId;
    } else {
      // Clear anonymous ID when user logs in
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
  
  // Log when values change
  useEffect(() => {
    console.log(`[useUserContext] Returned values - userId: ${result.userId}, anonymousId: ${result.anonymousId}, isSignedIn: ${result.isSignedIn}`);
  }, [result.userId, result.anonymousId, result.isSignedIn]);

  return result;
}
