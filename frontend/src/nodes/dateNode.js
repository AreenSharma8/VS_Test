import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const DateNode = ({ id, data }) => {
  return (
    <NodeBase
      id={id}
      type="date"
      label="Date"
      fields={[{ name: 'Date', value: data?.date || '', type: 'text' }]}
      handles={[{
        type: 'source', position: Position.Right, id: `${id}-output`
      }]}
    />
  );
};
