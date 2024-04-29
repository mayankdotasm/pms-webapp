import React, { useState } from 'react';
import axios from 'axios';
import './SearchBydetails.css';
import './searchById.css';
import './prisonerdetails.css';


function SearchByIdPage() {
  const [searchType, setSearchType] = useState('id');
  const [prisonerID, setPrisonerID] = useState('');
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [prisoners, setPrisoners] = useState([]);
  const [error, setError] = useState(null);
  const [doi, setDateIncarcerated] = useState('');
  const [caseId, setCaseId] = useState('');
  const [gender, setGender] = useState('');
  const [cellNo, setCellNo] = useState('');
  const [floorNo, setFloorNo] = useState('');

  const handleSearchById = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/prisoners/${prisonerID}`);
      console.log('Response:', response.data);
      console.log(response.data.prisoner)
      if (response.data && response.data.prisoner) {
        setPrisoners(response.data.prisoner);
      } else {
        setPrisoners([]); // Clear prisoner data if no prisoners found
        setError('No prisoners found matching the search criteria.');
      }
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setPrisoners([]);
      setError('An error occurred while fetching details.');
    }
  };

  const handleSearchByDetails = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/prisoners/search', {
        fname,
        lname,
        dob,
        doi,
        caseId,
        gender,
        cellNo,
        floorNo
      });
      console.log('Response:', response.data.prisoners);
      if (response.data && response.data.prisoners) {
        setPrisoners(response.data.prisoners); // Update state with prisoner records
      } else {
        setPrisoners([]); // Clear prisoner data if no prisoners found
        setError('No prisoners found matching the search criteria.');
      }
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setPrisoners([]); // Clear prisoner data
      setError('An error occurred while fetching details.');
    }
  };

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
    // Clear form fields and error message when switching search type
    setPrisonerID('');
    setFirstName('');
    setLastName('');
    setDOB('');
    setDateIncarcerated('');
    setCaseId('');
    setGender('');
    setCellNo('');
    setFloorNo('');
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
          <h1>Search by Prisoner ID</h1>
          <div className="input-container">
            <input
              type="text"
              value={prisonerID}
              onChange={(e) => setPrisonerID(e.target.value)}
              placeholder="Enter Prisoner ID"
            />
            <button onClick={handleSearchById}>Search</button>
          </div>
        </div>
      )}
      {searchType === 'details' && (
        <>
          <h1>Search by  Details</h1>
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
              <label>Admission Date:</label>
              <input
                type="date"
                value={doi}
                onChange={(e) => setDateIncarcerated(e.target.value)}
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                placeholder="Enter Case ID"
              />
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Enter Gender"
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                value={cellNo}
                onChange={(e) => setCellNo(e.target.value)}
                placeholder="Enter Cell No"
              />
              <input
                type="text"
                value={floorNo}
                onChange={(e) => setFloorNo(e.target.value)}
                placeholder="Enter Floor No"
              />
            </div>
            <button onClick={handleSearchByDetails}>Search</button>
          </div>
        </>
      )}
      {error && <div className="error">{error}</div>}
      {prisoners.length === 0 && !error && (
        <div className="no-records-message">
          No records found matching the search criteria.
        </div>
      )}
      {prisoners.length > 0 && (
        <div className="details-container">
          <h2>Prisoners</h2>
          {prisoners.map(prisoner => (
            <div key={prisoner.Prisoner_ID} className="prisoner-details">
              <div className="details-column">
                <p><strong>Prisoner ID:</strong> {prisoner.Prisoner_ID}</p>
                <p><strong>Name:</strong> {prisoner.Fname} {prisoner.Lname}</p>
                <p><strong>Admission Date:</strong> {new Date(prisoner.Date_of_IN).toLocaleDateString()}</p>
                <p><strong>Case ID:</strong> {prisoner.Case_ID} </p>
                <p><strong>Gender:</strong> {prisoner.Gender}</p>
                <p><strong>Date of Birth:</strong> {new Date(prisoner.DOB).toLocaleDateString()}</p>
              </div>
              <div className="details-column">
                <p><strong>Address:</strong> {prisoner.Address}</p>
                <p><strong>Judge:</strong> {prisoner.JUDGE}</p>
                <p><strong>Case Type:</strong> {prisoner.Case_Type}</p>
                <p><strong>Status:</strong> {prisoner.Status}</p>
                <p><strong>Eligible for Parole Year:</strong> {prisoner.Eligible_for_Parole_Year}</p>
                <p><strong>IPC:</strong> {prisoner.IPC}</p>
              </div>
              <div className="details-column">
                <p><strong>Floor No:</strong> {prisoner.Floor_No}</p>
                <p><strong>Cell:</strong> {prisoner.CELL}</p>
              </div>
              <hr className="details-separator" />
            </div>

          ))}
        </div>
      )}
    </div>
  );
}

export default SearchByIdPage;
