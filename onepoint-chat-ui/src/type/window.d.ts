export interface OscaChatConfig {
  websocketUrl: string;
  httpUrl: string;
}
declare global {
  interface Window {
    barrier: boolean;
    oscaConfig: OscaChatConfig;
    /** Set before the app bundle loads (host page, loader script, or inline embed). */
    __OSCA_CONFIG__?: OscaChatConfig;
  }
}
