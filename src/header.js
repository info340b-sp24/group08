import React from 'react';

export class Header extends React.Component {
  render() {
    return (<header>
        <h1>InterStu Spot</h1>
        <nav aria-label="Main navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/listings">Job Listings</a></li>
            <li><a href="/discussion">Discussion Board</a></li>
            <li><a href="/visa">Visa Information</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/signUp">Sign up</a></li>
          </ul>
        </nav>
      </header>);
  }
}
