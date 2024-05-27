import React, {useState} from 'react';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import {app} from './firebaseConfig';

// Initialize Firebase ap
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(getAuth(app), email, password);
            console.log('User signed in!');
            setEmail('');
            setPassword('');
            // Redirect to your desired page after successful sign in
            navigate('/');
        } catch (error) {
            setError("Failed to sign in: " + error.message);
        }
    };

    return (
        <main>
            <div className="login-container">
                <div className="login-content">
                    <h2>Log In</h2>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="button-container text-center my-btn">
                            <button className="btn btn-primary" type="submit">Log In</button>
                        </div>
                        <div className="signup-prompt">
                            Don't have an account? <Link to="/signup">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>);
};

export {Login};