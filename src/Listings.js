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
      <div>
        <img src={'./WechatIMG623.jpg'} alt="Searching Photo" />
      </div>
      <section>
        <form onSubmit={handleSubmit} id="search-form">
          <div>
            <label htmlFor="jobTitleInput">Search by Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitleInput"
              onChange={handleInputChange}
              value={searchParams.jobTitle}
              placeholder="Enter job title"
            />

            <label htmlFor="locationInput">Search by Location:</label>
            <input
              type="text"
              name="jobLocation"
              id="locationInput"
              onChange={handleInputChange}
              value={searchParams.jobLocation}
              placeholder="Enter location"
            />

            <label htmlFor="industryInput">Search by Industry:</label>
            <input
              type="text"
              name="jobIndustry"
              id="industryInput"
              onChange={handleInputChange}
              value={searchParams.jobIndustry}
              placeholder="Enter Industry"
            />

            <label htmlFor="salaryInput">Search by Salary Range:</label>
            <input
              type="text"
              name="jobSalary"
              id="salaryInput"
              onChange={handleInputChange}
              value={searchParams.jobSalary}
              placeholder="Enter Salary Range"
            />
          </div>
          <button type="submit" aria-label="Apply Filter">
            <i className="fas fa-filter"></i> Apply Filter
          </button>
        </form>
      </section>

      <div>
        <h2>Jr. Software Development Engineer</h2>
        <h3>Company:</h3>
        <h4>Amazon</h4>
        <h3>Location:</h3>
        <h4>Seattle, WA</h4>
        <h3>Role Highlights:</h3>
        <ul>
          <li>Part-time work during the school year (16 hours/week)</li>
          <li>Full-time work during the summer (40 hours/week)</li>
          <li>Effective performance management and integrated opportunities for growth</li>
        </ul>
      </div>

      <div>
        <h2>Data Analytics Intern</h2>
        <h3>Company:</h3>
        <h4>DHL Express</h4>
        <h3>Location:</h3>
        <h4>Dallas, TX</h4>
        <h3>Role Highlights:</h3>
        <ul>
          <li>Strong communication skills (written and verbal)</li>
          <li>Strong attention to detail and organizational skills</li>
          <li>Knowledge of business intelligence tools such as Power BI, Tableau</li>
        </ul>
      </div>

      <div>
        <h2>Tax Data Analyst</h2>
        <h3>Company:</h3>
        <h4>Salesforce</h4>
        <h3>Location:</h3>
        <h4>Seattle, WA</h4>
        <h3>Role Highlights:</h3>
        <ul>
          <li>Experience telling stories with data and familiarity with Tableau visualization tool</li>
          <li>Experience applying your analytics skills to projects which have had impact on business strategy</li>
          <li>Interest in unlocking new opportunities for growth by discovering insights, automating processes</li>
        </ul>
      </div>

      <div>
        <h2>Data Analyst, Supply Chain</h2>
        <h3>Company:</h3>
        <h4>Tesla</h4>
        <h3>Location:</h3>
        <h4>Fremont, CA</h4>
        <h3>Role Highlights:</h3>
        <ul>
          <li>Create and/or enhance action-driven dashboards (e.g., using Tableau)</li>
          <li>Perform ongoing checks of internal dashboards to ensure they are up to date.</li>
          <li>Support ad hoc data, SQL query, analysis, and debugging requests from cross-functional stakeholders.</li>
        </ul>
      </div>
    </main>
  );
};

export default Listings;
