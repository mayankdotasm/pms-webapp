import React, { useState } from 'react';
import axios from 'axios';
import './SearchBydetails.css';

function PersonnelPage() {
  const [searchType, setSearchType] = useState('id');
  const [officerID, setOfficerID] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [personnel, setPersonnel] = useState([]);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [supervisorID, setSupervisorID] = useState('');

  const handleSearchById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/personnels/${officerID}`);
      console.log('Response:', response.data);
      console.log(response.data.personnel);
      if (response.data && response.data.personnel) {
        setPersonnel(response.data.personnel);
      } else {
        setPersonnel([]);
        setError('No personnel found matching the search criteria.');
      }
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setPersonnel([]);
      setError('An error occurred while fetching details.');
    }
  };

  const handleSearchByDetails = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/personnels/search', {
        fname,
        lname,
        dob,
        title,
        contactNo,
        supervisorID,
      });
      console.log('Response:', response.data.personnels[0]);
      if (response.data && response.data.personnels) {
        setPersonnel(response.data.personnels);
      } else {
        setPersonnel([]);
        setError('No personnel found matching the search criteria.');
      }
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setPersonnel([]);
      setError('An error occurred while fetching details.');
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    setOfficerID('');
    setFirstName('');
    setLastName('');
    setDOB('');
    setTitle('');
    setContactNo('');
    setSupervisorID('');
    setError(null);
  };

  return (
    <div className="container">
      <div className="search-options">
        <button
          className={searchType === 'id' ? 'active' : ''}
          onClick={() => handleSearchTypeChange('id')}
        >
          Search by ID
        </button>
        <button
          className={searchType === 'details' ? 'active' : ''}
          onClick={() => handleSearchTypeChange('details')}
        >
          Search by Details
        </button>
      </div>
      {searchType === 'id' && (
        <div className="search-by-id-container">
          <h1>Search Personnel by ID</h1>
          <div className="input-container">
            <input
              type="text"
              value={officerID}
              onChange={(e) => setOfficerID(e.target.value)}
              placeholder="Enter Officer ID"
            />
            <button onClick={handleSearchById}>Search</button>
          </div>
        </div>
      )}
      {searchType === 'details' && (
        <>
          <h1>Search by Details</h1>
          <div className="input-container">
            <div className="input-row">
              <input
                type="text"
                value={fname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter First Name"
              />
              <input
                type="text"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter Last Name"
              />
            </div>
            <div className="input-row">
              <label>Date of Birth:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
              <input
                type="text"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                placeholder="Enter Contact No"
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                value={supervisorID}
                onChange={(e) => setSupervisorID(e.target.value)}
                placeholder="Enter Supervisor ID"
              />
            </div>
            <button onClick={handleSearchByDetails}>Search</button>
          </div>
        </>
      )}
      {error && <div className="error">{error}</div>}
      {personnel.length === 0 && !error && (
        <div className="no-records-message">
          No records found matching the search criteria.
        </div>
      )}
      {personnel.length > 0 && (
        <div className="details-container">
          <h2>Personnel</h2>
          {personnel.map((person) => (
            <div key={person.Officer_ID}>
              <p>Officer ID: {person.Officer_ID}</p>
              <p>Name: {person.Fname} {person.Lname}</p>
              <p>Date of Birth: {new Date(person.DOB).toLocaleDateString()}</p>
              <p>Title: {person.Title}</p>
              <p>Contact No: {person.Contact_No}</p>
              <p>Supervisor ID: {person.Supervisor_ID}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonnelPage;
