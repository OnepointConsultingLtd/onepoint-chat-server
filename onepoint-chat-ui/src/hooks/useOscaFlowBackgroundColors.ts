import { useMemo, useSyncExternalStore } from 'react';
import { getTenantUiRevision, subscribeTenantUi } from '../lib/tenantBrandingRuntime';

function readShellColors(): { light: string; dark: string } {
  if (typeof document === 'undefined') {
    return { light: '#fafffe', dark: '#1F1925' };
  }
  const s = getComputedStyle(document.documentElement);
  return {
    light: s.getPropertyValue('--osca-bg-light').trim() || '#fafffe',
    dark: s.getPropertyValue('--osca-bg-dark').trim() || '#1F1925',
  };
}

/** For @xyflow Background `color` prop (needs computed hex/rgb, not CSS `var()` in some builds). */
export function useOscaFlowBackgroundColors(): { light: string; dark: string } {
  const rev = useSyncExternalStore(subscribeTenantUi, getTenantUiRevision, () => 0);
  return useMemo(() => readShellColors(), [rev]);
}
