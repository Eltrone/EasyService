import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import '../styles/contactPage.css';
import { useUser } from '../contexts/userAuth';
import styles from './ContactUs.module.css'
import axios, { extractErrorMessage } from '../utils/axios';
import classNames from 'classnames';

const ContactPage = () => {

    const { config: configs } = useUser();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [status, setStatus] = React.useState<string | null>(null)

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/contacts', formData);
            setDone(true);
        } catch (err) {
            setStatus(extractErrorMessage(err));
        }
        setLoading(false);
    };

    if (done) {
        return (
            <main className={classNames(styles.main, styles.center)}>
                <div className={classNames(styles.cardsuccess)}>
                    <h3>Thank you for your submission!</h3>
                    <p>We appreciate your interest in our services. Your contact request has been successfully submitted, and our team will review your information shortly.</p>
                </div>
            </main>
        )
    }

    return (
        <main className={styles.contactUs}>
            <Row className='container mt-3 mb-3 bg-white'>
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <strong><Form.Label>Are you a service provider?</Form.Label></strong>
                            {status && <Alert variant="danger">{status}</Alert>}
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
                                        <option value="">None</option>
                                        {configs?.countries.map((country) => (
                                            <option key={country.id} value={country.id}>
                                                {country.name}
                                            </option>
                                        ))}
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
                        <Button variant="primary" disabled={loading} type="submit">{loading ? "loading..." : "Submit"}</Button>
                    </Form>
                </Col>
                <Col md={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img width={400} src="./Nous-Contacter.png" />
                    {/* <div>
                        <h4>Other ways to contact us</h4>
                        <p><strong>Email:</strong> aeoglobalsolutions@gmail.com</p>
                        <p><strong>Phone number:</strong> +33(0)6.18.45.64.16</p>
                    </div> */}
                </Col>
            </Row>
        </main>
    );
};

export default ContactPage;