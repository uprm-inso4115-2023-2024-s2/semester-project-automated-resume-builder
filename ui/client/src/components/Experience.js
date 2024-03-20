import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResumeBuilder() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    jobTitle: '',
    organization: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    achievements: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJobs([...jobs, formData]);
    setFormData({
      jobTitle: '',
      organization: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      achievements: ''
    });
  };

  const handleDelete = (index) => {
    const updatedJobs = [...jobs];
    updatedJobs.splice(index, 1);
    setJobs(updatedJobs);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#fffff' }}>UPResuMe</h1>
      <div style={{ 
        background: '#9ed198',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'inline-block',
        width: '100%'
      }}>
        <h2 style={{ color: '#000' }}>Work Experience</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="jobTitle" style={{ marginBottom: '5px', color: '#000',fontWeight:'bold' }}>Job Title:</label>
            <input type="text" id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required style={{ borderRadius: '10px', padding: '5px', width: '80%', maxWidth: '300px', margin: '0 auto', border:'none' }} />
          </div>
          
          <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="organization" style={{ marginBottom: '5px', color: '#000',fontWeight:'bold' }}>Organization:</label>
            <input type="text" id="organization" name="organization" value={formData.organization} onChange={handleChange} required style={{ borderRadius: '10px', padding: '5px', width: '80%', maxWidth: '300px', margin: '0 auto', border:'none' }} />
          </div>
          
          <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="startDate" style={{ marginBottom: '5px', color: '#000',fontWeight:'bold' }}>Start Date:</label>
            <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required style={{ borderRadius: '10px', padding: '5px', width: '80%', maxWidth: '300px', margin: '0 auto', border:'none' }} />
          </div>
          
          <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="endDate" style={{ marginBottom: '5px', color: '#000',fontWeight:'bold' }}>End Date:</label>
            <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} style={{ borderRadius: '10px', padding: '5px', width: '80%', maxWidth: '300px', margin: '0 auto', border:'none' }} />
          </div>
          
          <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column',fontWeight:'bold' }}>
            <label htmlFor="responsibilities" style={{ marginBottom: '5px', color: '#000' }}>Responsibilities:</label>
            <textarea id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} rows="4" required style={{ borderRadius: '10px', padding: '5px', width: '80%', maxWidth: '300px', margin: '0 auto', border:'none' }}></textarea>
          </div>
          
          <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="achievements" style={{ marginBottom: '5px', color: '#000',fontWeight:'bold' }}>Achievements:</label>
            <textarea id="achievements" name="achievements" value={formData.achievements} onChange={handleChange} rows="4" required style={{ borderRadius: '10px', padding: '5px', width: '80%', maxWidth: '300px', margin: '0 auto', border:'none' }}></textarea>
          </div>
          
          <button type="submit" style={{ marginRight: '10px', borderRadius: '10px', padding: '5px 10px', color: '#000',background: '#53a459',border:'none' }}>Add Job</button>
          <button onClick={() => navigate('./skills')} style={{ marginRight: '10px', borderRadius: '10px', padding: '5px 10px', color: '#000',background: '#53a459',border:'none' }}>Next</button>
        </form>
      </div>

      <h2 style={{ marginTop: '30px', marginBottom: '15px', color: '#ffff' }}>Jobs</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {jobs.map((job, index) => (
          <li key={index} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <strong>{job.jobTitle}</strong> at {job.organization}<br />
            {job.startDate} - {job.endDate}<br />
            Responsibilities: {job.responsibilities}<br />
            Achievements: {job.achievements}
            <button onClick={() => handleDelete(index)} style={{ marginLeft: '10px', backgroundColor: '#f44336', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumeBuilder;
