import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import ArtistsList from "./components/artists-list";
import AlbumsList from "./components/albums-list";
import AddArtist from "./components/add-artist";
import AddAlbum from "./components/add-album";
import EditArtist from "./components/edit-artist";
import EditAlbum from "./components/edit-album";
import ViewArtist from "./components/view-artist";
import ViewAlbum from "./components/view-album";
import Navbar from "./components/navbar";
import Footer from "./components/footer";


export default function App() {
    useEffect(() => {
        document.title = "Albumize";
    });
    return (
        <div className="container">
            <Navbar />
            <Routes>
                <Route path="/" element={<AlbumsList />} />
                <Route path="/artists" element={<ArtistsList />} />
                <Route path="/addalbum" element={<AddAlbum />} />
                <Route path="/addartist" element={<AddArtist />} />
                <Route path="/editalbum/:id" element={<EditAlbum />} />
                <Route path="/editartist/:id" element={<EditArtist />} />
                <Route path="/viewalbum/:id" element={<ViewAlbum />} />
                <Route path="/viewartist/:id" element={<ViewArtist />} />
            </Routes>
            <Footer />
        </div>
    );
}
