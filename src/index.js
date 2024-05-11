import React from 'react';
import { createRoot } from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Listings from './Listings';
import Visa from './Visa';
import Discussion from './Discussion';

const root = createRoot(document.getElementById('root'));

const App = () => {
  return (
    <React.StrictMode>
      <Header />
      <Listings />
      <Visa />
      <Discussion />
      <Footer />
    </React.StrictMode>
  );
};

root.render(<App />);