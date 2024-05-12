import React from 'react';
import { createRoot } from 'react-dom';
import Header from './header';
import Footer from './footer';
import Listings from './Listings';
import Visa from './Visa';
import Discussion from './Discussion';
import HomePage from './Home';

const root = createRoot(document.getElementById('root'));

function App(props) {
  return (
    <React.StrictMode>
      <Header />
      <HomePage />
      <Listings />
      <Visa />
      <Discussion />
      <Footer />
    </React.StrictMode>
  );
};

export default App;