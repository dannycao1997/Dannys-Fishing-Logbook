// Import necessary modules from React and Axios
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the FishingLog component
const FishingLog = () => {
    // Define state variables for storing logs and the new log details
    const [logs, setLogs] = useState([]);
    const [newLog, setNewLog] = useState({
        fishSpecies: '',
        date: '',
        bait: '',
        location: ''
    });

    // Fetch logs from the backend API when the component mounts
    useEffect(() => {
        fetchLogs();
    }, []);

    // Function to fetch logs from the backend API
    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/logs');
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    // Handle input changes for the new log form
    const handleChange = (e) => {
        setNewLog({
            ...newLog,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission to create a new log
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/logs', newLog);
            setNewLog({ fishSpecies: '', date: '', bait: '', location: '' });
            fetchLogs();
        } catch (error) {
            console.error('Error creating log:', error);
        }
    };

    // Render the component
    return (
        <div>
            <h1>Fishing Diary</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fishSpecies"
                    value={newLog.fishSpecies}
                    onChange={handleChange}
                    placeholder="Fish Species"
                />
                <input
                    type="date"
                    name="date"
                    value={newLog.date}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="bait"
                    value={newLog.bait}
                    onChange={handleChange}
                    placeholder="Bait"
                />
                <input
                    type="text"
                    name="location"
                    value={newLog.location}
                    onChange={handleChange}
                    placeholder="Location"
                />
                <button type="submit">Add Log</button>
            </form>
            <ul>
                {logs.map(log => (
                    <li key={log.id}>
                        {log.fishSpecies} - {log.date} - {log.bait} - {log.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FishingLog;
