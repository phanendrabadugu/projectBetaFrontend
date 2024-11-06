import React from 'react';

const JobPosts = ({ jobPosts }) => {
  const jobRoles = Object.entries(jobPosts)
    .filter(([role, isAvailable]) => isAvailable > 0) // Filter only roles with available positions
    .map(([role, count]) => ({ role, count })); // Create an array of role and count objects

  // Calculate total positions available
  const totalPositions = jobRoles.reduce((total, { count }) => total + count, 0);

  return (
    <div>
      <h4>Total Available Job Posts: {totalPositions}</h4>
      <ul>
        {jobRoles.length > 0 ? (
          jobRoles.map(({ role, count }, index) => (
            <li key={index}>
              <h6>{role}: {count}</h6>
            </li>
          ))
        ) : (
          <li>No job posts available</li>
        )}
      </ul>
    </div>
  );
};

export default JobPosts;
