import { Handle, Position } from '@xyflow/react';
import React from 'react';

export default function CustomNode({ data }: { data: { content: React.ReactNode } }) {
  return (
    <div className="custom-node rounded-md overflow-hidden">
      {data.content}
      <Handle type="target" position={Position.Top} className="!bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-blue-500" />
    </div>
  );
}
