import React from "react";

function DataTable({ records, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(records[0] || {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.memberid}>
            {Object.values(record).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
            <td>
              <button onClick={() => onDelete(record.memberid)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
