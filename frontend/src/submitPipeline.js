import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = () => {
    submitPipeline(nodes, edges);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Submit Pipeline
      </button>
    </div>
  );
};

export const submitPipeline = async (nodes, edges) => {
  try {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nodes: nodes.map((node) => ({ id: node.id, type: node.type })),
        edges: edges.map((edge) => ({ source: edge.source, target: edge.target })),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const { num_nodes, num_edges, is_dag } = data;

    alert(`Pipeline Analysis:
      Number of nodes: ${num_nodes}
      Number of edges: ${num_edges}
      Is a DAG: ${is_dag ? "Yes" : "No"}`);
  } catch (error) {
    console.error("Error submitting pipeline:", error);
    alert(`Error submitting pipeline: ${error.message}. Please try again.`);
  }
};
