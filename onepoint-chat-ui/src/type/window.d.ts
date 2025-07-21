export interface OscaChatConfig {
  websocketUrl: string;
  httpUrl: string;
}
declare global {
  interface Window {
    barrier: boolean;
    oscaConfig: OscaChatConfig;
  }
}
