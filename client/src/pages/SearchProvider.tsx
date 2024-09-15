import React from 'react';
import axios from '../utils/axios'; // Assurez-vous que ce chemin est correct
import qs from 'qs';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define interfaces for your configurations and providers
interface Config {
    services: Array<{ name: string }>;
    types: Array<{ name: string }>;
    countries: Array<{ name: string }>;
}

interface Provider {
    id: number;
    name: string;
    logo_url: string;
    address: string;
    email: string;
    phone_number: string;
    presentation: string;
    activityDomain?: string[];  // Les domaines d'activité
  serviceProvided?: string[];  // Les services fournis
  countryLocation?: string[];
}

const Container = styled.div`
  max-width: 960px;
  margin: 20px auto;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const FormColumn = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }

  @media (min-width: 992px) {
    width: 25%;
  }
`;

const SelectStyled = styled.select`
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const ButtonStyled = styled.button`
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  display: block;
  width: 100%;
  cursor: pointer;
`;

const CardStyled = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const ImgStyled = styled.img`
  height: 43px;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: calc(0.25rem - 1px);
  border-top-right-radius: calc(0.25rem - 1px);
`;

function SearchProvider() {
    const [providers, setProviders] = React.useState<Provider[]>([]);
    const [configs, setConfigs] = React.useState<Config>({ services: [], types: [], countries: [] });
    const [currentPage, setCurrentPage] = React.useState(1);
    const resultsPerPage = 9;

    React.useEffect(() => {
      fetchConfigs();
      fetchProviders();
    }, [currentPage]);

    async function fetchConfigs() {
      try {
        const response = await axios.get<Config>('/api/configs');
        setConfigs(response.data);
      } catch (error) {
        console.error('Failed to fetch configs:', error);
      }
    }

    async function fetchProviders(queryString = '') {
      try {
        const response = await axios.get<{ providers: Provider[] }>(`/api/providers?${queryString}`);
        const startIndex = (currentPage - 1) * resultsPerPage;
        const selectedProviders = response.data.providers.slice(startIndex, startIndex + resultsPerPage);
        setProviders(selectedProviders);
      } catch (error) {
        console.error('Failed to fetch providers:', error);
      }
    }

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      setCurrentPage(1);
      const formData = new FormData(e.currentTarget);
      const formDataObject: { [key: string]: FormDataEntryValue } = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
    
      const queryString = qs.stringify(formDataObject); // Transforme en query string
      fetchProviders(queryString); // Fetch avec les filtres
    };    

    const PaginationControls = () => (
        <div>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Précédent</button>
            <span>Page {currentPage}</span>
            <button onClick={() => setCurrentPage(currentPage + 1)}>Suivant</button>
        </div>
    );

    return (
      <Container>
        <h1 className="text-center">Find a Provider</h1>
        <form onSubmit={onSubmit}>
          <FormRow>
          <FormColumn>
  <label>Activity Domain</label>
  <SelectStyled name="activityDomain" defaultValue="">
    <option value="">None</option>
    {configs.types.map((option) => (
      <option key={option.name} value={option.name}>
        {option.name}
      </option>
    ))}
  </SelectStyled>
</FormColumn>

<FormColumn>
  <label>Services Provided</label>
  <SelectStyled name="serviceProvided" defaultValue="">
    <option value="">None</option>
    {configs.services.map((service) => (
      <option key={service.name} value={service.name}>
        {service.name}
      </option>
    ))}
  </SelectStyled>
</FormColumn>

<FormColumn>
  <label>Country Location</label>
  <SelectStyled name="countryLocation" defaultValue="">
    <option value="">None</option>
    {configs.countries.map((country) => (
      <option key={country.name} value={country.name}>
        {country.name}
      </option>
    ))}
  </SelectStyled>
</FormColumn>

          </FormRow>
          <ButtonStyled type="submit">Search</ButtonStyled>
        </form>
        <div className="row">
          {providers.map((provider, index) => (
            <div className="col-md-4" key={index}>
              <CardStyled>
                <ImgStyled src={provider.logo_url || 'https://placehold.co/185x40'} alt={provider.name} />
                <CardBody>
  <h5>{provider.name}</h5>
  <p>{provider.presentation}</p>
  <p>Email: {provider.email}</p>
  <p>Phone: {provider.phone_number}</p>

  {/* Ajouter les informations manquantes */}
  {provider.activityDomain && (
    <p>Activity Domains: {provider.activityDomain.join(', ')}</p>
  )}
  {provider.serviceProvided && (
    <p>Services Provided: {provider.serviceProvided.join(', ')}</p>
  )}
  {provider.countryLocation && (
    <p>Country Locations: {provider.countryLocation.join(', ')}</p>
  )}
</CardBody>

              </CardStyled>
            </div>
          ))}
        </div>
        <PaginationControls />
      </Container>
    );
}

export default SearchProvider;
