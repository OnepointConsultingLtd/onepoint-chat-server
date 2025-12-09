import { Handle, Position } from '@xyflow/react';
import React from 'react';

export default function CustomNode({ data }: { data: { content: React.ReactNode } }) {
  return (
    <div className="custom-node rounded-md overflow-hidden">
      {data.content}
      <Handle type="target" position={Position.Left} id="left" className="!bg-[#9a19ff]" />
    </div>
  );
}
