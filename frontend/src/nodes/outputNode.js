// outputNode.js

import { useState } from 'react';
import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const [fields, setFields] = useState([
    { name: 'Name', value: data?.outputName || id.replace('customOutput-', 'output_'), type: 'text' },
    { name: 'Type', value: data?.outputType || 'Text', type: 'select', options: ['Text', 'File'] }
  ]);

  const handleFieldChange = (name, value) => {
    setFields(fields => fields.map(f => f.name === name ? { ...f, value } : f));
  };

  return (
    <NodeBase
      id={id}
      type="output"
      label="Output"
      fields={fields}
      handles={[{
        type: 'target',
        position: Position.Left,
        id: `${id}-value`
      }]}
      onFieldChange={handleFieldChange}
    />
  );
}
