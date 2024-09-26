import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './layout/Footer';
import Presentation from './pages/Presentation';
import SearchProvider from './pages/SearchProvider';
import SignUp from './pages/SignUp';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import './styles/header.css';
import './styles/presentation.css';
import { UserProvider, Authenticated } from './contexts/userAuth';
import Messages from './pages/Messages';
import Header from './layout/Header';
import Provier from './pages/Provider';

interface LayoutProps {

}

function Layout(props: React.PropsWithChildren<LayoutProps>) {
	return (
		<>
			<Header />
			{props.children}
			<Footer />
		</>
	);
}

function App() {
	return (
		<UserProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<Presentation />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/admin" element={
							<Authenticated>
								<Admin />
							</Authenticated>
						} />
						<Route path="/messages" element={
							<Authenticated>
								<Messages />
							</Authenticated>
						} />
						<Route path="/profile" element={
							<Authenticated>
								<Profile />
							</Authenticated>
						} />
						<Route path="/search" element={<SearchProvider />} />
						<Route path='/provider/:id' element={<Provier />} />
					</Routes>
				</Layout>
			</Router>
		</UserProvider>
	);
}

export default App;
