import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material";
import { getPhotosByAlbumId, getAlbums, getUser } from "../services/api";

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

const AlbumDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const photoperpage = 12; // Number of Photo per page

  useEffect(() => {
    // Fetch the photos associated with the album
    getPhotosByAlbumId(id)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error(error));

    // Fetch the album data itself
    getAlbums()
      .then((response) => {
        const albumData = response.data.find(
          (album) => album.id === parseInt(id)
        );
        setAlbum(albumData);

        // Fetch user data based on user_id from the album
        getUser(albumData.userId)
          .then((userResponse) => setUser(userResponse.data))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [id]);

  const indexOfLastPhoto = currentPage * photoperpage;
  const indexOfFirstPhoto = indexOfLastPhoto - photoperpage;
  const currentPhoto = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className={classes.root}>
      <h3>View Images By :</h3>{user && <Typography variant="h3">{user.name}</Typography>}
      {album && (
          <Typography variant="h5">Album Title: <i>{album.title}</i></Typography>
        )}
        <br/>
      <Grid container spacing={3}>
        {currentPhoto.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card>
              <CardMedia
                component="img"
                alt={photo.title}
                height="200"
                image={photo.url}
              />
              <CardContent>
                <Typography variant="h6">{photo.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* pagination start from here */}
      <div
        style={{ marginTop: "20px", textAlign: "center", marginBottom: "20px" }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: Math.ceil(photos.length / photoperpage) }).map(
          (_, i) => (
            <Button
              key={i}
              variant="outlined"
              color="primary"
              onClick={() => paginate(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </Button>
          )
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(photos.length / photoperpage)}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default AlbumDetails;
