import React, { useState } from 'react';
import Modal from 'react-modal';
import ApplicationForm from '../JobSearchComponent/ApplicationForm';
import JobPosts from '../JobSearchComponent/JobPosts';
Modal.setAppElement('#root');

const RestaurantList = ({ addresses }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelectRestaurant = (address) => {
    setSelectedRestaurant(address);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedRestaurant(null);
  };

  return (
    <div style={{
      height: '800px',
      overflowY: 'auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <ul style={{
        listStyleType: 'none',
        padding: 0,
        margin: 0,
      }}>
        {addresses.map((address, index) => (
          <li
            key={index}
            onClick={() => handleSelectRestaurant(address)}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '10px',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.2s ease',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
          >
            {/* <h2 style={{
              marginBottom: '5px',
              fontSize: '20px',
              color: '#333',
            }}>
              {address.address.city}
            </h2> */}
            <div style={{
              marginLeft: '10px',
              color: '#555',
            }}>
              <JobPosts jobPosts={address.jobPosts} />
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isFormOpen}
        onRequestClose={handleCloseForm}
        contentLabel="Application Form Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '600px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <ApplicationForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          selectedRestaurant={selectedRestaurant}
          jobPosts={selectedRestaurant ? selectedRestaurant.jobPosts : {}}
        />
      </Modal>
    </div>
  );
};

export default RestaurantList;
