import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Header } from './header';
import Signin from './Signin';
// import { SignUp } from './Signup';
import { Logout } from './Logout';
import Footer from './footer';
import Listings from './Listings';
import Visa from './Visa';
import Discussion from './Discussion';
import HomePage from './Home';
import ErrorPage from './ErrorPage';
import ProfilePage from './ProfilePage';
import './index.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const DEFAULT_USERS = [
  { userId: null, userName: 'Guest', userImg: '' },
  { userId: 1, userName: 'User1', userImg: 'user1.jpg' },
];

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: DEFAULT_USERS[0], 
    };
  }

  // Function to handle sign out
  handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        this.setState({ currentUser: DEFAULT_USERS[0] });
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  componentDidMount() {
    const auth = getAuth();
 

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log("signing in as", firebaseUser.displayName);
        console.log(firebaseUser);
        firebaseUser.userId = firebaseUser.uid;
        firebaseUser.userName = firebaseUser.displayName;
        firebaseUser.userImg = firebaseUser.photoURL || "/img/null.png";
        this.setState({ currentUser: firebaseUser });
      } else {
        console.log("signed out");
        this.setState({ currentUser: DEFAULT_USERS[0] });
      }
    });
  }

  render() {
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
          <Header currentUser={this.state.currentUser} />
          <div className='content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/visa" element={<Visa />} />
              <Route path="/discussion" element={<Discussion currentUser={this.state.currentUser} />} />
              <Route path="/login" element={<Signin loginUser={this.loginUser} />} />
              {/* <Route path="/signup" element={<SignUp />} /> */}
              <Route path="/logout" element={<Logout logoutUser={this.handleSignOut} />} />
              <Route path="/profilepage" element={<ProfilePage currentUser={this.state.currentUser} />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </>
      </Router> 
    )
  }
}

