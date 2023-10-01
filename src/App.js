import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import AlbumsList from "./components/AlbumsList";
import AlbumDetails from "./components/AlbumDetails";
import AlbumsListByUser from "./components/AlbumsListByUser";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<UsersList />} />
          <Route exact path="/albums" element={<AlbumsList />} />
          <Route exact path="/album/:id" element={<AlbumDetails />} />
          <Route exact path="/albums/:id" element={<AlbumsListByUser />} />
        </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
