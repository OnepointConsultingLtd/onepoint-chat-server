export function isWelcomeMessage(content: string | undefined): boolean {
  return !!content?.includes("Welcome to Onepoint");
}
