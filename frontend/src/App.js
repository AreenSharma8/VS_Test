import React from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useStore } from './store';

function App() {
  // Get nodes and edges from Zustand store
  const nodes = useStore(state => state.nodes);
  const edges = useStore(state => state.edges);

  return (
    <div className="app-container">
      <PipelineToolbar
        nodes={nodes}
        edges={edges}
      />
      <PipelineUI />
    </div>
  );
}

export default App;