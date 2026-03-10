import { INITIAL_MESSAGE } from "../lib/constants";

export function isWelcomeMessage(content: string | undefined): boolean {
  return !!content?.includes(INITIAL_MESSAGE);
}
