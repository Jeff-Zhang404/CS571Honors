import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RequirementBox from './RequirementBox';

export default function HomePage() {
    return (
        <div>
            <Container fluid className="mt-4">
                <Row>
                    <Col sm={4} style={{ marginTop: '-20px' }}>
                        <RequirementBox />
                    </Col>
                    <Col sm={8}>
                        <div style={{
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '24px',
                            minHeight: '400px',
                            color: '#666',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                        }}>
                            <p>This tool can help UW‑Madison students to find general education / breadth courses on other schools.</p>
                            <p>Hover your mouse over the “i” icon to view helpful tips.</p>
                            <p>Log in your account to save results.</p>

                        </div>
                    </Col>
                </Row>
            </Container>


        </div>

    )
}