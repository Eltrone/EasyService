import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../styles/contactPage.css';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        isServiceProvider: '',
        firstName: '',
        lastName: '',
        company: '',
        postalCode: '',
        city: '',
        email: '',
        phone: '',
        country: '',
        destinationCountry: '',
        destinationPostalCode: '',
        destinationCity: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logic to handle form data submission goes here
        console.log(formData);
        alert('Your request has been successfully submitted!');
    };

    return (
        <Container fluid="md">
            <Row>
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <strong><Form.Label>Are you a service provider?</Form.Label></strong>
                            <Form.Check
                                type="radio"
                                label="Yes"
                                name="isServiceProvider"
                                value="yes"
                                checked={formData.isServiceProvider === 'yes'}
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                type="radio"
                                label="No"
                                name="isServiceProvider"
                                value="no"
                                checked={formData.isServiceProvider === 'no'}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name *</Form.Label>
                                    <Form.Control type="text" name="lastName" required value={formData.lastName} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name *</Form.Label>
                                    <Form.Control type="text" name="firstName" required value={formData.firstName} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company *</Form.Label>
                                    <Form.Control type="text" name="company" required value={formData.company} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Phone *</Form.Label>
                                    <Form.Control type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Postal Code *</Form.Label>
                                    <Form.Control type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City *</Form.Label>
                                    <Form.Control type="text" name="city" required value={formData.city} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Country *</Form.Label>
                                    <Form.Select name="country" required value={formData.country} onChange={handleChange}>
                                        <option value="">Select a country</option>
                                        <option value="France">France</option>
                                        <option value="United States">United States</option>
                                        <option value="China">China</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="Germany">Germany</option>
                                        {/* Add more country options here */}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={3} name="message" value={formData.message} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">Contact Us</Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <div>
                        <h4>Other ways to contact us</h4>
                        <p><strong>Email:</strong> aeoglobalsolutions@gmail.com</p>
                        <p><strong>Phone number:</strong> +33(0)6.18.45.64.16</p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;
