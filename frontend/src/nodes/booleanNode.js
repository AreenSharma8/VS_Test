import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const BooleanNode = ({ id, data }) => {
  return (
    <NodeBase
      id={id}
      type="boolean"
      label="Boolean"
      fields={[{ name: 'Value', value: data?.value || 'true', type: 'select', options: ['true', 'false'] }]}
      handles={[{
        type: 'source', position: Position.Right, id: `${id}-output`
      }]}
    />
  );
};
