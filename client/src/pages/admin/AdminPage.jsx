import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import { fetchAllUsers } from "../../redux/adminSlice";
import UsersList from "../../components/admin/UsersList";
import NavBar from "../../components/navBar/NavBar";
import UploadVideo from "../../components/UploadVideo";


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

  return (
    <>
      <NavBar />
      <table className="table table-bordered">
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
    </>
  );
}
