import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { getAlbumsByUserId, getUser } from '../services/api';
import Container from '@mui/material/Container';
import { styled } from '@mui/material';
import { useParams } from 'react-router-dom';

const useStyles = styled((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  accordion: {
    marginBottom: theme.spacing(2),
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  searchContainer: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const AlbumsListPerUser = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [albums, setAlbums] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const albumsPerPage = 9; // Number of albums per page
    const [user, setUser] = useState(null);

  useEffect(() => {
    getAlbumsByUserId(id)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.error(error));

      getUser(id)
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = albums.slice(indexOfFirstAlbum, indexOfLastAlbum);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className={classes.root}>
      <h2>Albums List By {user?.name}</h2>
      <Grid container spacing={3}>
        {currentAlbums.map((album) => (
          <Grid item xs={12} sm={6} md={4} key={album.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{album.title}</Typography>
                <Link to={`/album/${album.id}`}>View Album</Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* pagination start from here  */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: Math.ceil(albums.length / albumsPerPage) }).map((_, i) => (
          <Button
            key={i}
            variant="outlined"
            color="primary"
            onClick={() => paginate(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(albums.length / albumsPerPage)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default AlbumsListPerUser;
