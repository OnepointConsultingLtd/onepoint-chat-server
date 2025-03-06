"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function loadKnowledgeBase() {
    console.log("Starting to load knowledge base...");
    const knowledgeBase = {};
    const files = fs_1.default.readdirSync('./src/knowledge-base');
    console.log("Found knowledge base files:", files);
    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = fs_1.default.readFileSync(path_1.default.join('./src/knowledge-base', file), 'utf-8');
            knowledgeBase[file.replace('.md', '')] = content;
        }
    }
    return knowledgeBase;
}
exports.default = loadKnowledgeBase;
