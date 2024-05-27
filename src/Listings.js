import React, {useState} from 'react';

const Listings = () => {
    const initialJobs = [
        {
            id: 1,
            title: 'Jr. Software Development Engineer',
            company: 'Amazon',
            location: 'Seattle, WA',
            industry: 'Technology',
            salaryRange: '60,000-70,000',
            highlights: [
                'Part-time work during the school year (16 hours/week)',
                'Full-time work during the summer (40 hours/week)',
                'Effective performance management and integrated opportunities for growth'
            ]
        },
        {
            id: 2,
            title: 'Data Analytics Intern',
            company: 'DHL Express',
            location: 'Dallas, TX',
            industry: 'Logistics',
            salaryRange: '30,000-40,000',
            highlights: [
                'Strong communication skills (written and verbal)',
                'Strong attention to detail and organizational skills',
                'Knowledge of business intelligence tools such as Power BI, Tableau'
            ]
        },
        {
            id: 3,
            title: 'Tax Data Analyst',
            company: 'Salesforce',
            location: 'Seattle, WA',
            industry: 'Technology',
            salaryRange: '70,000-80,000',
            highlights: [
                'Experience telling stories with data and familiarity with Tableau visualization tool',
                'Experience applying your analytics skills to projects which have had impact on business strategy',
                'Interest in unlocking new opportunities for growth by discovering insights, automating processes'
            ]
        },
        {
            id: 4,
            title: 'Data Analyst, Supply Chain',
            company: 'Tesla',
            location: 'Fremont, CA',
            industry: 'Automotive',
            salaryRange: '65,000-75,000',
            highlights: [
                'Create and/or enhance action-driven dashboards (e.g., using Tableau)',
                'Perform ongoing checks of internal dashboards to ensure they are up to date.',
                'Support ad hoc data, SQL query, analysis, and debugging requests from cross-functional stakeholders.'
            ]
        }
    ];

    const [jobs, setJobs] = useState(initialJobs);
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

        const filteredJobs = initialJobs.filter(job => (
            job.title.toLowerCase().includes(searchParams.jobTitle) &&
            job.location.toLowerCase().includes(searchParams.jobLocation) &&
            job.industry.toLowerCase().includes(searchParams.jobIndustry) &&
            job.salaryRange.toLowerCase().includes(searchParams.jobSalary)
        ));

        setJobs(filteredJobs);
    };

    const renderJobListings = () => {
        return jobs.map(job => (
            <div key={job.id} className="job-listing">
                <h2>{job.title}</h2>
                <h3>Company:</h3>
                <h4>{job.company}</h4>
                <h3>Location:</h3>
                <h4>{job.location}</h4>
                <h3>Industry:</h3>
                <h4>{job.industry}</h4>
                <h3>Salary Range:</h3>
                <h4>{job.salaryRange}</h4>
                <h3>Role Highlights:</h3>
                <ul>
                    {job.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))}
                </ul>
            </div>
        ));
    };

    return (
        <main>
            <div>
                <img className={'listing-img'} src={'./WechatIMG623.jpg'} alt="Searching Photo"/>
            </div>
            <section>
                <form onSubmit={handleSubmit} id="search-form">
                    <div className={'text-center'}>
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
                            placeholder="Enter industry"
                        />
                        <label htmlFor="salaryInput">Search by Salary Range:</label>
                        <input
                            type="text"
                            name="jobSalary"
                            id="salaryExpeInput"
                            onChange={handleInputChange}
                            value={searchParams.jobSalary}
                            placeholder="Enter salary range"
                        />
                    </div>
                    <div className={'text-center'}>
                        <button type="submit" aria-label="Apply Filter">
                            <i className="fas fa-filter"></i> Apply Filter
                        </button>
                    </div>
                </form>
            </section>

            {renderJobListings()}
        </main>
    );
};

export default Listings;
