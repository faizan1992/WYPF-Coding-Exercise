import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { getUsers } from "../services/api";
import { styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "../userList.css";

const useStyles = styled((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  searchContainer: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const UsersList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  };

  return (
    <Container className={classes.root}>
      <h2>User List</h2>
      {/* search bar */}
      <div className={classes.searchContainer}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch();
          }}
        />
      </div>
      <br />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="tableheader"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>
              <TableCell align="right">
                <b>Name</b>
              </TableCell>
              <TableCell align="right">
                <b>Album Link</b>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {/* accordin part */}
      <List>
        {currentUsers.map((user) => (
          <Accordion key={user.id} className={classes.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary={user.id} />
              <ListItemText primary={user.name} />
              <Link to={`/albums/${user.id}`}>View Album</Link>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <Typography variant="subtitle1">
                  <b>Username:</b> {user.username}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Email:</b> {user.email}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Phone:</b> {user.phone}
                </Typography>
                <Typography variant="subtitle1">
                  <b>Address:</b>
                  {user.address.street}, {user.address.city},{" "}
                  {user.address.zipcode}
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </List>
      {/* pagination start feom here */}
      <div className={classes.pagination}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Page {currentPage}</Typography>
          </Grid>
          <Grid item xs={6}>
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(filteredUsers.length / usersPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      i + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(i + 1)}
                      className="page-link"
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default UsersList;
