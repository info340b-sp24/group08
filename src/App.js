import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Header } from './header';
import { Login } from './Login';
import { SignUp } from './Signup';
import { Logout } from './Logout';
import Footer from './footer';
import Listings from './Listings';
import Visa from './Visa';
import Discussion from './Discussion';
import HomePage from './Home';
import ErrorPage from './ErrorPage';
import './index.css';

export class App extends React.Component {
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>InterStu Spot</title>
          <meta name="author" content="Hanrui Tang, Rock Guan, Xinyi Zhou, Eloise Hou" />
          <meta name="description" content="The platform is designed to offer real-time updated job opportunities for international students and also employment policies from the official channel. We're here to help every international student to get their loved position without missing any chance." />
        </Helmet>
        <Header />
        <div className='content'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/visa" element={<Visa />} />
              <Route path="/discussion" element={<Discussion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </>
    );
  }
}
