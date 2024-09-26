export interface Contact {
    id?: number;
    isServiceProvider: 'yes' | 'no';
    firstName: string;
    lastName: string;
    company: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
    country: string;
    destinationCountry?: string;
    destinationPostalCode?: string;
    destinationCity?: string;
    message?: string;
}

export default class ContactService {
    private pool: any;

    constructor(pool: any) {
        this.pool = pool; // Assuming pool is your database connection
    }

    // Method to add a new contact
    public async createContact(contact: Contact): Promise<number | null> {

        const query = `INSERT INTO contacts (isServiceProvider, firstName, lastName, company, postalCode, city, email, phone, country, destinationCountry, destinationPostalCode, destinationCity, message) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const values = [
            contact.isServiceProvider,
            contact.firstName,
            contact.lastName,
            contact.company,
            contact.postalCode,
            contact.city,
            contact.email,
            contact.phone,
            contact.country,
            contact.destinationCountry,
            contact.destinationPostalCode,
            contact.destinationCity,
            contact.message,
        ];

        const [result]: any = await this.pool.query(query, values);
        return result.insertId;
    }
}