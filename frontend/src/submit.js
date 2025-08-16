// frontend/src/submit.js
export async function submitPipeline(nodes, edges) {
  const url = "http://127.0.0.1:8000/pipelines/parse"; // backend endpoint

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    });

    if (!res.ok) {
      throw new Error(`Backend returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const { num_nodes, num_edges, is_dag } = data;

    alert(
      `Nodes: ${num_nodes}\n` +
      `Edges: ${num_edges}\n` +
      `Is DAG: ${is_dag ? "Yes" : "No"}`
    );
  } catch (err) {
    alert(`Submit failed: ${err.message}`);
  }
}

export default submitPipeline;