import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CrudForm from "../components/CrudForm";
import DataTable from "../components/DataTable";

function CrudPage() {
  const { table } = useParams();
  const [records, setRecords] = useState([]);
  const [editData, setEditData] = useState(null); // State to store the record being edited

  useEffect(() => {
    fetchRecords();
  }, [table]);

  const fetchRecords = async () => {
    try {
      const response = await api.get(`/${table}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleInsert = async (data) => {
    try {
      await api.post(`/${table}`, data);
      alert("Record added successfully!");
      fetchRecords();
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Failed to add record.");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await api.put(`/${table}/${data.memberid}`, data); // Use the primary key for the update URL
      alert("Record updated successfully!");
      fetchRecords();
      setEditData(null); // Reset edit data after a successful update
    } catch (error) {
      console.error("Error updating record:", error);
      alert("Failed to update record.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/${table}/${id}`);
      alert("Record deleted successfully!");
      fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

  const handleEdit = (record) => {
    setEditData(record); // Set the record to be edited
  };

  return (
    <div>
      <h2>Manage {table}</h2>
      <CrudForm
        onSubmit={handleInsert}
        onUpdate={handleUpdate}
        initialData={editData}
      />
      <DataTable
        records={records}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default CrudPage;
