import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FishingLog.css';

const FishingLog = () => {
    const [logs, setLogs] = useState([]);
    const [newLog, setNewLog] = useState({
        fishSpecies: '',
        date: '',
        bait: '',
        location: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('http://localhost:8080/logs');
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setError('Error fetching logs.');
        }
    };

    const handleChange = (e) => {
        setNewLog({
            ...newLog,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/logs', newLog);
            setNewLog({ fishSpecies: '', date: '', bait: '', location: '' });
            fetchLogs();
        } catch (error) {
            console.error('Error creating log:', error);
            setError('Error creating log.');
        }
    };

    return (
        <div className="fishing-log">
            <h1>FishBytes Logbook</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fishSpecies"
                    value={newLog.fishSpecies}
                    onChange={handleChange}
                    placeholder="Fish Species"
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={newLog.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bait"
                    value={newLog.bait}
                    onChange={handleChange}
                    placeholder="Bait"
                    required
                />
                <input
                    type="text"
                    name="location"
                    value={newLog.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                />
                <button type="submit">Add Log</button>
            </form>
            <ul>
                {logs.map((log) => (
                    <li key={log.id}>
                        {log.fishSpecies} - {log.date} - {log.bait} - {log.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FishingLog;
