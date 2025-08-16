import NodeBase from './NodeBase';
import { Position } from 'reactflow';

export const UserNode = ({ id, data }) => {
  return (
    <NodeBase
      id={id}
      type="user"
      label="User"
      fields={[{ name: 'Username', value: data?.username || '', type: 'text' }]}
      handles={[{
        type: 'source', position: Position.Right, id: `${id}-output`
      }]}
    />
  );
};
