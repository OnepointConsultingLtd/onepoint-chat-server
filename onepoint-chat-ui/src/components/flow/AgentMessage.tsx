import { useTenantBranding } from '../../hooks/useTenantBranding';
import { PROJECT_INFO } from '../../lib/constants';
import { Message } from '../../type/types';
import BaseMessage from './BaseMessage';

export default function AgentMessage({ message, readOnly }: { message: Message; readOnly?: boolean }) {
  const branding = useTenantBranding();
  const assistantName = branding?.assistantName?.trim() || PROJECT_INFO.NAME;
  const assistantBadge = branding?.assistantBadge?.trim() || 'AI advisor';

  const header = (
    <div className="flex items-center">
      <div className="text-xs font-medium uppercase tracking-wider text-[color:var(--osca-accent)] dark:text-[color:var(--osca-accent)]">
        {assistantName}
      </div>
      <div
        className="ml-1.5 px-1.5 py-0.5 text-[10px] rounded-sm text-[color:var(--osca-accent)] dark:text-[color:var(--osca-accent)]"
        style={{ background: 'color-mix(in srgb, var(--osca-accent) 22%, transparent)' }}
      >
        {assistantBadge}
      </div>
    </div>
  );

  return <BaseMessage message={message} header={header} readOnly={readOnly} />;
}
