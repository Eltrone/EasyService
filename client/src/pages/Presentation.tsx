import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #4460aa;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Navbar = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-light bg-primary"
})`
  justify-content: center;
`;

const NavList = styled.ul.attrs({
  className: "navbar-nav"
})`
  flex-direction: row;
  justify-content: center;
  padding-left: 0;
`;

const NavItem = styled.li.attrs({
  className: "nav-item"
})`
  margin: 0 1em;
`;

const NavLink = styled.a.attrs({
  className: "nav-link text-white"
})`
  &:hover {
    text-decoration: underline;
  }
`;

const Section = styled.section.attrs({
  className: "my-5 py-4"
})``;

const Grid = styled.div.attrs({
  className: "row"
})`
  justify-content: space-around;
`;

const Card = styled.div.attrs({
  className: "card col-md-3 m-2 text-center"
})`
  padding: 20px;
`;

const Image = styled.img.attrs({
  className: "rounded-circle mb-3"
})`
  width: 70px;
  height: 60px;
`;

const Name = styled.h3`
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #3498db;
  &:hover {
    text-decoration: underline;
  }
`;

function Presentation() {
  const members = [
    {
      name: 'Abdelhafid MAHMOUDI',
      picture: 'https://media.licdn.com/dms/image/C4E03AQHY088Hc6zkkw/profile-displayphoto-shrink_100_100/0/1615889145151?e=1723075200&v=beta&t=ipXlNNx17Gce2ySsWH2Q13zGP1_s_YpTejODOR2pev8',
      linkedin: 'https://www.linkedin.com/in/abdelhafid-mahmoudi/',
      github: 'https://github.com/abdelhafid-mahmoudi-env',
      twitter: 'https://twitter.com/Mahmoudi_Env',
    },
    {
      name: 'Amine EL ORCHE',
      picture: 'https://media.licdn.com/dms/image/C5603AQEbz-uohBov3w/profile-displayphoto-shrink_100_100/0/1579614100449?e=1723075200&v=beta&t=NwpMz5hR8oV6ZcEI1rdldsYySJCaijoXKGe7X80wTNA',
      linkedin: 'https://www.linkedin.com/in/amine-el-orche-a1038980',
      github: 'https://github.com/Eltrone',
      twitter: 'https://x.com/ELORCHEAmine',
    }
  ];

  return (
    <Container>
      <HeaderContainer>
        <Navbar>
          <NavList>
            <NavItem><NavLink href="#home">Home</NavLink></NavItem>
            <NavItem><NavLink href="#features">Features</NavLink></NavItem>
            <NavItem><NavLink href="#about">About Us</NavLink></NavItem>
          </NavList>
        </Navbar>
      </HeaderContainer>

      {/* Home Section */}
      <Section id="home" className="bg-light">
        <h1 className="text-center">Welcome to Easy Export</h1>
        <p className="text-center">Streamlining your export needs with a single platform.</p>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <h2 className="text-center">Features</h2>
        <Grid>
          {/* Example feature card */}
          <Card>
            <h3>Companies seeking help</h3>
            <p>Access a comprehensive suite of services designed to streamline and enhance your business. From regulatory compliance and market analysis to logistics and sales support, EasyService connects you with the tools needed to succeed in global markets.</p>
          </Card>
          <Card>
            <h3>Regulatory Compliance</h3>
            <p>Ensure your exports meet all international regulations with our comprehensive compliance tools.</p>
          </Card>
          <Card>
          <h3>Community Exchange (Coming Soon)</h3>
          <p>Engage with the export community in our Community Exchange forum. Post questions, receive expert responses from service providers, and share insights based on real-world experiences. This platform is designed to enhance collaboration and provide practical support for your export needs.</p>
          </Card>
          {/* Additional feature cards */}
        </Grid>
      </Section>

      {/* About Us Section */}
      <Section id="about">
        <h2 className="text-center">About Us</h2>
        <p className="text-center">Founded by industry experts, EasyService aims to make global trading seamless.</p>
        <Grid>
          {members.map(member => (
            <Card key={member.name}>
              <Image src={member.picture} alt={`Profile of ${member.name}`} />
              <Name>{member.name}</Name>
              <Link href={member.linkedin} target="_blank">LinkedIn</Link><br />
              <Link href={member.github} target="_blank">GitHub</Link><br />
              <Link href={member.twitter} target="_blank">Twitter</Link>
            </Card>
          ))}
        </Grid>
      </Section>
    </Container>
  );
}

export default Presentation;
