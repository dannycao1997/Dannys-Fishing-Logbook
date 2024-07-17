import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
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

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/logs/${id}`);
            fetchLogs();
        } catch (error) {
            console.error('Error deleting log:', error);

            setError('Error deleting log.');
        }
    };

    return (
        <Container className="fishing-log">
            <Row>
                <Col>
                    <h1 className="text-center">Anglers' Log - Fishing Journal</h1>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <form onSubmit={handleSubmit} className="mb-4">
                        <input
                            type="text"
                            name="fishSpecies"
                            value={newLog.fishSpecies}
                            onChange={handleChange}
                            placeholder="Fish Species"
                            required
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            name="location"
                            value={newLog.location}
                            onChange={handleChange}
                            placeholder="Location"
                            required
                            className="form-control mb-2"
                        />
                        <input
                            type="text"
                            name="bait"
                            value={newLog.bait}
                            onChange={handleChange}
                            placeholder="Bait"
                            required
                            className="form-control mb-2"
                        />

                        <input
                            type="date"
                            name="date"
                            value={newLog.date}
                            onChange={handleChange}
                            required
                            className="form-control mb-2"
                        />
                        <Button variant="primary" type="submit">
                            Add Log
                        </Button>
                    </form>
                    <ul className="list-group">
                        {logs.map((log) => (
                            <li key={log.id}
                                className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  {log.fishSpecies} - {log.location} - {log.bait} - {log.date}
                </span>
                                <Button variant="danger" onClick={() => handleDelete(log.id)}>
                                    Delete
                                </Button>

                            </li>
                        ))}

                    </ul>
                </Col>

            </Row>

        </Container>
    );
};

export default FishingLog;
