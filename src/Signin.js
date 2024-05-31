// import React, {useState} from 'react';
// import {signInWithEmailAndPassword} from 'firebase/auth';
// import {Link, Navigate, useNavigate} from 'react-router-dom';
// import {auth} from './firebaseConfig';

import React from 'react';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';

export default function Signin(props) {
  const currentUser = props.currentUser;
  const loginFunction = props.loginCallback;
  
  const auth = getAuth(); //the authenticator

  const configObj = {
    signInOptions: [
      { 
        provider: EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
      {
        provider: GoogleAuthProvider.PROVIDER_ID
      }
    ],
    signInFlow: 'popup',
    callbacks: {
      signInSuccessWithAuthResult: () => false //don't do anything special on signin
    },
    credentialHelper: 'none'
  }

  return (
    <div className="card bg-light">
      <div className="container card-body">
        <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj} />
 
        {/* <p className="lead">Pick a user:</p>
        <Dropdown>
...
		</Dropdown> */}
      </div>
    </div>
  )
}

// // Initialize Firebase app
// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setError('');
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             console.log('User signed in!');
//             setEmail('');
//             setPassword('');
//             // Redirect to your desired page after successful sign in
//             navigate('/home');
//         } catch (error) {
//             setError("Failed to sign in: " + error.message);
//         }
//     };

//     return (
//         <main>
//             <div className="login-container">
//                 <div className="login-content">
//                     <h2>Log In</h2>
//                     {error && <p style={{color: 'red'}}>{error}</p>}
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label>Email</label>
//                             <input
//                                 type="email"
//                                 className="form-control"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className="button-container text-center my-btn">
//                             <button className="btn btn-primary" type="submit">Log In</button>
//                         </div>
//                         <div className="signup-prompt">
//                             Don't have an account? <Link to="/signup">Sign Up</Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </main>);
// };

// export {Login};