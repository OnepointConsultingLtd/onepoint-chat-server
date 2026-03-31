export interface OscaWidgetInitOptions {
  /** Defaults to `VITE_CLERK_PUBLISHABLE_KEY` at build time. Host domains must be allowed in Clerk. */
  clerkPublishableKey?: string;
  httpUrl?: string;
  websocketUrl?: string;
  /** Mount point; if missing, a `div#osca-widget-root` is appended to `document.body`. */
  target?: string | HTMLElement;
}
