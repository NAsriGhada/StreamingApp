import React from 'react'
import { useSelector } from "react-redux";
import NavBar from '../components/NavBar'

const Profile = () => {
  // Accessing user information from auth slice of Redux store
  const user = useSelector((state) => state.auth.user);
  console.log(user)
   if (!user) {
     // Handle the case when user is null, e.g., display a loading indicator or a message
     return <div>Loading...</div>;
   }
  return <div>
    <NavBar/>
    Profile's {user.username}
  </div>;
}

export default Profile