// ! ORIGINAL CODE
// import * as React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser, logoutUser } from "../../redux/authSlice";
// import { fetchAllUsers } from "../../redux/adminSlice";
// import UsersList from "../../components/admin/UsersList";
// import NavBar from "../../components/navBar/NavBar";
// import UploadVideo from "../../components/UploadVideo";
// import { Button } from "@mui/material";
// import { current } from "@reduxjs/toolkit";

// export default function AdminPage() {
//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const users = useSelector((state) => state.admin.users);
//   console.log("array of users", users);

//   // Fetch all users when the component mounts
//   React.useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);

//   // const handleLogout = () => {
//   //   dispatch(logoutUser());
//   //   navigate("/login"); // Redirect to login page after logout
//   // };

//   const handleProfile = () => {
//     dispatch(fetchCurrentUser())
//     console.log("coming from admins page")
//     navigate("/profile"); // Redirect to login page after logout
//   };

//   return (
//     <>
//       <NavBar />
//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th scope="col">ID</th>
//             <th scope="col">Username</th>
//             <th scope="col">Email</th>
//             <th scope="col">Role</th>
//             <th scope="col">Actions</th>
//           </tr>
//         </thead>
//         {/* <tbody> */}
//         {/* {users.map((user) => {
//             return (
//               <tr key={user._id}>
//                 <th scope="row">{user._id}</th>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//               </tr>
//             );
//           })} */}
//         {/* </tbody> */}
//         {users.map((user) => {
//           return <UsersList key={user._id} user={user} />;
//         })}
//       </table>
//       <UploadVideo />
//       {/* <button onClick={handleLogout}>Logout</button> */}
//       <Button variant="contained" color="success" onClick={handleProfile}>
//         Profile{" "}
//       </Button>
//     </>
//   );
// }

import * as React from "react";
import "./adminpage.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, logoutUser } from "../../redux/authSlice";
import { fetchAllUsers } from "../../redux/adminSlice";
import UsersList from "../../components/admin/UsersList";
import NavBar from "../../components/navBar/NavBar";
import UploadVideo from "../../components/UploadVideo";
import { Button } from "@mui/material";
import { current } from "@reduxjs/toolkit";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import Footer from "../../components/Footer";

export default function AdminPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const users = useSelector((state) => state.admin.users);
  console.log("array of users", users);

  // Fetch all users when the component mounts
  React.useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   navigate("/login"); // Redirect to login page after logout
  // };

  const handleProfile = () => {
    dispatch(fetchCurrentUser());
    console.log("coming from admins page");
    navigate("/main-page"); // Redirect to login page after logout
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <>
      <div className="d-flex">
        {/* Bootstrap Sidebar */}
        <div className="sidebar">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" to="/main-page">
                <HomeIcon fontSize="large" />
                Main
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/rooms">
                Rooms
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard/messages">
                <EmailIcon fontSize="large" />
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                <LogoutIcon fontSize="large" />
                Logout
              </button>
            </li>
            {/* Additional links here */}
          </ul>
        </div>
        {/* Main Content */}
        <div className="main-content flex-grow-1">
          <h1 className="manage_users">Manage Users</h1>
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {/* <tbody> */}
            {/* {users.map((user) => {
            return (
              <tr key={user._id}>
                <th scope="row">{user._id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            );
          })} */}
            {/* </tbody> */}
            {users.map((user) => {
              return <UsersList key={user._id} user={user} />;
            })}
          </table>
          <UploadVideo />
          {/* <button onClick={handleLogout}>Logout</button> */}
          <Button variant="contained" color="success" onClick={handleProfile}>
            Profile{" "}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
