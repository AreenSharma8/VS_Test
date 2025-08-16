// inputNode.js

import { useState } from 'react';
import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [fields, setFields] = useState([
    { name: 'Name', value: data?.inputName || id.replace('customInput-', 'input_'), type: 'text' },
    { name: 'Type', value: data?.inputType || 'Text', type: 'select', options: ['Text', 'File'] }
  ]);

  const handleFieldChange = (name, value) => {
    setFields(fields => fields.map(f => f.name === name ? { ...f, value } : f));
  };

  return (
    <NodeBase
      id={id}
      type="input"
      label="Input"
      fields={fields}
      handles={[{
        type: 'source',
        position: Position.Right,
        id: `${id}-output`
      }]}
      onFieldChange={handleFieldChange}
    />
  );
}
