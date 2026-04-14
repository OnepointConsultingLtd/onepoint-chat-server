import toml from "@iarna/toml";
import { PromptConfig } from "../types";

const DEFAULT_PROMPT_CONFIG: PromptConfig = {
  basic: {
    system_message: "",
    initial_questions: [],
  },
  configuration: {
    max_history_size: 20,
  },
};

function mergePromptConfig(base: PromptConfig, patch: Partial<PromptConfig>): PromptConfig {
  return {
    basic: {
      system_message: patch.basic?.system_message ?? base.basic.system_message,
      initial_questions: patch.basic?.initial_questions ?? base.basic.initial_questions,
    },
    configuration: {
      max_history_size:
        patch.configuration?.max_history_size ?? base.configuration.max_history_size,
    },
  };
}

/**
 * Parse client TOML prompt string from registry into PromptConfig.
 * Empty string yields defaults only.
 */
export function parsePrompt(tomlString: string): PromptConfig {
  const trimmed = tomlString?.trim() ?? "";
  if (!trimmed) {
    return { ...DEFAULT_PROMPT_CONFIG, basic: { ...DEFAULT_PROMPT_CONFIG.basic } };
  }
  try {
    const parsed = toml.parse(trimmed) as Partial<PromptConfig>;
    return mergePromptConfig(DEFAULT_PROMPT_CONFIG, parsed);
  } catch (e) {
    console.error("parsePrompt: invalid TOML, using defaults", e);
    return { ...DEFAULT_PROMPT_CONFIG, basic: { ...DEFAULT_PROMPT_CONFIG.basic } };
  }
}

export function getInitialQuestions(config: PromptConfig): string[] {
  return config.basic.initial_questions ?? [];
}

export function getMaxHistorySize(config: PromptConfig): number {
  return config.configuration?.max_history_size ?? 20;
}

export function getSystemMessage(config: PromptConfig): string {
  return config.basic.system_message ?? "";
}
