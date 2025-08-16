import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const MathNode = ({ id, data }) => {
  return (
    <NodeBase
      id={id}
      type="math"
      label="Math"
      fields={[{ name: 'Expression', value: data?.expression || 'a + b', type: 'text' }]}
      handles={[{
        type: 'target', position: Position.Left, id: `${id}-inputA`
      },{
        type: 'target', position: Position.Left, id: `${id}-inputB`
      },{
        type: 'source', position: Position.Right, id: `${id}-output`
      }]}
    />
  );
};
