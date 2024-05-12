import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {Header} from './header';
import Footer from './footer';
import Listings from './Listings';
import Visa from './Visa';
import Discussion from './Discussion';
import HomePage from './Home';
import './index.css';

export class App extends React.Component {
  render() {
    return (<React.StrictMode>
        <Header/>
        <div className='container-fluid d-flex flex-column'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/listings" element={<Listings/>}/>
              <Route path="/visa" element={<Visa/>}/>
              <Route path="/discussion" element={<Discussion/>}/>
            </Routes>
          </BrowserRouter>
          <Footer/>
        </div>
      </React.StrictMode>);
  }
}

