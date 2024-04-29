import React, { useState } from 'react';
import axios from 'axios';
import './MoreInfo.css';

function MoreInfoPage() {
    const [selectedTable, setSelectedTable] = useState('');
    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState(null);

    const handleTableSelect = (event) => {
        setSelectedTable(event.target.value);
    };

    const handleRetrieveData = async () => {
        try {
            const response = await axios.post(`http://localhost:5001/api/tables/${selectedTable}`);
            console.log('Response:', response.data);
            if (response.data && response.data.result[0]) {
                setTableData(response.data.result[0]);
            } else {
                setTableData([]);
                setError('No data found for the selected table.');
            }
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setTableData([]);
            setError('An error occurred while fetching table data.');
        }
    };

    const handleCorrelationalOfficersQuery = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/views/correlationalOfficersView`);
            console.log('Correlational Officers Response:', response.data);
            setTableData(response.data);
            setError(null);
        } catch (error) {
            console.error('Correlational Officers Error:', error);
            setTableData([]);
            setError('An error occurred while fetching correlational officers data.');
        }
    };

    const handlePrisonerTasksQuery = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/views/prisonerTaskView`);
            console.log('Prisoner Tasks Response:', response.data);
            setTableData(response.data);
            setError(null);
        } catch (error) {
            console.error('Prisoner Tasks Error:', error);
            setTableData([]);
            setError('An error occurred while fetching prisoner tasks data.');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };
    return (
        <div className="container moreinfo">
{/* function banaa h saare special handel events k liye  */}
            <section className="stats-section">
                <h2>Prison Stats & Special Queries</h2>
                <div className="special-queries">
                    <button onClick={handleCorrelationalOfficersQuery}>Correlational Officers</button>
                    <button onClick={handlePrisonerTasksQuery}>Prisoner Tasks</button>
                    <button onClick={handlePrisonerTasksQuery}>More</button>
                </div>
            </section>
            <section className="table-retrieve-section">
                <h2>Retrieve Data from Tables</h2>
                <div className="table-select">
                    <select value={selectedTable} onChange={handleTableSelect}>
                        <option value="">Select a table</option>
                        <option value="personnel">Personnel</option>
                        <option value="prisoners">Prisoners</option>
                        <option value="manages">Personnel Manages</option>
                        <option value="visitor">Visitor log</option>
                        <option value="work">Prisoner Jobs</option>
                        <option value="courtcase">Prisoner Court Cases</option>

                    </select>
                    <button onClick={handleRetrieveData}>Retrieve Data</button>
                </div>
                {error && <div className="error">{error}</div>}
                <h2>Data from {selectedTable} table:</h2>
                {tableData.length > 0 && (
                    <div className="data-container">
                        
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(tableData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, index) => (
                                            <td key={index}>
                                                {typeof value === 'string' && !isNaN(Date.parse(value)) ? formatDate(value) : value}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

export default MoreInfoPage;
