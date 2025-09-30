import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = ({ onAddClick }) => {
    const navigate = useNavigate();

    return (
        <Container fluid className="bg-dark text-white py-3">
            <Row className="align-items-center">
                <Col xs={8}>
                    <h3 className="mb-0">📌 Task Management</h3>
                </Col>
                <Col xs={4} className="text-end">
                    <Button variant="primary" onClick={onAddClick}>
                        ➕ Add New Task
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;