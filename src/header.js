import React from 'react';
import { Link, NavLink } from 'react-router-dom';
	
import { getAuth, signOut } from 'firebase/auth';

export class Header extends React.Component {
  handleSignOut = (event) => {
    signOut(getAuth());
    console.log("signing out");
  }

  render() {
    const currentUser = this.props.currentUser;

    return (<header>
        <h1>InterStu Spot</h1>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/listings">Job Listings</a></li>
            <li><a href="/discussion">Discussion Board</a></li>
            <li><a href="/visa">Visa Information</a></li>
            {/* <li><a href="/login">Login</a></li>
            <li><a href="/signUp">Sign up</a></li> */}
            {currentUser.userId && 
              <>
                <li><a href="/ProfilePage">Profile Page</a></li>
                <li>
                  <button className="btn btn-secondary ms-2" onClick={this.handleSignOut}>Sign Out</button>
                </li>
              </>
            } 
            {!currentUser.userId &&
              <li>
                  <a href="/login">Login</a>
              </li>
            }
          </ul>
        </nav>
      </header>);
  }
}
