import fs from 'fs';
import path from 'path';

async function loadKnowledgeBase(): Promise<{ [key: string]: string }> {
    console.log("Starting to load knowledge base...");
    const knowledgeBase: { [key: string]: string } = {};
    const files = fs.readdirSync('./src/knowledge-base');

    console.log("Found knowledge base files:", files); 

    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = fs.readFileSync(path.join('./src/knowledge-base', file), 'utf-8');
            knowledgeBase[file.replace('.md', '')] = content;
        }
    }

    return knowledgeBase;
}


export default loadKnowledgeBase;
