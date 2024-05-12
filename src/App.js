import React from 'react';
import { createRoot } from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Listings from './Listings';
import Visa from './Visa';
import Discussion from './Discussion';
import HomePage from './Home';

const root = createRoot(document.getElementById('root'));

const App = () => {
  return (
    <React.StrictMode>
      <Header />
      <div className='container-fluid d-flex flex-column'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/visa" element={<Visa />} />
          <Route path="/discussion" element={<Discussion />} />
        </Routes>
        <Footer />
      </div>
    </React.StrictMode>
  );
};

export default App;
