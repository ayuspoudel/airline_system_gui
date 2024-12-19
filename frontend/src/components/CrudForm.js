import React, { useState } from "react";

function CrudForm({ onSubmit, onUpdate, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      memberid: "", // Match backend naming
      username: "",
      name: "",
      phonenumber: "", // Match backend naming
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
    // Ensure all fields are filled
    const { memberid, username, name, phonenumber, email, dob, address } =
      formData;

    if (
      !memberid ||
      !username ||
      !name ||
      !phonenumber ||
      !email ||
      !dob ||
      !address
    ) {
      alert("All fields are required.");
      return;
    }

    if (initialData) {
      onUpdate(formData);
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="memberid"
        value={formData.memberid}
        onChange={handleChange}
        placeholder="Member ID"
        disabled={!!initialData} // Prevent editing the ID if updating
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
        type="tel"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        type="email"
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
