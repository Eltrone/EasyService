import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import necessary components from react-router-dom
import Footer from './layout/Footer'; // Import Footer component
import Presentation from './pages/Presentation'; // Import Presentation component
import SearchProvider from './pages/SearchProvider'; // Import SearchProvider component
import Contact from './pages/ContactUs'; // Import Contact component
import Login from './pages/Login'; // Import Login component
import Admin from './pages/Admin'; // Import Admin component
import Profile from './pages/Profile'; // Import Profile component
import './styles/header.css'; // Import global styles
import { UserProvider, Authenticated } from './contexts/userAuth'; // Import UserProvider and Authenticated components from userAuth context
import Messages from './pages/Messages'; // Import Messages component
import Header from './layout/Header';

// Layout component to conditionally render SubHeader based on route
function Layout() {
  const location = useLocation(); // Get the current location using useLocation hook from react-router-dom
  return (
    <>
      <Header />
      {location.pathname === "/Presentation" && <Header />}
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout />
        <main className="container">
          <Routes>
            <Route path="/" element={<Presentation />} />
            <Route path="/ContactUs" element={<Contact />} />
            <Route path="/login" element={<Login />} />
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
            <Route path="/SearchProvider" element={<SearchProvider />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
