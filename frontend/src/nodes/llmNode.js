// llmNode.js

import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <NodeBase
      id={id}
      type="llm"
      label="LLM"
      fields={[{ name: 'Description', value: 'This is a LLM.', type: 'text' }]}
      handles={[{
        type: 'target',
        position: Position.Left,
        id: `${id}-system`,
        style: { top: `${100/3}%` }
      }, {
        type: 'target',
        position: Position.Left,
        id: `${id}-prompt`,
        style: { top: `${200/3}%` }
      }, {
        type: 'source',
        position: Position.Right,
        id: `${id}-response`
      }]}
    />
  );
}
