import React from 'react';
import axios from '../utils/axios';
import qs from 'qs';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useUser } from '../contexts/userAuth';
import { Link } from 'react-router-dom';
import styles from "./SearchProvider.module.css"
import classNames from 'classnames';

export interface Pagination<T> {
	items: T[];
	page: number;
	total_pages: number;
	total_items: number;
}

export interface Provider {
	id: number;
	company_name: string;
	logo: string;
	address: string;
	email: string;
	phone_number: string;
	description: string;
	countries?: number[];
	services?: number[];
	activities?: number[];
	product_types?: number[];
	contact_phone_number: string,
	contact_first_name: string,
	contact_last_name: string,
	contact_position: string,
	contact_email: string,
}

const FormRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-right: -15px;
  margin-left: -15px;
`;

const FormColumn = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-bottom: 1rem;
  flex: 1; // Adjusted for single-line layout
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

const CardStyled = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: 0.25rem;
`;

const CardBody = styled.div`
  padding: 1.25rem;
  p {
	margin: 0;
  }
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
	const [currentPage, setCurrentPage] = React.useState(1);
	const [loading, setLoading] = React.useState(false);
	const [totalPages, setTotalPages] = React.useState(1);
	const { config: configs, user } = useUser();

	React.useEffect(() => {
		fetchProviders('', currentPage);
	}, [currentPage]);

	async function fetchProviders(queryString = '', currentPage: number | null = null) {
		try {
			setLoading(true);
			const cr = currentPage ? "&page=" + currentPage : "";
			const userId = user ? "&userId=" + user.id : "";
			const response = await axios.get<Pagination<Provider>>(`/providers?${queryString}${cr}${userId}`);
			setProviders(response.data.items || []);
			setTotalPages(response.data.total_pages);
		} catch (error) {
			console.error('Failed to fetch providers:', error);
		}
		setLoading(false);
	}

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		try {
			e.preventDefault();
			setCurrentPage(1);

			const formData = new FormData(e.currentTarget);
			const formDataObject: { [key: string]: any } = {};

			formData.forEach((value, key) => {
				if (value) {
					if (!formDataObject[key]) {
						formDataObject[key] = [];
					}
					formDataObject[key].push(value);
				}
			});

			const queryString = qs.stringify(formDataObject, { arrayFormat: 'brackets', encode: false });
			await fetchProviders(queryString);
		} catch (error) {
			// ignore ...
		}
	};

	const PaginationControls = () => {
		const pages = [];
		const maxPagesToShow = 7;
		const halfRange = Math.floor((maxPagesToShow - 1) / 2);

		let startPage = Math.max(1, currentPage - halfRange);
		let endPage = Math.min(totalPages, currentPage + halfRange);

		if (currentPage <= halfRange) {
			endPage = Math.min(totalPages, maxPagesToShow);
		} else if (currentPage + halfRange >= totalPages) {
			startPage = Math.max(1, totalPages - (maxPagesToShow - 1));
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return (
			<ButtonGroup>
				<Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
					Previous
				</Button>

				{startPage > 1 && (
					<>
						<Button onClick={() => setCurrentPage(1)}>1</Button>
						{startPage > 2 && <span className="mx-1">...</span>}
					</>
				)}

				{pages.map(page => (
					<Button
						key={page}
						onClick={() => setCurrentPage(page)}
						variant={page === currentPage ? "primary" : "outline-primary"}
					>
						{page}
					</Button>
				))}

				{endPage < totalPages && (
					<>
						{endPage < totalPages - 1 && <span className="mx-1">...</span>}
						<Button onClick={() => setCurrentPage(totalPages)}>{totalPages}</Button>
					</>
				)}

				<Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
					Next
				</Button>
			</ButtonGroup>
		);
	};

	if (!configs) {
		return <></>;
	}

	return (
		<div className={classNames('container', styles.searchProvider)}>
			<h1 className="text-center pb-5">Find a Provider.</h1>
			<form onSubmit={onSubmit} className='mb-3'>
				<FormRow>
					<FormColumn>
						<label>Provider Type</label>
						<SelectStyled name="product_types" defaultValue="">
							<option value="">All</option>
							{configs.product_types.map((type) => (
								<option key={type.id} value={type.id}>
									{type.name}
								</option>
							))}
						</SelectStyled>
					</FormColumn>

					<FormColumn>
						<label>Activity Domain</label>
						<SelectStyled name="activities" defaultValue="">
							<option value="">None</option>
							{configs.activities.map((option) => (
								<option key={option.id} value={option.id}>
									{option.name}
								</option>
							))}
						</SelectStyled>
					</FormColumn>

					<FormColumn>
						<label>Services Needed</label>
						<SelectStyled name="services" defaultValue="">
							<option value="">None</option>
							{configs.services.map((service) => (
								<option key={service.id} value={service.id}>
									{service.name}
								</option>
							))}
						</SelectStyled>
					</FormColumn>

					<FormColumn>
						<label>Company Country</label>
						<SelectStyled name="countries" defaultValue="">
							<option value="">None</option>
							{configs.countries.map((country) => (
								<option key={country.id} value={country.id}>
									{country.name}
								</option>
							))}
						</SelectStyled>
					</FormColumn>
				</FormRow>
				<Button type="submit" variant="secondary" disabled={loading}>{loading ? "Loading..." : "Search"}</Button>
			</form>
			<div className="row h100vh mt-2">
				{providers.map((provider, index) => (
					<div className="col-md-3" key={index}>
						<CardStyled>
							<ImgStyled src={provider.logo || 'https://placehold.co/100x100'} alt={provider.company_name} />
							<CardBody>
								<Link to={`/providers/${provider.id}`}><strong style={{ color: "blue" }}>{provider.company_name}</strong></Link>
								<p><small>{provider.description}</small></p>
								<hr />
								<p><small><strong>Email:</strong> {provider?.email ?? "***"}</small></p>
								<p><small><strong>Phone:</strong> {provider?.phone_number ?? "***"}</small></p>
								{provider.activities && (
									<p><small><strong>Activity Domains:</strong>
										<ul>
											{configs.activities.filter(e => provider.activities?.includes(e.id)).map(e => (
												<li>{e.name}</li>
											))}
										</ul></small>
									</p>
								)}
								{provider.services && (
									<p><small><strong>Services Provided:</strong>
										<ul>
											{configs.services.filter(e => provider.services?.includes(e.id)).map(e => (
												<li>{e.name}</li>
											))}
										</ul></small>
									</p>
								)}
								{provider.countries && (
									<p><small><strong>Countries:</strong>
										<ul>
											{configs.countries.filter(e => provider.countries?.includes(e.id)).map(e => (
												<li>{e.name}</li>
											))}
										</ul></small>
									</p>
								)}
							</CardBody>
						</CardStyled>
					</div>
				))}
			</div>
			<PaginationControls />
		</div>
	);
}

export default SearchProvider;
