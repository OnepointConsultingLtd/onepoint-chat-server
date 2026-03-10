const WELCOME_PREFIX = "Welcome to Onepoint. I'm Osca — your advisor for data";

export function isWelcomeMessage(content: string | undefined): boolean {
  if (!content || typeof content !== "string") return false;
  return content.startsWith(WELCOME_PREFIX) || content.includes(WELCOME_PREFIX);
}
