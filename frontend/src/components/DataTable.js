import React from "react";

function DataTable({ records, onDelete, onEdit }) {
  if (!records || records.length === 0) {
    return <p>No records available.</p>;
  }

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
        {records.map((record, idx) => (
          <tr key={record.memberid || idx}>
            {Object.values(record).map((value, valueIdx) => (
              <td key={valueIdx}>
                {value !== null && value !== undefined ? value : "-"}
              </td>
            ))}
            <td>
              {onEdit && <button onClick={() => onEdit(record)}>Edit</button>}
              {onDelete && (
                <button
                  onClick={() => {
                    console.log("Deleting record with ID:", record.memberid); // Debug log
                    onDelete(record.memberid);
                  }}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
