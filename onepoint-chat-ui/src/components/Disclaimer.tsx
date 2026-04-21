import { useTenantBranding } from '../hooks/useTenantBranding';
import { PROJECT_INFO } from '../lib/constants';

export default function Disclaimer() {
	const branding = useTenantBranding();
	const custom = branding?.disclaimerText?.trim();
	const assistant = branding?.assistantName?.trim() || PROJECT_INFO.NAME;
	const defaultCopy = `${assistant} can make mistakes. Check important information with your Onepoint advisor.`;

	return (
		<div className="pointer-events-none fixed bottom-4 left-0 right-0 z-[130] text-center mb-2 px-4">
			<div className="mb-1 flex items-center justify-center gap-2 text-[11px] text-[color:var(--osca-text-muted)]/75">
				<kbd className="inline-flex h-5 w-5 items-center justify-center rounded border border-[color:color-mix(in_srgb,var(--osca-border-light)_70%,transparent)] bg-[color:color-mix(in_srgb,var(--osca-bg-light)_85%,transparent)] font-mono text-[10px] dark:border-[color:color-mix(in_srgb,var(--osca-accent)_55%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_70%,transparent)] dark:text-[color:var(--osca-accent)]">←</kbd>
				<kbd className="inline-flex h-5 w-5 items-center justify-center rounded border border-[color:color-mix(in_srgb,var(--osca-border-light)_70%,transparent)] bg-[color:color-mix(in_srgb,var(--osca-bg-light)_85%,transparent)] font-mono text-[10px] dark:border-[color:color-mix(in_srgb,var(--osca-accent)_55%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_70%,transparent)] dark:text-[color:var(--osca-accent)]">→</kbd>
				<span>navigate messages</span>
			</div>
			<p
				className={
					'text-[10px] md:text-xs text-center text-[color:var(--osca-text-muted)]/90 dark:text-[color:var(--osca-text-on-dark)]/75'
				}
			>
				{custom || defaultCopy}
			</p>
		</div>
	);
}
