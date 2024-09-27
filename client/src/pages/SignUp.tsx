import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useUser } from '../contexts/userAuth';
import classes from "./SignUp.module.css"
import classNames from 'classnames';
import axios from '../utils/axios';
import { extractErrorMessage } from '../utils/axios';
import { Pagination, Provider } from './SearchProvider';

const SignUp: React.FC = () => {

    const { config: configs } = useUser();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [status, setStatus] = React.useState<string | null>(null)
    const [type, setType] = React.useState<"normal" | "provider">("normal");
    const [original_password, set_original_password] = React.useState<string | null>(null);
    const [found, setFound] = React.useState(false);
    const { user } = useUser();

    const toggle = () => setType(type === "normal" ? "provider" : "normal")

    const [companyData, setCompanyData] = useState({
        type: "provider",
        name: '',
        logoUrl: '',
        presentation: '',
        address: '',
        countryLocation: '',
        activityDomain: '',
        providerType: '',
        serviceProvided: '',
        phoneNumber: '',
        email: '',
        contactPhoneNumber: '',
        contactFirstName: '',
        contactLastName: '',
        contactPosition: '',
        contactEmail: ''
    });

    React.useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<Pagination<Provider>>(`/providers?user_id=${user?.id}`);
                const provider = response.data.items[0] ?? null;
                provider && setCompanyData({
                    type: "provider",
                    name: provider.company_name,
                    logoUrl: provider.logo,
                    presentation: provider.description,
                    address: provider.address,
                    countryLocation: (configs?.countries || []).filter(e => provider.countries?.includes(e.id)).map(e => e.name).join(', '),
                    activityDomain: (configs?.activities || []).filter(e => provider.activities?.includes(e.id)).map(e => e.name).join(', '),
                    providerType: (configs?.product_types || []).filter(e => provider.product_types?.includes(e.id)).map(e => e.name).join(', '),
                    serviceProvided: (configs?.services || []).filter(e => provider.services?.includes(e.id)).map(e => e.name).join(', '),
                    phoneNumber: provider.phone_number,
                    email: provider.email,
                    contactPhoneNumber: provider.contact_phone_number,
                    contactFirstName: provider.contact_first_name,
                    contactLastName: provider.contact_last_name,
                    contactPosition: provider.contact_position,
                    contactEmail: provider.contact_email,
                });
                setFound(true);
            } catch (error) {
                // ignore ...
            }
        })();
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCompanyData({
            ...companyData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post<{ original_password: string; }>('/providers', {
                type: companyData.type,
                company_name: companyData.name,
                logo: companyData.logoUrl,
                description: companyData.presentation,
                address: companyData.address,
                countries: [companyData.countryLocation],
                activities: [companyData.activityDomain],
                product_types: [companyData.providerType],
                services: [companyData.serviceProvided],
                phone_number: companyData.phoneNumber,
                email: companyData.email,
                contact_phone_number: companyData.contactPhoneNumber,
                contact_first_name: companyData.contactFirstName,
                contact_last_name: companyData.contactLastName,
                contact_position: companyData.contactPosition,
                contact_email: companyData.contactEmail
            });
            set_original_password(response.data.original_password)
            setDone(true);
        } catch (err) {
            setStatus(extractErrorMessage(err));
        }
        setLoading(false);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post<{ original_password: string; }>(`/providers/${user?.id}`, {
                user_id: user?.id,
                type: companyData.type,
                company_name: companyData.name,
                logo: companyData.logoUrl,
                description: companyData.presentation,
                address: companyData.address,
                countries: [companyData.countryLocation],
                activities: [companyData.activityDomain],
                product_types: [companyData.providerType],
                services: [companyData.serviceProvided],
                phone_number: companyData.phoneNumber,
                email: companyData.email,
                contact_phone_number: companyData.contactPhoneNumber,
                contact_first_name: companyData.contactFirstName,
                contact_last_name: companyData.contactLastName,
                contact_position: companyData.contactPosition,
                contact_email: companyData.contactEmail
            });
        } catch (err) {
            setStatus(extractErrorMessage(err));
        }
        setLoading(false);
    };

    if (done) {
        return (
            <main className={classNames(classes.main, classes.center)}>
                <div className={classNames(classes.cardsuccess)}>
                    <h3>Thank you for your submission!</h3>
                    <p>Your registration request has been successfully sent to our support team. We will review your information and get back to you shortly. If you have any questions in the meantime, feel free to reach out to us!</p>
                    <p>Please make sure to save your password securely!: <strong style={{ color: "red" }}>{original_password}</strong></p>
                </div>
            </main>
        )
    }

    if (user && !found) {
        return (
            <main className={classNames(classes.main, classes.center)}>
                <div className={classNames(classes.carddanger)}>
                    <h3>Error while searching for provider!</h3>
                    <p>Please try again</p>
                </div>
            </main>
        )
    }

    const has_ability = !(type === "provider");

    return (
        <main className={classNames(classes.main)}>
            <Form className='container' style={{ backgroundColor: "white" }} onSubmit={user ? handleUpdate : handleSubmit}>
                <h3>Company Information</h3>
                <p>Create your provider account effortlessly with our comprehensive registration form. Fill in essential company details, including name, logo, address, and contact information. By completing all required fields, you'll showcase your offerings and enhance communication with potential clients, ensuring your business is positioned for success on our platform.</p>
                <hr />
                <Form.Group className="mb-3">
                    <strong><Form.Label>Are you a service provider?</Form.Label></strong>
                    {status && <Alert variant="danger">{status}</Alert>}
                    <Form.Check
                        type="radio"
                        label="Yes"
                        name="type"
                        value="yes"
                        checked={type === "normal"}
                        onChange={toggle}
                        required
                    />
                    <Form.Check
                        type="radio"
                        label="No"
                        name="type"
                        value="no"
                        checked={type === "provider"}
                        onChange={toggle}
                        required
                    />
                </Form.Group>
                <Row className='mt-2'>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control type="text" name="name" value={companyData.name} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    {has_ability && (
                        <Col sm={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Logo URL *</Form.Label>
                                <Form.Control type="text" name="logoUrl" value={companyData.logoUrl} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Presentation *</Form.Label>
                            <Form.Control as="textarea" rows={3} name="presentation" value={companyData.presentation} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address *</Form.Label>
                            <Form.Control type="text" name="address" value={companyData.address} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country Location *</Form.Label>
                            <Form.Select name="countryLocation" value={companyData.countryLocation} onChange={handleChange} required>
                                <option value="">None</option>
                                {configs?.countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {has_ability && <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Activity Domain *</Form.Label>
                            <Form.Select name="activityDomain" value={companyData.activityDomain} onChange={handleChange} required>
                                <option value="">None</option>
                                {configs?.activities.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>}
                </Row>
                <Row>
                    {has_ability && <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Provider Type *</Form.Label>
                            <Form.Select name="providerType" value={companyData.providerType} onChange={handleChange} required>
                                <option value="">All</option>
                                {configs?.product_types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>}
                    {has_ability && companyData.providerType === '1' && (
                        <Col sm={12} md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Service Provided *</Form.Label>
                                <Form.Select name="serviceProvided" value={companyData.serviceProvided} onChange={handleChange} required>
                                    <option value="">None</option>
                                    {configs?.services.map((service) => (
                                        <option key={service.id} value={service.id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    )}
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control type="tel" name="phoneNumber" value={companyData.phoneNumber} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control type="email" name="email" value={companyData.email} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <h3>Contact Information</h3>
                <Row>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact First Name {has_ability ? "*" : "(optional)"}</Form.Label>
                            <Form.Control type="text" name="contactFirstName" value={companyData.contactFirstName} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Last Name {has_ability ? "*" : "(optional)"}</Form.Label>
                            <Form.Control type="text" name="contactLastName" value={companyData.contactLastName} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Position {has_ability ? "*" : "(optional)"}</Form.Label>
                            <Form.Control type="text" name="contactPosition" value={companyData.contactPosition} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Phone Number {has_ability ? "*" : "(optional)"}</Form.Label>
                            <Form.Control type="tel" name="contactPhoneNumber" value={companyData.contactPhoneNumber} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Form.Group className="mb-3">
                            <Form.Label>Contact Email {has_ability ? "*" : "(optional)"}</Form.Label>
                            <Form.Control type="email" name="contactEmail" value={companyData.contactEmail} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" disabled={loading} type="submit">{user ? "Update Registration" : "Submit Registration"}</Button>
            </Form>
        </main>
    );
};

export default SignUp;