import React, { useState } from 'react';

const Listings = () => {
  const [jobs, setJobs] = useState([]);
  const [searchParams, setSearchParams] = useState({
    jobTitle: '',
    jobLocation: '',
    jobIndustry: '',
    jobSalary: ''
  });

  const handleInputChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value.toLowerCase()
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const filteredJobs = jobs.filter(job => {
      return (
        job.title.toLowerCase().includes(searchParams.jobTitle) && 
        job.location.toLowerCase().includes(searchParams.jobLocation) &&
        job.industry.toLowerCase().includes(searchParams.jobIndustry) && 
        job.salary.toLowerCase().includes(searchParams.jobSalary)
      );
    });
  
    setJobs(filteredJobs);
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit} id="search-form">
          <div>
            <label htmlFor="jobTitleInput">Search by Job Title:</label>
            <input type="text" name="jobTitle" id="jobTitleInput" onChange={handleInputChange} value={searchParams.jobTitle} placeholder="Enter job title" />

            <label htmlFor="locationInput">Search by Location:</label>
            <input type="text" name="jobLocation" id="locationInput" onChange={handleInputChange} value={searchParams.jobLocation} placeholder="Enter location" />

            <label htmlFor="industryInput">Search by Industry:</label>
            <input type="text" name="jobIndustry" id="industryInput" onChange={handleInputChange} value={searchParams.jobIndustry} placeholder="Enter Industry" />

            <label htmlFor="salaryInput">Search by Salary Range:</label>
            <input type="text" name="jobSalary" id="salaryInput" onChange={handleInputChange} value={searchParams.jobSalary} placeholder="Enter Salary Range" />
          </div>
          <button type="submit" aria-label="Apply Filter"><i className="fas fa-filter"></i> Apply Filter</button>
        </form>
      </section>

      {jobs.map((job, index) => (
        <div key={index}>
          <h2>{job.title}</h2>
          <h3>Company:</h3>
          <h4>{job.company}</h4>
          <h3>Location:</h3>
          <h4>{job.location}</h4>
          <h3>Role Highlights:</h3>
          <ul>
            {job.highlights.map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
};

export default Listings;