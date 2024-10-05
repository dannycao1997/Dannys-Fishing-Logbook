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
        location: '',
        file: null
    });
    const [error, setError] = useState('');

    useEffect(() => {

        fetchLogs();

    }, []);

    const fetchLogs = async () => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/logs`);
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

    const handleFileChange = (e) => {
        setNewLog({
            ...newLog,
            file: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('log', new Blob([JSON.stringify(newLog)], { type: 'application/json' }));
        formData.append('file', newLog.file);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/logs`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setNewLog({ fishSpecies: '', date: '', bait: '', location: '', file: null });
            fetchLogs();
        } catch (error) {
            console.error('Error creating log:', error);
            setError('Error creating log.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/logs/${id}`);
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
                    <h1 className="text-center">Danny’s Fishing Journal</h1>
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

                        <input
                            type="file"
                            name="file"
                            onChange={handleFileChange}
                            className="form-control mb-2"
                        />
                        <Button variant="primary" type="submit">
                            Log Catch
                        </Button>

                    </form>

                    <ul className="list-group">

                        {logs.map((log) => (

                            <li key={log.id} className="list-group-item">

                                <h3>{log.fishSpecies}</h3>

                                <p>{log.location} - {log.bait} - {log.date}</p>

                                {log.imageUrl && <img src={`${log.imageUrl}`} alt="Catch" className="img-thumbnail" />}
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
