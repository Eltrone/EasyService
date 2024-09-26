import pool from "./db/config";
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import ProviderService from "./models/ProviderService";
import GenerateNewAccount from "./utils/generateAccount";

interface Provider extends RowDataPacket {
    id: number;
    company_name: string;
    country: string;
    service: string;
    activity: string;
    product_type: string;
}

interface PaginatedResult<T> {
    items: T[];
    page: number;
    total_pages: number;
    total_items: number;
}

export const getProvidersById = async (providerId: string): Promise<Provider | null> => {
    const query = `
        SELECT p.*, 
               GROUP_CONCAT(DISTINCT c.name) AS countries,
               GROUP_CONCAT(DISTINCT s.name) AS services,
               GROUP_CONCAT(DISTINCT a.name) AS activities,
               GROUP_CONCAT(DISTINCT pt.name) AS product_types
        FROM providers p
        LEFT JOIN provider_countries pc ON p.id = pc.provider_id
        LEFT JOIN countries c ON pc.country_id = c.id
        LEFT JOIN provider_services ps ON p.id = ps.provider_id
        LEFT JOIN services s ON ps.service_id = s.id
        LEFT JOIN provider_activities pa ON p.id = pa.provider_id
        LEFT JOIN activities a ON pa.activity_id = a.id
        LEFT JOIN provider_product_types ppt ON p.id = ppt.provider_id
        LEFT JOIN product_types pt ON ppt.product_type_id = pt.id
        WHERE p.id = ?
        GROUP BY p.id;
    `;
    const [rows] = await pool.query<Provider[]>(query, [providerId]);
    return rows.length > 0 ? rows[0] : null;
};

export const getProviders = async (filters: any): Promise<PaginatedResult<any>> => {
    const providerService = new ProviderService(pool);
    const providers = await providerService.getProviders(filters);
    return providers;
};

export const getUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

export const getConfigs = async (): Promise<any> => {
    try {
        const countriesQuery = 'SELECT id, name FROM countries';
        const servicesQuery = 'SELECT id, name FROM services';
        const activitiesQuery = 'SELECT id, name FROM activities';
        const productTypesQuery = 'SELECT id, name FROM product_types';
        const [countries] = await pool.query(countriesQuery);
        const [services] = await pool.query(servicesQuery);
        const [activities] = await pool.query(activitiesQuery);
        const [productTypes] = await pool.query(productTypesQuery);

        return {
            countries,
            services,
            activities,
            product_types: productTypes,
        };
    } catch (error) {
        throw new Error('Failed to fetch configurations');
    }
};

export const createProvider = async (provider: Omit<Provider, 'id'>): Promise<any> => {

    const name = provider.company_name ?? "unknown";
    const email = provider.email ?? "unknown";
    const type = provider.type ?? "normal"
    const newUser = await GenerateNewAccount.create(name, email, type);
    const query = `
        INSERT INTO providers (
            user_id, company_name, logo, address, phone_number, email, 
            description, website, contact_first_name, contact_last_name, 
            contact_position, contact_phone_number, contact_email, 
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;

    const values = [
        newUser.id,
        provider.company_name ?? "",
        provider.logo ?? "",
        provider.address ?? "",
        provider.phone_number ?? "",
        provider.email,
        provider.description ?? "",
        provider.website ?? "",
        provider.contact_first_name ?? "",
        provider.contact_last_name ?? "",
        provider.contact_position ?? "",
        provider.contact_phone_number ?? "",
        provider.contact_email ?? ""
    ];

    const [result]: any = await pool.execute<ResultSetHeader>(query, values);
    const providerId = result.insertId;
    await insertIntoJunctionTable('provider_countries', 'country_id', providerId, provider.countries);
    await insertIntoJunctionTable('provider_services', 'service_id', providerId, provider.services);
    await insertIntoJunctionTable('provider_activities', 'activity_id', providerId, provider.activities);
    await insertIntoJunctionTable('provider_product_types', 'product_type_id', providerId, provider.product_types);

    return newUser;
};

const insertIntoJunctionTable = async (tableName: string, entityNameId: string, providerId: number, entityIds: number[]) => {
    const query = `INSERT INTO ${tableName} (provider_id, ${entityNameId}) VALUES ?`;
    const values = entityIds.map(id => [providerId, id]);
    if (values.length > 0) {
        await pool.query(query, [values]);
    }
};

export const updateProvider = async (providerId: number, provider: Partial<Omit<Provider, 'id'>>): Promise<boolean> => {
    let query = 'UPDATE providers SET';
    const queryParams: any[] = [];
    if (provider.company_name) {
        query += ' company_name = ?,';
        queryParams.push(provider.company_name);
    }

    query = query.slice(0, -1);
    query += ' WHERE id = ?';
    queryParams.push(providerId);

    const [result] = await pool.execute<ResultSetHeader>(query, queryParams);
    if (result.affectedRows > 0) {
        await updateJunctionTable('provider_countries', providerId, provider.countryIds);
        await updateJunctionTable('provider_services', providerId, provider.serviceIds);
        await updateJunctionTable('provider_activities', providerId, provider.activityIds);
        await updateJunctionTable('provider_product_types', providerId, provider.productTypeIds);
    }

    return result.affectedRows > 0;
};

const updateJunctionTable = async (tableName: string, providerId: number, entityIds: number[]) => {
    const deleteQuery = `DELETE FROM ${tableName} WHERE provider_id = ?`;
    await pool.query(deleteQuery, [providerId]);

    if (entityIds.length > 0) {
        const insertQuery = `INSERT INTO ${tableName} (provider_id, entity_id) VALUES ?`;
        const values = entityIds.map(id => [providerId, id]);
        await pool.query(insertQuery, [values]);
    }
};