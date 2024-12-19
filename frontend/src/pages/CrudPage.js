import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CrudForm from "../components/CrudForm";
import DataTable from "../components/DataTable";

function CrudPage() {
  const { table } = useParams();
  const [records, setRecords] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, [table]);

  const fetchRecords = async () => {
    try {
      const response = await api.get(`/${table}`);
      setRecords(response.data);
    } catch (error) {
      console.error(
        "Error fetching records:",
        error.response?.data || error.message
      );
    }
  };

  const handleInsert = async (data) => {
    try {
      await api.post(`/${table}`, data);
      alert("Record added successfully!");
      fetchRecords();
    } catch (error) {
      console.error(
        "Error adding record:",
        error.response?.data || error.message
      );
      alert("Failed to add record.");
    }
  };

  const handleUpdate = async (data) => {
    if (!data.memberid) {
      alert("Member ID is required for update.");
      return;
    }

    try {
      console.log("Update payload:", data);
      await api.put(`/members/${data.memberid}`, data); // Pass `data.memberid` in the URL
      alert("Record updated successfully!");
      fetchRecords();
    } catch (error) {
      console.error(
        "Error updating record:",
        error.response?.data || error.message
      );
      alert("Failed to update record.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/members/${id}`);
      alert("Record deleted successfully!");
      fetchRecords();
    } catch (error) {
      console.error(
        "Error deleting record:",
        error.response?.data || error.message
      );
      alert("Failed to delete record.");
    }
  };

  const handleEdit = (record) => {
    setEditData(record);
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
