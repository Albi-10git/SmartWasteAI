import { useState, useEffect } from "react";

function ComplaintForm({ editingComplaint, setEditingComplaint }) {

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {

    if (editingComplaint) {

      setName(editingComplaint.name);
      setLocation(editingComplaint.location);
      setWasteType(editingComplaint.wasteType);
      setPriority(editingComplaint.priority);
      setDescription(editingComplaint.description);

    }

  }, [editingComplaint]);

  function clearForm() {

    setName("");
    setLocation("");
    setWasteType("");
    setPriority("");
    setDescription("");

  }

  function handleSubmit(e) {

    e.preventDefault();

    const complaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    if (editingComplaint) {

      const updatedComplaints = complaints.map((complaint) =>
        complaint.id === editingComplaint.id
          ? {
              ...complaint,
              name,
              location,
              wasteType,
              priority,
              description,
            }
          : complaint
      );

      localStorage.setItem(
        "complaints",
        JSON.stringify(updatedComplaints)
      );

      alert("Complaint Updated Successfully!");

      setEditingComplaint(null);

    } else {

      const newComplaint = {
        id: Date.now(),
        name,
        location,
        wasteType,
        priority,
        description,
      };

      complaints.push(newComplaint);

      localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
      );

      alert("Complaint Added Successfully!");

    }

    clearForm();
    window.location.reload();


  }

  return (

    <div>

      <h2>Waste Complaint Form</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Citizen Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value)}
          required
        >
          <option value="">Select Waste Type</option>
          <option>Plastic</option>
          <option>Organic</option>
          <option>E-Waste</option>
          <option>Hazardous</option>
        </select>

        <br /><br />

        <h4>Priority</h4>

        <label>
          <input
            type="radio"
            value="High"
            checked={priority === "High"}
            onChange={(e) => setPriority(e.target.value)}
          />
          High
        </label>

        <label style={{ marginLeft: "15px" }}>
          <input
            type="radio"
            value="Medium"
            checked={priority === "Medium"}
            onChange={(e) => setPriority(e.target.value)}
          />
          Medium
        </label>

        <label style={{ marginLeft: "15px" }}>
          <input
            type="radio"
            value="Low"
            checked={priority === "Low"}
            onChange={(e) => setPriority(e.target.value)}
          />
          Low
        </label>

        <br /><br />

        <textarea
          rows="5"
          cols="40"
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">

          {editingComplaint ? "Update Complaint" : "Add Complaint"}

        </button>

      </form>

    </div>

  );

}

export default ComplaintForm;