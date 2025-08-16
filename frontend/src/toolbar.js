import React from 'react';
import { DraggableNode } from './draggableNode';
import { submitPipeline } from './submit';

export const PipelineToolbar = ({ nodes, edges }) => {
  
  const handleSubmit = () => {
    submitPipeline(nodes, edges);
  };

  return (
    <div style={{ padding: '10px' }}>
      {/* Draggable node buttons */}
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
      </div>

      {/* Submit button */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};