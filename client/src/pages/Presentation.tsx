import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import '../styles/presentation.css';
import HeaderContainer from '../components/HeaderContainer';
import { useUser } from '../contexts/userAuth';

const TwoColumnCard = styled.div`
  display: flex;
  background-color: #ffffff;
  align-items: center; // Assure que le contenu est centré verticalement
  justify-content: space-between; // Espacement entre les colonnes
  margin-bottom: 20px; // Espacement sous la carte
`;


const TwoColumnCardImageRight = styled(TwoColumnCard)`
  flex-direction: row-reverse; // Inverse l'ordre des colonnes
`;

const LeftColumn = styled.div`
  flex: 1;  background-image: url('https://sunacquisitions.com/wp-content/uploads/2019/10/what-to-do-before-selling-a-company-1024x683.jpg');

  background-size: cover; // Couvre toute la zone du div
  background-position: center; // Centre l'image
  height: 300px; // Hauteur fixe pour l'image
`;

const RightColumn = styled.div`
  flex: 2; // Plus d'espace pour le texte que pour l'image
  padding: 20px; // Padding pour le texte
`;

interface Member {
	name: string;
	picture: string;
	linkedin: string;
	github: string;
	twitter: string;
}

function Presentation() {

	const { user } = useUser();

	const members: Member[] = [
		{
			name: 'Abdelhafid MAHMOUDI',
			picture: 'https://avatars.githubusercontent.com/u/80753593?v=4',
			linkedin: 'https://www.linkedin.com/in/abdelhafid-mahmoudi/',
			github: 'https://github.com/abdelhafid-mahmoudi-env',
			twitter: 'https://twitter.com/Mahmoudi_Env',
		},
		{
			name: 'Amine EL ORCHE',
			picture: 'https://avatars.githubusercontent.com/u/131597426?v=4',
			linkedin: 'https://www.linkedin.com/in/amine-el-orche-a1038980',
			github: 'https://github.com/Eltrone',
			twitter: 'https://x.com/ELORCHEAmine',
		}
	];

	return (
		<Fragment>
			<HeaderContainer />
			<div className="container h100vh" style={{ backgroundColor: "white", marginTop: 50, marginBottom: 50 }}>
				<section id="home" className="section">
					<h1 className="section-title">Welcome to Easy Service</h1>
					<p className="text-center">Whether you're a company offering specialized services and products or an enterprise in search of reliable solutions, Easy Service is the ultimate platform to bridge your business needs. We streamline the connection between service providers and businesses seeking them, ensuring a seamless, efficient, and productive business matchmaking experience.</p>
					<p className="text-center">At Easy Service, we understand the challenges of finding the right business partners in today's competitive market. Our platform offers a user-friendly interface where companies can list their services, showcase their expertise, and gain visibility among potential clients. Conversely, businesses looking for services can browse through comprehensive profiles, compare offerings, and make informed decisions with ease and confidence.</p>
					<p className="text-center">Join Easy Service today and experience how we transform the way businesses meet, collaborate, and thrive together. Start streamlining your service procurement or offering process now and watch your business grow.</p>
					<div className="home-actions"></div>
				</section>

				<section id="features" className="section">
					<h2 className="section-title">Features</h2>
					<div className="grid">
						<TwoColumnCard>
							<LeftColumn></LeftColumn>
							<RightColumn>
								<h3>Are you a company looking for a specific service?</h3>
								<p>Our platform allows you to access a directory of qualified companies offering a comprehensive range of services. You can easily find the expert you need to support your export projects. Additionally, you will have access to valuable information to quickly establish contact.</p>
								<RouterLink to="/search" className="action-button">Access the search tool</RouterLink>
							</RightColumn>
						</TwoColumnCard>
						{!user && (
							<TwoColumnCardImageRight>
								<LeftColumn style={{ backgroundImage: "url('https://jcauaeaudit.com/wp-content/uploads/2021/04/How-Can-Corporate-Service-Providers-Ensure-AML-CFT-Compliance-in-the-UAE.jpg')" }}></LeftColumn>
								<RightColumn>
									<h3>Are you a service or product provider?</h3>
									<p>Increase your company's visibility by creating your profile on Easy Service. Highlight the various services and products you offer, along with your contact details, so businesses can easily reach out to you.</p>
									<RouterLink to="/signup" className="action-button">Create your provider account</RouterLink>
								</RightColumn>
							</TwoColumnCardImageRight>
						)}
						<div className="card" style={{ backgroundColor: '#ffffff', textAlign: "center" }}>
							<h3>Join our exchange forum (coming soon)</h3>
							<p>Access our community forum (coming soon) to exchange with other exporters, ask questions, and receive expert responses from the field. You can share your experiences and get practical advice for your export procedures.</p>
							<RouterLink to="/" className="action-button">Access the forum (coming soon)</RouterLink>
						</div>
					</div>
				</section>

				<section id="about" className="section">
					<h2 className="section-title">About Us</h2>
					<p className="text-center">Founded by two passionate programmers, EasyService aims to make global trading seamless.</p>
					<div className="member-grid">
						{members.map((member, index) => (
							<div key={member.name} className="card" style={{ backgroundColor: '#ffffff' }}>
								<img src={member.picture} alt={`Profile of ${member.name}`} className="image" />
								<h3 className="name mt-2">{member.name}</h3>
								<div className='d-flex gap-2'>
									<a href={member.linkedin} target="_blank" className="link">LinkedIn</a><br />
									<a href={member.github} target="_blank" className="link">GitHub</a><br />
									<a href={member.twitter} target="_blank" className="link">Twitter</a>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</Fragment>
	);
}

export default Presentation;