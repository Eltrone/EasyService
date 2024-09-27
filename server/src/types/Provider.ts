import { RowDataPacket } from 'mysql2';

export interface Provider extends RowDataPacket {
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