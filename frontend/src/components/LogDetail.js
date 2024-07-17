import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogDetail = ({ log, handleClose }) => {
    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Fishing Log Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Fish Species:</strong> {log.fishSpecies}</p>
                <p><strong>Bait:</strong> {log.bait}</p>
                <p><strong>Location:</strong> {log.location}</p>
                <p><strong>Date:</strong> {log.date}</p>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LogDetail;
