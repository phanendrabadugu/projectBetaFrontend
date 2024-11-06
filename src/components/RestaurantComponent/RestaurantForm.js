import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const geocodeAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=AIzaSyAIyY4C-OPivpAncytCELY-fUCk9aJsDWc`
  );
  const location = response.data.results[0].geometry.location;
  return location;
};

const RestaurantForm = () => {
  const [inputAddress, setInputAddress] = useState(""); // Local state for the address
  const [, setLocation] = useState({ lat: 0, lng: 0 });
  const [jobPosts, setJobPosts] = useState({
    cuisine: 0,
    delivery: 0,
    receptionist: 0,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setInputAddress(place.formatted_address); // Set local state
        }
      });
    }
  }, []);

  const handleJobCountChange = (jobType, increment) => {
    setJobPosts((prev) => ({
      ...prev,
      [jobType]: prev[jobType] + (increment ? 1 : prev[jobType] > 0 ? -1 : 0), // Ensure count doesn't go below 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const location = await geocodeAddress(inputAddress);
      setLocation(location);

      // POST request to backend to save the coordinates and job posts
      await axios.post('http://localhost:5000/api/restaurants/restaurantForm', {
        lat: location.lat,
        lng: location.lng,
        jobPosts: jobPosts,
      });
      // setInputAddress("")
      // setJobPosts({
      //   cuisine: 0,
      //   delivery: 0,
      //   receptionist: 0,
      // })
      console.log("Submitted Address:", inputAddress);
      console.log("Job Posts:", jobPosts);
      console.log("Locations", location.lat, location.lng);
      
      // Optionally, you can reset the form or handle a success message here

    } catch (error) {
      console.error("Error geocoding address or submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label htmlFor="address" style={styles.label}>Enter Restaurant Address:</label>
      <input
        id="address"
        type="text"
        ref={inputRef}
        placeholder="Start typing your address..."
        required
        style={styles.input}
      />

      <h3 style={styles.heading}>Job Posts</h3>
      <div style={styles.jobPostsContainer}>
        {['cuisine', 'delivery', 'receptionist'].map(jobType => (
          <div key={jobType} style={styles.jobPost}>
            <span style={styles.jobType}>{jobType.charAt(0).toUpperCase() + jobType.slice(1)}:</span>
            <button 
              type="button" 
              onClick={() => handleJobCountChange(jobType, false)} 
              style={styles.button}
            >
              -
            </button>
            <span style={styles.count}>{jobPosts[jobType]}</span>
            <button 
              type="button" 
              onClick={() => handleJobCountChange(jobType, true)} 
              style={styles.button}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <button type="submit" style={styles.submitButton}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f9f9f9',
    maxWidth: '400px',
    margin: 'auto',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1em',
  },
  heading: {
    fontSize: '1.5em',
    marginBottom: '15px',
  },
  jobPostsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '20px',
  },
  jobPost: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  jobType: {
    fontSize: '1em',
    marginRight: '10px',
  },
  count: {
    fontSize: '1em',
    width: '30px',
    textAlign: 'center',
  },
  button: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s',
  },
  submitButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.2em',
    transition: 'background-color 0.3s',
  },
};

// Add hover effects for buttons
styles.button = {
  ...styles.button,
  '&:hover': {
    backgroundColor: '#0056b3',
  },
};

styles.submitButton = {
  ...styles.submitButton,
  '&:hover': {
    backgroundColor: '#218838',
  },
};

export default RestaurantForm;
