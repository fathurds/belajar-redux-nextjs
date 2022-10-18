import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { store } from "../store";
import { getUsers, rehydrate, UserState, User } from "../store/users/userSlice";

interface HomeProps {
  user: UserState;
}
const Home = (props: HomeProps) => {
  const dispatch = useDispatch();

  const usersSelector = useSelector((state: HomeProps) => state.user);
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    dispatch(rehydrate(props.user));
  }, [dispatch, props]);

  useEffect(() => {
    setUsers(usersSelector.user);
  }, [usersSelector]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">Company</TableCell>
            <TableCell align="left">Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell align="left">{user.name}</TableCell>
              <TableCell align="left">{user.username}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">{user.phone}</TableCell>
              <TableCell align="left">{user.address.city}</TableCell>
              <TableCell align="left">{user.company.name}</TableCell>
              <TableCell align="left">{user.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export async function getServerSideProps() {
  await store.dispatch(getUsers());

  return {
    props: {
      user: store.getState().user,
    },
  };
}

export default Home;
