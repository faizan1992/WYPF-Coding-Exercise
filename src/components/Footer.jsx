import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

const useStyles = styled((theme) => ({
  footer: {
    backgroundColor: '#3f51b5', // Customize the background color
    color: '#fff', // Customize the text color
    padding: theme.spacing(2),
    marginTop: 'auto', // Push the footer to the bottom of the page
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="body1">
          © {new Date().getFullYear()} Designed & Developed By : <a href='https://www.linkedin.com/feed/' target='_blank' rel="noreferrer">Faizan Ahmed Abbasi</a>
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
