from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Any, Dict, List, Set

app = FastAPI()

# Allow your React dev server to call the API during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/pipelines/parse")
def parse_pipeline(payload: Dict[str, Any]):
    """
    Expected JSON body:
    {
      "nodes": [ { "id": "node-1", ... }, ... ],
      "edges": [ { "source": "node-1", "target": "node-2", ... }, ... ]
    }
    Returns:
    { "num_nodes": int, "num_edges": int, "is_dag": bool }
    """
    nodes = payload.get("nodes", []) or []
    edges = payload.get("edges", []) or []

    # Counts based on arrays received
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build the set of node ids from explicit nodes plus any referenced in edges
    explicit_ids: Set[str] = set()
    for n in nodes:
        nid = n.get("id")
        if nid is not None:
            explicit_ids.add(str(nid))

    referenced_ids: Set[str] = set()
    for e in edges:
        s = e.get("source")
        t = e.get("target")
        if s is not None:
            referenced_ids.add(str(s))
        if t is not None:
            referenced_ids.add(str(t))

    node_ids: Set[str] = explicit_ids.union(referenced_ids)

    # Build adjacency and indegree maps
    adj: Dict[str, List[str]] = {nid: [] for nid in node_ids}
    indeg: Dict[str, int] = {nid: 0 for nid in node_ids}

    for e in edges:
        s = e.get("source")
        t = e.get("target")
        if s is None or t is None:
            continue
        s = str(s)
        t = str(t)
        if s not in adj:
            adj[s] = []
        if t not in indeg:
            indeg[t] = 0
        adj[s].append(t)
        indeg[t] += 1

    # Kahn's algorithm for DAG detection
    from collections import deque
    q = deque([n for n, d in indeg.items() if d == 0])
    visited = 0
    while q:
        u = q.popleft()
        visited += 1
        for v in adj.get(u, []):
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)

    is_dag = (visited == len(node_ids))

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }