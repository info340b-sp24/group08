import React, { useState } from 'react';
import { Card, Carousel, Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import dataImg from './img/Data.jpg';
import UIUXImg from './img/UIUX.jpg';
import softwareImg from './img/Software.jpg';

const Listings = () => {
  const initialJobs = [
    {
      id: 1,
      title: 'Jr. Software Development Engineer',
      company: 'Amazon',
      location: 'Seattle, WA',
      industry: 'Technology',
      salaryMin: 60000,
      salaryMax: 70000,
      highlights: [
        'Part-time work during the school year (16 hours/week)',
        'Full-time work during the summer (40 hours/week)',
        'Effective performance management and integrated opportunities for growth'
      ],
      imageUrl: './WechatIMG623.jpg',
      hrContact: {
        name: 'John Doe',
        pronoun: 'He/Him',
        email: 'john.doe@amazon.com'
      }
    },
    {
      id: 2,
      title: 'Data Analytics Intern',
      company: 'DHL Express',
      location: 'Dallas, TX',
      industry: 'Logistics',
      salaryMin: 30000,
      salaryMax: 40000,
      highlights: [
        'Strong communication skills (written and verbal)',
        'Strong attention to detail and organizational skills',
        'Knowledge of business intelligence tools such as Power BI, Tableau'
      ],
      imageUrl: dataImg,
      hrContact: {
        name: 'Jane Smith',
        pronoun: 'She/Her',
        email: 'jane.smith@dhl.com'
      }
    },
    {
      id: 3,
      title: 'Tax Data Analyst',
      company: 'Salesforce',
      location: 'Seattle, WA',
      industry: 'Technology',
      salaryMin: 70000,
      salaryMax: 80000,
      highlights: [
        'Experience telling stories with data and familiarity with Tableau visualization tool',
        'Experience applying your analytics skills to projects which have had impact on business strategy',
        'Interest in unlocking new opportunities for growth by discovering insights, automating processes'
      ],
      imageUrl: UIUXImg,
      hrContact: {
        name: 'Sam Brown',
        pronoun: 'They/Them',
        email: 'sam.brown@salesforce.com'
      }
    },
    {
      id: 4,
      title: 'Data Analyst, Supply Chain',
      company: 'Tesla',
      location: 'Fremont, CA',
      industry: 'Automotive',
      salaryMin: 65000,
      salaryMax: 75000,
      highlights: [
        'Create and/or enhance action-driven dashboards (e.g., using Tableau)',
        'Perform ongoing checks of internal dashboards to ensure they are up to date.',
        'Support ad hoc data, SQL query, analysis, and debugging requests from cross-functional stakeholders.'
      ],
      imageUrl: softwareImg,
      hrContact: {
        name: 'Alex Johnson',
        pronoun: 'He/Him',
        email: 'alex.johnson@tesla.com'
      }
    }
  ];

  const [jobs, setJobs] = useState(initialJobs);
  const [searchParams, setSearchParams] = useState({
    jobTitle: '',
    jobLocation: '',
    jobIndustry: '',
    jobSalary: ''
  });
  const [selectedJob, setSelectedJob] = useState(null);

  const handleInputChange = (event) => {
    setSearchParams({
      ...searchParams,
      [event.target.name]: event.target.value.toLowerCase()
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredJobs = initialJobs.filter(job => {
      const salaryMatch = searchParams.jobSalary
        ? (job.salaryMin <= parseInt(searchParams.jobSalary, 10) && job.salaryMax >= parseInt(searchParams.jobSalary, 10))
        : true;
      return (
        job.title.toLowerCase().includes(searchParams.jobTitle) &&
        job.location.toLowerCase().includes(searchParams.jobLocation) &&
        job.industry.toLowerCase().includes(searchParams.jobIndustry) &&
        salaryMatch
      );
    });

    setJobs(filteredJobs);
  };

  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const renderJobListings = () => {
    return jobs.map(job => (
      <Col md={6} lg={4} key={job.id} className="mb-4">
        <Card onClick={() => handleCardClick(job)} style={{ cursor: 'pointer' }}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
            <Card.Text>
              <strong>Location:</strong> {job.location}<br/>
              <strong>Industry:</strong> {job.industry}<br/>
              <strong>Salary Range:</strong> ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
            </Card.Text>
            <Card.Text>
              <strong>Role Highlights:</strong>
              <ul>
                {job.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <main>
      <Container>
        <Carousel className="mb-4">
          {initialJobs.map(job => (
            <Carousel.Item key={job.id}>
              <img
                className="d-block w-100"
                src={job.imageUrl}
                alt={`Slide of ${job.title}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <Form onSubmit={handleSubmit} id="search-form">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="jobTitleInput">
                <Form.Label>Search by Job Title:</Form.Label>
                <Form.Control
                  type="text"
                  name="jobTitle"
                  onChange={handleInputChange}
                  value={searchParams.jobTitle}
                  placeholder="Enter job title"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="locationInput">
                <Form.Label>Search by Location:</Form.Label>
                <Form.Control
                  type="text"
                  name="jobLocation"
                  onChange={handleInputChange}
                  value={searchParams.jobLocation}
                  placeholder="Enter location"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="industryInput">
                <Form.Label>Search by Industry:</Form.Label>
                <Form.Control
                  type="text"
                  name="jobIndustry"
                  onChange={handleInputChange}
                  value={searchParams.jobIndustry}
                  placeholder="Enter industry"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="salaryInput">
                <Form.Label>Search by Salary:</Form.Label>
                <Form.Control
                  type="text"
                  name="jobSalary"
                  onChange={handleInputChange}
                  value={searchParams.jobSalary}
                  placeholder="Enter salary"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" className="mb-3">
            Apply Filter
          </Button>
        </Form>

        <div className="mb-4">
          <p><strong>Tip:</strong> Click on a job card to see the HR contact information!</p>
        </div>

        <Row>
          {renderJobListings()}
        </Row>

        <Modal show={selectedJob !== null} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>HR Contact Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedJob && (
              <>
                <p><strong>Name:</strong> {selectedJob.hrContact.name}</p>
                <p><strong>Pronoun:</strong> {selectedJob.hrContact.pronoun}</p>
                <p><strong>Email:</strong> {selectedJob.hrContact.email}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
};

export default Listings;
