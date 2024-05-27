import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCh28JPQXixCmN-6BDhbQpAcFROGqRF2Ew",
  authDomain: "interstu-spot-340.firebaseapp.com",
  databaseURL: "https://interstu-spot-340-default-rtdb.firebaseio.com",
  projectId: "interstu-spot-340",
  storageBucket: "interstu-spot-340.appspot.com",
  messagingSenderId: "545699596164",
  appId: "1:545699596164:web:45e330178c877de6343fd1",
  measurementId: "G-8DBKCZ25BK"
};

  const app = initializeApp(firebaseConfig);
  export {app};