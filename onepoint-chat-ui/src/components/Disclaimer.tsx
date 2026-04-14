import { useTenantBranding } from '../hooks/useTenantBranding';
import { PROJECT_INFO } from '../lib/constants';

export default function Disclaimer() {
	const branding = useTenantBranding();
	const custom = branding?.disclaimerText?.trim();
	const assistant = branding?.assistantName?.trim() || PROJECT_INFO.NAME;
	const defaultCopy = `${assistant} can make mistakes. Check important information with your Onepoint advisor.`;

	console.log('branding', branding);

	return (
		<div className="pointer-events-none fixed bottom-4 left-0 right-0 z-[130] text-center mb-2 px-4">
			<p
				className={
					'text-[8px] md:text-xs text-center text-slate-600 dark:!text-[color:var(--osca-text-on-dark)] drop-shadow-sm'
				}
			>
				{custom || defaultCopy}
			</p>
		</div>
	);
}
