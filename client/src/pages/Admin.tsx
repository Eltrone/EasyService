import React from 'react';
import * as Yup from "yup";
import instance from '../utils/axios';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import styled from '@mui/material/styles/styled';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { Form, Formik, FormikHelpers } from "formik"
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Divider, Paper } from '@mui/material';
import { useUser } from '../contexts/userAuth';

// Define the structure of the form values
interface Values {
	id?: number;
	company_name: string;
	logo: string;
	address: string;
	phone_number: string;
	email: string;
	description: string;
	website: string;
	type_actor: string;
	services: string[];
	countries: string[];
	product_types: string[];
}

const initial: Values = {
	company_name: '',
	logo: '',
	address: '',
	phone_number: '',
	email: '',
	description: '',
	website: '',
	type_actor: 'private',
	services: [],
	countries: [],
	product_types: [],
}

const validationSchema = Yup.object({
	company_name: Yup.string().required(),
	logo: Yup.string().required(),
	address: Yup.string().required(),
	phone_number: Yup.string().required(),
	email: Yup.string().email().required(),
	description: Yup.string().required(),
	website: Yup.string().required(),
	type_actor: Yup.string().required(),
});

const ButtonStyled = styled(Button)`
	margin-top: 20px;
`;

const Package = styled(Card)({
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
})

const AdminPage = () => {

	const [providers, setProviders] = React.useState<any[]>([]);
	const [initialValues, setinitialValues] = React.useState<Values | null>(null);
	const { user } = useUser();

	// Function to load data from the server
	async function loadData() {
		const query = user?.type == "admin" ? `` : `user_id=${user?.id}`;
		instance.get(`/providers?${query}`).then(response => {
			setProviders(response.data?.providers || []);
		}).catch(error => {
			// ignore ...
		}).finally(() => {
			// ignore ...
		})
	}

	React.useEffect(() => {
		loadData()
	}, []);

	async function onSubmit(values: Values, helpers: FormikHelpers<Values>) {
		try {
			let response = (values?.id)
				? await instance.put(`/providers/${values?.id}`, values)
				: await instance.post('/providers', values);
			setinitialValues(prepare(response.data));
			helpers.setStatus("Provider added successfully!");
			await loadData();
		} catch (error) {
			console.error('Error while adding the provider', error);
			alert('Error while adding.');
		}
	}

	// Function to prepare data for form initialization
	function prepare(provider: any) {
		const services = (provider?.Services as any[] || []).map(row => row.name);
		const countries = (provider?.Countries as any[] || []).map(row => row.name);
		const product_types = (provider?.Producttypes as any[] || []).map(row => row.name);
		return {
			...provider,
			services,
			countries,
			product_types
		}
	}

	// Function to reset form for adding new provider
	function newProvider() {
		return setinitialValues(initial)
	}

	// Function to set form values for editing provider
	function editProvider(provider: any) {
		return () => setinitialValues(prepare(provider))
	}

	// Function to format date from ISO string
	function formatDateFromISOString(isoString: string, format: string): string {
		const date = new Date(isoString);

		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		const hours = ('0' + date.getHours()).slice(-2);
		const minutes = ('0' + date.getMinutes()).slice(-2);
		const seconds = ('0' + date.getSeconds()).slice(-2);

		let formattedDate = format;

		formattedDate = formattedDate.replace('YYYY', year.toString());
		formattedDate = formattedDate.replace('MM', month);
		formattedDate = formattedDate.replace('DD', day);
		formattedDate = formattedDate.replace('HH', hours);
		formattedDate = formattedDate.replace('mm', minutes);
		formattedDate = formattedDate.replace('ss', seconds);

		return formattedDate;
	}

	// Function to delete provider
	function deleteProvider(provider: any) {
		return async () => {
			try {
				await instance.delete(`/providers/${provider?.id}`);
				await loadData();
			} catch (error) {
				console.error('Error while adding the provider', error);
				alert('Error while adding.');
			}
		}
	}

	// Function to handle modal close
	function onClose() {
		return setinitialValues(null)
	}

	return (
		<Container maxWidth="lg">
			<Modal open={!!initialValues} onClose={onClose}>
				<Package>
					<CardContent>
						{initialValues && (
							<Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
								{({ handleChange, handleBlur, handleReset, handleSubmit, values, status, isSubmitting, setFieldValue }) => (
									<Form onSubmit={handleSubmit} onReset={handleReset}>
										<h2 style={{ margin: 0, padding: 0 }}>{values?.id ? "Update provider" : "New provider"}</h2>
										{status ?? <h6>{status}</h6>}
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<TextField label="Company Name" name="company_name" value={values?.company_name} onBlur={handleBlur} onChange={handleChange} />
											</Grid>
											<Grid item xs={12}>
												<TextField label="Logo (URL)" name="logo" value={values?.logo} onBlur={handleBlur} onChange={handleChange} />
											</Grid>
											<Grid item xs={12}>
												<TextField label="Address" name="address" value={values?.address} onBlur={handleBlur} onChange={handleChange} />
											</Grid>
											<Grid item xs={12}>
												<TextField label="Phone Number" name="phone_number" value={values?.phone_number} onBlur={handleBlur} onChange={handleChange} />
											</Grid>
											<Grid item xs={12}>
												<TextField label="description" name="description" value={values?.description} onBlur={handleBlur} onChange={handleChange} />
											</Grid>
											<Grid item xs={12}>
												<TextField label="website" name="website" value={values?.website} onBlur={handleBlur} onChange={handleChange} />
											</Grid>
											<Grid item xs={12}>
												<TextField label="Email" name="email" value={values?.email} onBlur={handleBlur} onChange={handleChange} />
											</Grid>
											<Grid item xs={12}>
												<FormControl fullWidth>
													<InputLabel>Type of Actor</InputLabel>
													<Select name="type_actor" value={values?.type_actor} onBlur={handleBlur} onChange={handleChange}>
														<MenuItem value="private">Private</MenuItem>
														<MenuItem value="public">Public</MenuItem>
													</Select>
												</FormControl>
											</Grid>
											<Grid item xs={12}>
												<Autocomplete
													multiple
													freeSolo
													filterSelectedOptions
													value={(values.services || [])}
													onChange={(_, vs) => setFieldValue("services", vs)}
													filterOptions={createFilterOptions({
														matchFrom: 'start',
														stringify: (option) => option,
													})}
													options={[]}
													renderTags={(value, getTagProps) =>
														value.map((option, index) => (
															<Chip variant="outlined" label={option} {...getTagProps({ index })} />
														))
													}
													renderInput={(params) => (
														<TextField
															{...params}
															variant="outlined"
															label="Services"
															placeholder="Add a tag"
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12}>
												<Autocomplete
													multiple
													freeSolo
													filterSelectedOptions
													value={(values.countries || [])}
													onChange={(_, vs) => setFieldValue("countries", vs)}
													filterOptions={createFilterOptions({
														matchFrom: 'start',
														stringify: (option) => option,
													})}
													options={[]}
													renderTags={(value, getTagProps) =>
														value.map((option, index) => (
															<Chip variant="outlined" label={option} {...getTagProps({ index })} />
														))
													}
													renderInput={(params) => (
														<TextField
															{...params}
															variant="outlined"
															label="countries"
															placeholder="Add a tag"
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12}>
												<Autocomplete
													multiple
													freeSolo
													filterSelectedOptions
													value={(values.product_types || [])}
													onChange={(_, vs) => setFieldValue("product_types", vs)}
													filterOptions={createFilterOptions({
														matchFrom: 'start',
														stringify: (option) => option,
													})}
													options={[]}
													renderTags={(value, getTagProps) =>
														value.map((option, index) => (
															<Chip variant="outlined" label={option} {...getTagProps({ index })} />
														))
													}
													renderInput={(params) => (
														<TextField
															{...params}
															variant="outlined"
															label="product_types"
															placeholder="Add a tag"
														/>
													)}
												/>
											</Grid>
											<Grid item xs={12}>
												<Button
													type="submit"
													disabled={isSubmitting}
													variant="contained"
													color="primary"
												>
													{isSubmitting ? "Loading..." : (values?.id ? "Update" : "Create")}
												</Button>
											</Grid>
										</Grid>
									</Form>
								)}
							</Formik>
						)}
					</CardContent>
				</Package>
			</Modal>
			<ButtonStyled hidden={!!initialValues} onClick={newProvider} color="primary" variant="contained">
				New Provider
			</ButtonStyled>
			<Divider sx={{ mt: 2, mb: 2 }} />
			<TableContainer component={Paper}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>#ID</TableCell>
							<TableCell>COMPANY NAME</TableCell>
							<TableCell>ACTOR TYPE</TableCell>
							<TableCell>CREATED AT</TableCell>
							<TableCell>ACTIONS</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{providers.map((provider, index) => (
							<TableRow key={`provider-${index}`}>
								<TableCell>{provider.id}</TableCell>
								<TableCell>{provider.company_name}</TableCell>
								<TableCell>{provider?.type_actor}</TableCell>
								<TableCell>{formatDateFromISOString(provider?.createdAt, 'MM/DD/YYYY HH:mm')}</TableCell>
								<TableCell>
									<IconButton onClick={editProvider(provider)}>
										<EditIcon />
									</IconButton>
									<IconButton onClick={deleteProvider(provider)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}

export default AdminPage;
