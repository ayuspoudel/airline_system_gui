import React, { useState } from "react";

function CrudForm({ onSubmit, onUpdate, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      memberid: "",
      username: "",
      name: "",
      phonenumber: "",
      email: "",
      dob: "",
      address: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.memberid && onUpdate) {
      onUpdate(formData); // Call update if editing
    } else {
      onSubmit(formData); // Call insert if adding
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="memberid"
        value={formData.memberid}
        onChange={handleChange}
        placeholder="Member ID"
        disabled={!!initialData} // Disable if editing
      />
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="phonenumber"
        value={formData.phonenumber}
        onChange={handleChange}
        placeholder="Phone Number"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="Date of Birth"
        type="date"
      />
      <input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
      />
      <button type="submit">{initialData ? "Update" : "Add"} Member</button>
    </form>
  );
}

export default CrudForm;
