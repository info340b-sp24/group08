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

    return (
      <header>
        <h1>InterStu Spot</h1>
        <nav aria-label="Main navigation">
          <ul>
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/listings" activeClassName="active">Job Listings</NavLink></li>
            <li><NavLink to="/discussion" activeClassName="active">Discussion Board</NavLink></li>
            <li><NavLink to="/visa" activeClassName="active">Visa Information</NavLink></li>
            {currentUser.userId &&
              <>
                <li><NavLink to="/profilepage" activeClassName="active">Profile Page</NavLink></li>
                <li>
                  <button className="btn btn-secondary ms-2" onClick={this.handleSignOut}>Sign Out</button>
                </li>
              </>
            }
            {!currentUser.userId &&
              <li>
                <NavLink to="/login" activeClassName="active">Login</NavLink>
              </li>
            }
          </ul>
        </nav>
      </header>
    );
  }
}