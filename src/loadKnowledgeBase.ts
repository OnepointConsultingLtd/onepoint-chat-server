import fs from 'fs';
import path from 'path';

async function loadKnowledgeBase(): Promise<{ [key: string]: string }> {
    console.log("Starting to load knowledge base...");
    const knowledgeBase: { [key: string]: string } = {};
    const files = fs.readdirSync('../docs/knowledge-base');

    console.info("Found knowledge base files:", files);

    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = fs.readFileSync(path.join('../docs/knowledge-base', file), 'utf-8');
            knowledgeBase[file.replace('.md', '')] = content;
        }
    }

    return knowledgeBase;
}


export default loadKnowledgeBase;
