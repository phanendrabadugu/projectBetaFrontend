import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Select from "react-select";

Modal.setAppElement("#root");

const ApplicationForm = ({ isOpen, onClose, selectedRestaurant, jobPosts }) => {
  const initialFormData = {
    name: "",
    address: "",
    email: "",
    contactDetails: "",
    selectedPositions: [], // Store selected positions as an array
    howLongLooking: "",
    callAvailability: "",
    agreedToPolicy: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!isOpen) {
      setFormData(initialFormData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (selectedOptions) => {
    const positions = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    console.log("Selected Positions:", positions); // Log selected positions for debugging
    setFormData({
      ...formData,
      selectedPositions: positions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data before submit:", formData); // Log form data for debugging

    try {
      const response = await axios.post(
        "https://projectbetabackend-3e1757b1ed9d.herokuapp.com/api/submitJobApplication",
        {
          ...formData,
          selectedRestaurantId: selectedRestaurant._id,
        }
      );

      console.log(response.data);
      alert("Application submitted successfully");
      setFormData(initialFormData);
      onClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application");
    }
  };

  if (!selectedRestaurant) {
    return null;
  }

  const jobOptions = Object.entries(jobPosts)
    .filter(([role, isAvailable]) => isAvailable)
    .map(([role]) => ({ value: role, label: role }));

  if (jobOptions.length > 2) {
    jobOptions.unshift({
      value: "Available to all posts",
      label: "Available to all posts",
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Application Form Modal"
      style={modalStyles}
    >
      <div style={styles.header}>
        <button onClick={onClose} style={styles.closeButton}>
          Close
        </button>
      </div>
      <div style={styles.formContainer}>
        <h2>Application Form for {selectedRestaurant.address.city}</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
  {/** Name Input */}
  <div style={{ marginBottom: '15px', position: 'relative' }}>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      style={{
        width: '100%',
        padding: '10px',
        paddingTop: '20px', // Space for the label
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'padding 0.2s'
      }}
      onFocus={(e) => e.target.style.paddingTop = '20px'}
      onBlur={(e) => !e.target.value && (e.target.style.paddingTop = '10px')}
    />
    <label style={{
      position: 'absolute',
      left: '10px',
      top: '10px',
      fontSize: '16px',
      color: '#aaa',
      transition: '0.2s ease all',
      pointerEvents: 'none',
      transform: formData.name ? 'translateY(-15px) scale(0.8)' : 'translateY(0) scale(1)',
    }}>
      Name
    </label>
  </div>

  {/** Address Input */}
  <div style={{ marginBottom: '15px', position: 'relative' }}>
    <input
      placeholder=" "
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
      style={{
        width: '100%',
        padding: '10px',
        paddingTop: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'padding 0.2s'
      }}
      onFocus={(e) => e.target.style.paddingTop = '20px'}
      onBlur={(e) => !e.target.value && (e.target.style.paddingTop = '10px')}
    />
    <label style={{
      position: 'absolute',
      left: '10px',
      top: '10px',
      fontSize: '16px',
      color: '#aaa',
      transition: '0.2s ease all',
      pointerEvents: 'none',
      transform: formData.address ? 'translateY(-15px) scale(0.8)' : 'translateY(0) scale(1)',
    }}>
      Address
    </label>
  </div>

  {/** Email Input */}
  <div style={{ marginBottom: '15px', position: 'relative' }}>
    <input
      placeholder=" "
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      style={{
        width: '100%',
        padding: '10px',
        paddingTop: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'padding 0.2s'
      }}
      onFocus={(e) => e.target.style.paddingTop = '20px'}
      onBlur={(e) => !e.target.value && (e.target.style.paddingTop = '10px')}
    />
    <label style={{
      position: 'absolute',
      left: '10px',
      top: '10px',
      fontSize: '16px',
      color: '#aaa',
      transition: '0.2s ease all',
      pointerEvents: 'none',
      transform: formData.email ? 'translateY(-15px) scale(0.8)' : 'translateY(0) scale(1)',
    }}>
      Email address
    </label>
  </div>

  {/** Contact Details Input */}
  <div style={{ marginBottom: '15px', position: 'relative' }}>
    <input
      type="text"
      name="contactDetails"
      value={formData.contactDetails}
      onChange={handleChange}
      required
      style={{
        width: '100%',
        padding: '10px',
        paddingTop: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'padding 0.2s'
      }}
      onFocus={(e) => e.target.style.paddingTop = '20px'}
      onBlur={(e) => !e.target.value && (e.target.style.paddingTop = '10px')}
    />
    <label style={{
      position: 'absolute',
      left: '10px',
      top: '10px',
      fontSize: '16px',
      color: '#aaa',
      transition: '0.2s ease all',
      pointerEvents: 'none',
      transform: formData.contactDetails ? 'translateY(-15px) scale(0.8)' : 'translateY(0) scale(1)',
    }}>
      Contact details
    </label>
  </div>

  {/** Additional Inputs and Checkbox */}
  <div style={{ marginBottom: '15px' }}>
    <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>Available Job Posts:</label>
    <Select
      isMulti
      name="selectedPositions"
      options={jobOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      value={jobOptions.filter((option) => formData.selectedPositions.includes(option.value))}
      onChange={handleSelectChange}
      styles={{ control: (base) => ({ ...base, padding: '4px', fontSize: '16px' }) }}
    />
  </div>

  <div style={{ marginBottom: '15px', position: 'relative' }}>
    <input
      type="text"
      name="howLongLooking"
      value={formData.howLongLooking}
      onChange={handleChange}
      required
      style={{
        width: '100%',
        padding: '10px',
        paddingTop: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'padding 0.2s'
      }}
      onFocus={(e) => e.target.style.paddingTop = '20px'}
      onBlur={(e) => !e.target.value && (e.target.style.paddingTop = '10px')}
    />
    <label style={{
      position: 'absolute',
      left: '10px',
      top: '10px',
      fontSize: '16px',
      color: '#aaa',
      transition: '0.2s ease all',
      pointerEvents: 'none',
      transform: formData.howLongLooking ? 'translateY(-15px) scale(0.8)' : 'translateY(0) scale(1)',
    }}>
      How long looking for work?
    </label>
  </div>

  <div style={{ marginBottom: '15px', position: 'relative' }}>
    <input
      type="text"
      name="callAvailability"
      value={formData.callAvailability}
      onChange={handleChange}
      required
      style={{
        width: '100%',
        padding: '10px',
        paddingTop: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'padding 0.2s'
      }}
      onFocus={(e) => e.target.style.paddingTop = '20px'}
      onBlur={(e) => !e.target.value && (e.target.style.paddingTop = '10px')}
    />
    <label style={{
      position: 'absolute',
      left: '10px',
      top: '10px',
      fontSize: '16px',
      color: '#aaa',
      transition: '0.2s ease all',
      pointerEvents: 'none',
      transform: formData.callAvailability ? 'translateY(-15px) scale(0.8)' : 'translateY(0) scale(1)',
    }}>
      When will you be available ?
    </label>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
    <input
      type="checkbox"
      name="agreedToPolicy"
      checked={formData.agreedToPolicy}
      onChange={handleChange}
      required
      style={{ marginRight: '8px', width: '16px', height: '16px' }}
    />
    <label style={{ fontSize: '14px', lineHeight: '1.5' }}>
      I agree to pay 100 euros after the training and to know the restaurant details.
    </label>
  </div>

  <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: '#fff', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
    Submit Application
  </button>
</form>

      </div>
    </Modal>
  );
};

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "600px",
    maxHeight: "80%",
    overflowY: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "10px",
  },
  closeButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "5px",
    position: "absolute",
    top: "10px",
    left: "10px",
  },
  formContainer: {
    padding: "20px",
  },
};

export default ApplicationForm;
