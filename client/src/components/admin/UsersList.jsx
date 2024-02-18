import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/adminSlice";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

const UsersList = ({ user }) => {
  const dispatch = useDispatch();
  const deletedUser = () => {
    if (window.confirm("are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <>
      <tbody className="table-primary">
        <tr>
          <th scope="row">{user._id}</th>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={deletedUser}
                color="error"
                variant="outlined"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Stack>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default UsersList;
