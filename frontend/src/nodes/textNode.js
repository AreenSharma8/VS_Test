// textNode.js

import { useState, useMemo } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Find all variables in {{variable}} format
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      found.push(match[1]);
    }
    return found;
  }, [currText]);

  // Auto-resize based on text length
  const minWidth = 200;
  const minHeight = 80;
  const width = Math.max(minWidth, Math.min(500, currText.length * 10));
  const height = Math.max(minHeight, 40 + Math.ceil(currText.length / 30) * 30);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div style={{ width, height, border: '2px solid #a259f7', borderRadius: 14, background: 'linear-gradient(135deg, #23233a 0%, #2d1e4f 100%)', color: '#e0e0e0', boxShadow: '0 8px 24px rgba(44,0,99,0.18)', padding: 16 }}>
      <div style={{ fontWeight: 'bold', marginBottom: 8, color: '#a259f7' }}>Text</div>
      <div>
        <label style={{ color: '#b39ddb' }}>
          Text:
          <textarea
            value={currText}
            onChange={handleTextChange}
            style={{ width: '100%', minHeight: 32, fontSize: '1rem', background: '#23233a', color: '#e0e0e0', border: '1.5px solid #6c3fcf', borderRadius: 10, marginTop: 6, resize: 'none', padding: 8 }}
          />
        </label>
      </div>
      {/* Handles for variables */}
      {variables.map((v, idx) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-var-${v}`}
          style={{ top: 60 + idx * 24 }}
        />
      ))}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
}
