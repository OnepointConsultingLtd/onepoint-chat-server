import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Home from './index.tsx';
import SharePage from './components/SharePage';
import { hydrateOscaTenantProject, resolveOscaConfig } from './lib/resolveOscaConfig';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file (required for widget build)');
}

const MOUNT_ID = 'osca-widget-root';

function getOrCreateMount(): HTMLElement {
  let el = document.getElementById(MOUNT_ID);
  if (!el) {
    el = document.createElement('div');
    el.id = MOUNT_ID;
    document.body.appendChild(el);
  }
  return el;
}

void (async () => {
  resolveOscaConfig();
  await hydrateOscaTenantProject();

  createRoot(getOrCreateMount()).render(
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/share/:token" element={<SharePage />} />
          </Routes>
        </MemoryRouter>
      </ClerkProvider>
    </StrictMode>,
  );
})();
