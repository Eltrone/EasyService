import axios from "../utils/axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Provider {
    id: number;
    user_id: number;
    company_name: string;
    logo: string;
    address: string;
    phone_number: string;
    email: string;
    description: string;
    website: string;
    status: string;
    contact_first_name: string;
    contact_last_name: string;
    contact_position: string;
    contact_phone_number: string;
    contact_email: string;
    created_at: string;
    updated_at: string;
    countries: number[];
    services: number[];
    activities: number[];
    product_types: number[];
}

// Styled Components
const PageWrapper = styled.div`
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 2rem;
`;

const Container = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
`;

const Title = styled.h3`
    font-size: 2rem;
    color: #333;
    margin-bottom: 1.5rem;
`;

const DetailSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const Label = styled.span`
    font-weight: bold;
    color: #666;
`;

const Value = styled.span`
    color: #333;
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    color: #666;
`;

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    color: red;
    margin-top: 1.5rem;
`;

async function fetchProvider(id: number): Promise<Provider | null> {
    try {
        const response = await axios.get<any>(`/providers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch provider:", error);
        return null;
    }
}

const ProviderPage = () => {
    const { id } = useParams<{ id: string }>();
    const [provider, setProvider] = useState<Provider | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                setLoading(true);
                const providerData = await fetchProvider(Number(id));
                if (providerData) {
                    setProvider(providerData);
                    setError(null);
                } else {
                    setError("Provider data not found.");
                }
                setLoading(false);
            };
            fetchData();
        }
    }, [id]);

    if (loading) {
        return <LoadingMessage>Loading...</LoadingMessage>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <PageWrapper>
            <Container>
                {provider ? (
                    <>
                        <Title>{provider.company_name}</Title>
                        <DetailSection>
                            <div>
                                <Label>Email: </Label><Value>{provider.email}</Value>
                            </div>
                            <div>
                                <Label>Phone Number: </Label><Value>{provider.phone_number}</Value>
                            </div>
                            <div>
                                <Label>Website: </Label><Value>{provider.website}</Value>
                            </div>
                            <div>
                                <Label>Address: </Label><Value>{provider.address}</Value>
                            </div>
                            <div>
                                <Label>Status: </Label><Value>{provider.status}</Value>
                            </div>
                            <div>
                                <Label>Contact Person: </Label><Value>{`${provider.contact_first_name} ${provider.contact_last_name}`}</Value>
                            </div>
                            <div>
                                <Label>Position: </Label><Value>{provider.contact_position}</Value>
                            </div>
                            <div>
                                <Label>Contact Phone: </Label><Value>{provider.contact_phone_number}</Value>
                            </div>
                            <div>
                                <Label>Contact Email: </Label><Value>{provider.contact_email}</Value>
                            </div>
                        </DetailSection>
                        <DetailSection>
                            <div>
                                <Label>Countries: </Label><Value>{provider.countries.join(', ')}</Value>
                            </div>
                            <div>
                                <Label>Services: </Label><Value>{provider.services.join(', ')}</Value>
                            </div>
                            <div>
                                <Label>Activities: </Label><Value>{provider.activities.join(', ')}</Value>
                            </div>
                            <div>
                                <Label>Product Types: </Label><Value>{provider.product_types.join(', ')}</Value>
                            </div>
                            <div>
                                <Label>Created At: </Label><Value>{new Date(provider.created_at).toLocaleDateString()}</Value>
                            </div>
                            <div>
                                <Label>Updated At: </Label><Value>{new Date(provider.updated_at).toLocaleDateString()}</Value>
                            </div>
                        </DetailSection>
                    </>
                ) : (
                    <ErrorMessage>No provider data available.</ErrorMessage>
                )}
            </Container>
        </PageWrapper>
    );
};

export default ProviderPage;