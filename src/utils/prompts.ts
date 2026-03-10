import fs from "fs";
import toml from "@iarna/toml";
import { PromptConfig } from "../types";

let cached: PromptConfig | null = null;

export function readPrompts(): PromptConfig {
  if (cached) return cached;

  const promptFile = process.env.PROMPT_FILE;
  if (!promptFile) throw new Error("PROMPT_FILE env var is not set");
  if (!promptFile.endsWith(".toml"))
    throw new Error("PROMPT_FILE must be a .toml file");

  cached = toml.parse(fs.readFileSync(promptFile, "utf8")) as any;
  return cached!;
}

export function getInitialQuestions(): string[] {
  return readPrompts().basic.initial_questions ?? [];
}

export function getMaxHistorySize(): number {
  return readPrompts().configuration.max_history_size;
}


export function getSystemMessage(): string {
  return readPrompts().basic.system_message ?? "";
}