import type { Node } from '@xyflow/react';

type SearchHandlers = {
  search: (query: string) => Node[];
  focusNode: (node: Node) => void;
  getResultLabel: (node: Node) => string;
};

let _handlers: SearchHandlers | null = null;

export const searchBridge = {
  register(h: SearchHandlers) { _handlers = h; },
  unregister() { _handlers = null; },
  search(q: string): Node[] { return _handlers?.search(q) ?? []; },
  focusNode(node: Node) { _handlers?.focusNode(node); },
  getResultLabel(node: Node): string { return _handlers?.getResultLabel(node) ?? node.id; },
  isReady(): boolean { return _handlers !== null; },
};
