interface PaginatedResult<T> {
    items: T[];
    page: number;
    total_pages: number;
    total_items: number;
}

export default class ProviderService {
    private pool: any;

    constructor(pool: any) {
        this.pool = pool;
    }

    private getPagination(page: number, limit: number) {
        const currentPage = Math.max(page, 1);
        const perPage = Math.max(limit, 1);
        const offset = (currentPage - 1) * perPage;
        return { currentPage, perPage, offset };
    }

    private addFilters(query: string, filters: any, queryParams: any[]): string {
        const { company_name, countries, services, activities, product_types, user_id } = filters;

        if (user_id) {
            query += ` AND user_id = ?`;
            queryParams.push(user_id);
        }

        if (company_name) {
            query += ` AND company_name LIKE ?`;
            queryParams.push(`%${company_name}%`);
        }

        if (countries?.length) {
            query += ` AND EXISTS (SELECT 1 FROM provider_countries WHERE provider_id = providers.id AND country_id IN (${countries.map(() => '?').join(',')}))`;
            queryParams.push(...countries);
        }

        if (services?.length) {
            query += ` AND EXISTS (SELECT 1 FROM provider_services WHERE provider_id = providers.id AND service_id IN (${services.map(() => '?').join(',')}))`;
            queryParams.push(...services);
        }

        if (activities?.length) {
            query += ` AND EXISTS (SELECT 1 FROM provider_activities WHERE provider_id = providers.id AND activity_id IN (${activities.map(() => '?').join(',')}))`;
            queryParams.push(...activities);
        }

        if (product_types?.length) {
            query += ` AND EXISTS (SELECT 1 FROM provider_product_types WHERE provider_id = providers.id AND product_type_id IN (${product_types.map(() => '?').join(',')}))`;
            queryParams.push(...product_types);
        }

        return query;
    }

    private async getRelatedData(tableName: string, column: string, providerIds: number[]): Promise<any> {
        if (providerIds.length === 0) return {};
        const [rows]: any = await this.pool.query(
            `SELECT provider_id, ${column} FROM ${tableName} WHERE provider_id IN (?)`, [providerIds]
        );
        return rows.reduce((acc: any, row: any) => {
            acc[row.provider_id] = acc[row.provider_id] || [];
            acc[row.provider_id].push(row[column]);
            return acc;
        }, {});
    }

    public async getProviders(filters: any): Promise<PaginatedResult<any>> {
        const { page = 1, limit = 10, userId } = filters;
        const { currentPage, perPage, offset } = this.getPagination(page, limit);
        const user_id = parseInt(userId);

        let baseQuery = `FROM providers WHERE status=1`;
        const queryParams: any[] = [];

        baseQuery = this.addFilters(baseQuery, filters, queryParams);

        const select = !user_id ? "id, company_name, logo, address, description, website, created_at, updated_at" : "*";

        const query = `SELECT ${select} ${baseQuery} LIMIT ? OFFSET ?`;
        const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;
        queryParams.push(perPage, offset);

        try {
            const [[{ total: totalItems }]] = await this.pool.query(countQuery, queryParams.slice(0, queryParams.length - 2));

            const [providersResult]: any = await this.pool.query(query, queryParams);
            const providers = Array.isArray(providersResult) ? providersResult : [];

            if (providers.length === 0) {
                return { items: [], page: currentPage, total_pages: 1, total_items: 0 };
            }

            const providerIds = providers.map((provider: any) => provider.id);

            const [countriesMap, servicesMap, activitiesMap, productTypesMap] = await Promise.all([
                this.getRelatedData('provider_countries', 'country_id', providerIds),
                this.getRelatedData('provider_services', 'service_id', providerIds),
                this.getRelatedData('provider_activities', 'activity_id', providerIds),
                this.getRelatedData('provider_product_types', 'product_type_id', providerIds)
            ]);

            const items = providers.map((provider: any) => ({
                ...provider,
                countries: countriesMap[provider.id] || [],
                services: servicesMap[provider.id] || [],
                activities: activitiesMap[provider.id] || [],
                product_types: productTypesMap[provider.id] || [],
            }));

            const totalPages = Math.ceil(totalItems / perPage);

            return { items, page: currentPage, total_pages: totalPages, total_items: totalItems };
        } catch (error) {
            console.error(error);
            return { items: [], page: 1, total_pages: 1, total_items: 0 };
        }
    }
}