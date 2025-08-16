import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const ColorNode = ({ id, data }) => {
  return (
    <NodeBase
      id={id}
      type="color"
      label="Color"
      fields={[{ name: 'Color', value: data?.color || '#a259f7', type: 'text' }]}
      handles={[{
        type: 'source', position: Position.Right, id: `${id}-output`
      }]}
    />
  );
};
