import { useSyncExternalStore } from 'react';
import type { TenantPublicBranding } from '../type/tenantUi';
import { getTenantUiRevision, subscribeTenantUi } from '../lib/tenantBrandingRuntime';

/**
 * Re-renders when tenant context hydration completes (e.g. SharePage) so branding updates.
 */
export function useTenantBranding(): TenantPublicBranding | undefined {
  const revision = useSyncExternalStore(subscribeTenantUi, getTenantUiRevision, () => 0);
  void revision;
  return typeof window !== 'undefined' ? window.oscaTenantUi?.branding : undefined;
}
