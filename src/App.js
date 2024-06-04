import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './header';
import Signin from './Signin';
import { Logout } from './Logout';
import Footer from './footer';
import Listings from './Listings';
import Visa from './Visa';
import Discussion from './Discussion';
import DiscussionDetail from './DiscussionDetail';
import HomePage from './Home';
import ErrorPage from './ErrorPage';
import ProfilePage from './ProfilePage';
import './index.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import LoadingSpinner from './LoadingSpinner'; // Import your LoadingSpinner component

const DEFAULT_USERS = [
  { userId: null, userName: 'Guest', userImg: '' },
  { userId: 1, userName: 'User1', userImg: 'user1.jpg' },
];

function App() {
  const [currentUser, setCurrentUser] = useState(DEFAULT_USERS[0]);
  const [isLoading, setIsLoading] = useState(true); // State to manage overall loading state

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("signing in as", firebaseUser.displayName);
        const currentUserData = {
          userId: firebaseUser.uid,
          userName: firebaseUser.displayName,
          userImg: firebaseUser.photoURL || "/img/null.png"
        };
        setCurrentUser(currentUserData);
      } else {
        console.log("signed out");
        setCurrentUser(DEFAULT_USERS[0]);
      }
      setIsLoading(false); // Set loading to false after initial user authentication check
    });
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        setCurrentUser(DEFAULT_USERS[0]);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <Router>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>InterStu Spot</title>
          <meta name="author" content="Hanrui Tang, Rock Guan, Xinyi Zhou, Eloise Hou" />
          <meta name="description" content="The platform is designed to offer real-time updated job opportunities for international students and also employment policies from the official channel. We're here to help every international student to get their loved position without missing any chance." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <Header currentUser={currentUser} handleSignOut={handleSignOut} />
        <div className='content'>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/visa" element={<Visa />} />
              <Route path="/discussion" element={<Discussion currentUser={currentUser} />} />
              <Route path="/discussion/:id" element={<DiscussionDetail currentUser={currentUser} />} />
              <Route path="/login" element={<Signin />} />
              <Route path="/logout" element={<Logout handleSignOut={handleSignOut} />} />
              <Route path="/profilepage" element={<ProfilePage currentUser={currentUser} />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          )}
        </div>
        <Footer />
      </>
    </Router>
  );
}

export default App;
