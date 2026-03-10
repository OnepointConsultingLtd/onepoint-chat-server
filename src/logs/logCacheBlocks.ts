import { SystemBlock } from "../types";
import Anthropic from "@anthropic-ai/sdk";

export function logCacheBlocks(systemBlocks: SystemBlock[], messages: Anthropic.MessageParam[]) {
	let cacheCount = 0;
  
	console.log("── Cache blocks audit ──────────────────");
  
	// Check system blocks
	systemBlocks.forEach((block, i) => {
	  const cached = !!block.cache_control;
	  if (cached) cacheCount++;
	  console.log(`System block ${i + 1}: ${cached ? "✅ cached" : "❌ no cache"} | ~${block.text.split(" ").length} words`);
	});
  
	// Check message blocks
	messages.forEach((msg, i) => {
	  if (Array.isArray(msg.content)) {
		msg.content.forEach((block: any) => {
		  const cached = !!block.cache_control;
		  if (cached) cacheCount++;
		  console.log(`Message block [${i}] (${msg.role}): ${cached ? "✅ cached" : "❌ no cache"}`);
		});
	  }
	});
  
	console.log(`Total cache blocks: ${cacheCount}/4`);
	console.log("────────────────────────────────────────");
  }