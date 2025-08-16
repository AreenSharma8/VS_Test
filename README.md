# VectorShift Frontend Technical Assessment – Completed Implementation

This repository contains my completed solution for the **VectorShift Frontend Technical Assessment**, built with **React (JavaScript)** for the frontend and **FastAPI (Python)** for the backend.  
It demonstrates **component abstraction, UI/UX design, dynamic frontend logic, and backend integration**.

---

## 🚀 Features

### 1. Node Abstraction
- Refactored repetitive node code (inputs, outputs, LLMs, text) into a **generic abstraction**.
- Added **five new custom nodes** with minimal code duplication.

### 2. Styling
- Implemented **responsive, unified design** with modern UI components.
- Applied consistent typography, colors, and layout.

### 3. Text Node Logic
- **Dynamic resizing**: Node size adjusts to fit typed content.
- **Variable detection**: Detects `{{variableName}}` and adds a new Handle dynamically.

### 4. Backend Integration
- Frontend sends nodes & edges to FastAPI backend `/pipelines/parse`.
- Backend returns:
  - `num_nodes` → total nodes
  - `num_edges` → total edges
  - `is_dag` → whether pipeline is a Directed Acyclic Graph (DAG)
- Frontend displays results in an **alert box** for instant feedback.

---

## 🛠 Tech Stack
- **Frontend:** React, JavaScript, CSS
- **Backend:** Python, FastAPI, Uvicorn
- **Other:** React Flow, Axios, Node.js

---

## 📦 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/vectorshift-assessment.git
   cd vectorshift-assessment

2. Install frontend dependencies

   cd frontend
   npm install

3.Install backend dependencies

    cd ../backend
    pip install -r requirements.txt
