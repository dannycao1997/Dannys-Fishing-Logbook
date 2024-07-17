import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const LogFormModal = ({ addLog }) => {
    const [show, setShow] = useState(false);
    const [newLog, setNewLog] = useState({
        fishSpecies: '',
        date: '',
        bait: '',
        location: ''
    });

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleChange = (e) => {

        setNewLog({

            ...newLog,

            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        addLog(newLog);

        setNewLog({ fishSpecies: '', date: '', bait: '', location: '' });

        handleClose();
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>

                Add Log

            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>


                    <Modal.Title>Add Fishing Log</Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="fishSpecies">

                            <Form.Label>Fish Species</Form.Label>

                            <Form.Control

                                type="text"
                                name="fishSpecies"

                                value={newLog.fishSpecies}
                                onChange={handleChange}
                                placeholder="Fish Species"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="date">

                            <Form.Label>Date</Form.Label>

                            <Form.Control
                                type="date"
                                name="date"
                                value={newLog.date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="bait">

                            <Form.Label>Bait</Form.Label>

                            <Form.Control
                                type="text"
                                name="bait"
                                value={newLog.bait}
                                onChange={handleChange}
                                placeholder="Bait"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="location">

                            <Form.Label>Location</Form.Label>

                            <Form.Control
                                type="text"
                                name="location"
                                value={newLog.location}
                                onChange={handleChange}
                                placeholder="Location"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add Log
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LogFormModal;
