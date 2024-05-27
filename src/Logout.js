import React from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
 const navigate = useNavigate();

 const handleLogout = async () => {
   try {
     const auth = getAuth();
     await signOut(auth);
     console.log('User logged out successfully');
     navigate('/login');
   } catch (error) {
     console.error('Logout failed:', error);
   }
 };

 return (
   <button onClick={handleLogout}>Logout</button>
 );
};

export { Logout };
