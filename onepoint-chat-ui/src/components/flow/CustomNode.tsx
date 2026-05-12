import { Handle, Position } from '@xyflow/react';
import React, { memo } from 'react';

const CustomNode = memo(function CustomNode({ data }: { data: { content: React.ReactNode } }) {
  return (
    <div className="custom-node rounded-md overflow-hidden">
      {data.content}
      <Handle type="target" position={Position.Left} id="left" className="!bg-[color:var(--osca-accent)]" />
    </div>
  );
});

export default CustomNode;
