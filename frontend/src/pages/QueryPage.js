import React, { useState } from "react";
import api from "../services/api";

function QueryPage() {
  const [queryResult, setQueryResult] = useState([]);

  const executeQuery = async () => {
    try {
      const response = await api.get("/members");
      setQueryResult(response.data || []);
    } catch (error) {
      console.error("Error executing query:", error);
    }
  };

  return (
    <div>
      <h2>Query Results</h2>
      <button onClick={executeQuery}>Run Query</button>
      {queryResult.length > 0 ? (
        <pre>{JSON.stringify(queryResult, null, 2)}</pre>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}

export default QueryPage;
