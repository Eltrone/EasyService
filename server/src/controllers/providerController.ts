import { Request, Response } from 'express';
import Provider from '../models/providerModel';
import Service from '../models/serviceModel';
import ProviderService from '../models/providerServiceModel';
import Country from '../models/countryModel';
import ProviderCountry from '../models/providerCountryModel';
import Producttype from '../models/producttypeModel';
import ProviderProducttype from '../models/providerProducttypeModel';

class ProviderController {
    // Create a new provider
    public static async create(req: Request, res: Response) {
        try {
            const provider = await Provider.create({
                ...req.body,
                user_id: (req.user as any)?.id
            });

            // If services are provided in the request body, attach them to the provider
            if (req.body.services && Array.isArray(req.body.services)) {
                // Delete old services associated with the provider
                await ProviderService.destroy({ where: { provider_id: provider.id } });

                // Iterate over provided service names
                await Promise.all(req.body.services.map(async (serviceName: string) => {
                    // Check if the service already exists
                    let service = await Service.findOne({ where: { name: serviceName } });
                    // If service does not exist, create it
                    if (!service) {
                        service = await Service.create({ name: serviceName });
                    }
                    // Attach the service to the provider
                    await ProviderService.findOrCreate({
                        where: { provider_id: provider.id, service_id: service.id },
                        defaults: { provider_id: provider.id, service_id: service.id }
                    });
                }));
            }

            // If countries are provided in the request body, attach them to the provider
            if (req.body.countries && Array.isArray(req.body.countries)) {
                // Delete old countries associated with the provider
                await ProviderCountry.destroy({ where: { provider_id: provider.id } });

                // Iterate over provided country names
                await Promise.all(req.body.countries.map(async (countryName: string) => {
                    // Check if the country already exists
                    let country = await Country.findOne({ where: { name: countryName } });
                    // If country does not exist, create it
                    if (!country) {
                        country = await Country.create({ name: countryName });
                    }
                    // Attach the service to the provider
                    await ProviderCountry.findOrCreate({
                        where: { provider_id: provider.id, country_id: country.id },
                        defaults: { provider_id: provider.id, country_id: country.id }
                    });
                }));
            }

            // If countries are provided in the request body, attach them to the provider
            if (req.body.product_types && Array.isArray(req.body.product_types)) {
                // Delete old countries associated with the provider
                await ProviderProducttype.destroy({ where: { provider_id: provider.id } });

                // Iterate over provided country names
                await Promise.all(req.body.product_types.map(async (product_type: string) => {
                    // Check if the country already exists
                    let producttype = await Producttype.findOne({ where: { name: product_type } });
                    // If country does not exist, create it
                    if (!producttype) {
                        producttype = await Producttype.create({ name: product_type });
                    }
                    // Attach the producttype to the provider
                    await ProviderProducttype.findOrCreate({
                        where: { provider_id: provider.id, producttype_id: producttype.id },
                        defaults: { provider_id: provider.id, producttype_id: producttype.id }
                    });
                }));
            }

            // Fetch the updated provider with attached services
            const updatedProvider = await Provider.findByPk(provider.id, {
                include: [
                    { model: Service, through: { attributes: [] } },
                    { model: Country, through: { attributes: [] } },
                    { model: Producttype, through: { attributes: [] } },
                ]
            });

            return res.status(201).json(updatedProvider);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Helper function to build include array
    private static buildIncludes(serviceName?: string, countryName?: string, producttypeName?: string) {
        const includes = [];

        if (serviceName) {
            includes.push({
                model: Service,
                where: { name: serviceName },
                through: { attributes: [] }
            });
        } else {
            includes.push({ model: Service, through: { attributes: [] } });
        }

        if (countryName) {
            includes.push({
                model: Country,
                where: { name: countryName },
                through: { attributes: [] }
            });
        } else {
            includes.push({ model: Country, through: { attributes: [] } });
        }

        if (producttypeName) {
            includes.push({
                model: Producttype,
                where: { name: producttypeName },
                through: { attributes: [] }
            });
        } else {
            includes.push({ model: Producttype, through: { attributes: [] } });
        }

        return includes;
    }

    // Helper function to build where clause
    private static buildWhereClause(typeActor?: 'private' | 'public', userId?: string) {
        const whereClause: any = {};

        if (typeActor) {
            whereClause.type_actor = typeActor;
        }

        if (userId) {
            whereClause.user_id = userId;
        }

        return whereClause;
    }

    // Get all providers
    public static async findAll(req: Request, res: Response) {
        try {
            // Retrieve per_page, page, and type_actor from query parameters, set default values if not provided
            const perPage = parseInt(req.query.per_page as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const typeActor = req.query.type_actor as 'private' | 'public' | undefined;
            const serviceName = req.query.service_name as string | undefined;
            const countryName = req.query.country_name as string | undefined;
            const producttypeName = req.query.product_type as string | undefined;
            const userId = req.query.user_id as string | undefined;

            // Calculate the offset for pagination
            const offset = (page - 1) * perPage;

            // Build query options
            const whereClause = ProviderController.buildWhereClause(typeActor, userId);
            const includeClause = ProviderController.buildIncludes(serviceName, countryName, producttypeName);

            const queryOptions: any = {
                where: whereClause,
                limit: perPage,
                offset: offset,
                include: includeClause,
                logging: console.log
            };

            // Find and count all providers with pagination and optional filtering
            const { count, rows } = await Provider.findAndCountAll(queryOptions);

            // Calculate total pages
            const totalPages = Math.ceil(count / perPage);

            // Send response with paginated data
            res.json({
                totalItems: count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: perPage,
                providers: rows,
            });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    // Get a single provider by ID
    public static async findOne(req: Request, res: Response) {
        try {
            const provider = await Provider.findByPk(req.params.id, {
                include: [
                    { model: Service, through: { attributes: [] } },
                    { model: Country, through: { attributes: [] } },
                    { model: Producttype, through: { attributes: [] } },
                ],
                logging: console.log // Add logging to see the generated SQL
            });
            if (!provider) {
                return res.status(404).json({ error: 'Provider not found' });
            }
            return res.status(200).json(provider);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Update a provider
    public static async update(req: Request, res: Response) {
        try {
            // Check if req.user is defined
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            // Find the provider by ID
            const provider = await Provider.findByPk(req.params.id);
            if (!provider) {
                return res.status(404).json({ error: 'Provider not found' });
            }

            delete req.body['user_id'];

            // Update provider's fields
            await provider.update(req.body);

            // If services are provided in the request body, attach them to the provider
            if (req.body.services && Array.isArray(req.body.services)) {
                // Delete old services associated with the provider
                await ProviderService.destroy({ where: { provider_id: provider.id } });

                // Iterate over provided service names
                await Promise.all(req.body.services.map(async (serviceName: string) => {
                    // Check if the service already exists
                    let service = await Service.findOne({ where: { name: serviceName } });
                    // If service does not exist, create it
                    if (!service) {
                        service = await Service.create({ name: serviceName });
                    }
                    // Attach the service to the provider
                    await ProviderService.findOrCreate({
                        where: { provider_id: provider.id, service_id: service.id },
                        defaults: { provider_id: provider.id, service_id: service.id }
                    });
                }));
            }

            // If countries are provided in the request body, attach them to the provider
            if (req.body.countries && Array.isArray(req.body.countries)) {
                // Delete old countries associated with the provider
                await ProviderCountry.destroy({ where: { provider_id: provider.id } });

                // Iterate over provided country names
                await Promise.all(req.body.countries.map(async (countryName: string) => {
                    // Check if the country already exists
                    let country = await Country.findOne({ where: { name: countryName } });
                    // If country does not exist, create it
                    if (!country) {
                        country = await Country.create({ name: countryName });
                    }
                    // Attach the service to the provider
                    await ProviderCountry.findOrCreate({
                        where: { provider_id: provider.id, country_id: country.id },
                        defaults: { provider_id: provider.id, country_id: country.id }
                    });
                }));
            }

            // If countries are provided in the request body, attach them to the provider
            if (req.body.product_types && Array.isArray(req.body.product_types)) {
                // Delete old countries associated with the provider
                await ProviderProducttype.destroy({ where: { provider_id: provider.id } });

                // Iterate over provided country names
                await Promise.all(req.body.product_types.map(async (product_type: string) => {
                    // Check if the country already exists
                    let producttype = await Producttype.findOne({ where: { name: product_type } });
                    // If country does not exist, create it
                    if (!producttype) {
                        producttype = await Producttype.create({ name: product_type });
                    }
                    // Attach the producttype to the provider
                    await ProviderProducttype.findOrCreate({
                        where: { provider_id: provider.id, producttype_id: producttype.id },
                        defaults: { provider_id: provider.id, producttype_id: producttype.id }
                    });
                }));
            }

            // Fetch the updated provider with attached services
            const updatedProvider = await Provider.findByPk(req.params.id, {
                include: [
                    { model: Service, through: { attributes: [] } },
                    { model: Country, through: { attributes: [] } },
                    { model: Producttype, through: { attributes: [] } },
                ]
            });

            return res.status(200).json(updatedProvider);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Delete a provider
    public static async delete(req: Request, res: Response) {
        try {
            // Check if req.user is defined
            if (!req.user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

	    if ((req?.user as any)?.type === "admin") {
	    	const deleted = await Provider.destroy({
                	where: { id: req.params.id }
            	});
	    } else {
	    	const deleted = await Provider.destroy({
                	where: { id: req.params.id, user_id: ((req?.user as any)?.id) }
            	});
	    }

            const deleted = await Provider.destroy({
                where: { id: req.params.id }
            });

            if (!deleted) {
                return res.status(404).json({ error: 'Provider not found' });
            }
            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default ProviderController;
