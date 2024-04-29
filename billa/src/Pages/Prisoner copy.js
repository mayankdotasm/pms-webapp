import React, { useState } from 'react';
import axios from 'axios';
import './SearchByIdPage.css'; // Import the CSS file

function SearchByIdPage() {
  const [searchType, setSearchType] = useState('id'); // Default search type is 'id'
  const [rollno, setRollno] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [dob, setDOB] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [students, setStudents] = useState([]); // Use an array to store multiple records
  const [error, setError] = useState(null);

  const handleSearchById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/records/${rollno}`);
      console.log('Response:', response.data); 
      setStudents(response.data.records); // Update state with multiple records
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setStudents([]); // Clear student data
      setError('An error occurred while fetching details.');
    }
  };

  const handleSearchByDetails = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/records/search', {
        name,
        course,
        dob,
        mobileNo
      });
      console.log('Response:', response.data); 
      setStudents(response.data.records); // Update state with multiple records
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setStudents([]); // Clear student data
      setError('An error occurred while fetching details.');
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    // Clear form fields and error message when switching search type
    setRollno('');
    setName('');
    setCourse('');
    setDOB('');
    setMobileNo('');
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
        <>
          <h1>Search by ID</h1>
          <div className="input-container">
            <input
              type="text"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              placeholder="Enter Roll No"
            />
            <button onClick={handleSearchById}>Search</button>
          </div>
        </>
      )}
      {searchType === 'details' && (
        <>
          <h1>Search by Details</h1>
          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter Course"
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            />
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              placeholder="Enter Mobile No"
            />
            <button onClick={handleSearchByDetails}>Search</button>
          </div>
        </>
      )}
      {error && <div className="error">{error}</div>} {/* Display error message */}
      {students.length > 0 && (
        <div className="details-container">
          <h2>Details</h2>
          {students.map(student => (
            <div key={student.Rollno}>
              <p>Roll No: {student.Rollno}</p>
              <p>Name: {student.Student_Name}</p>
              <p>Course: {student.Course}</p>
              <p>Date of Birth: {student.DOB}</p>
              <p>Mobile No: {student.Mobile_no}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchByIdPage;
