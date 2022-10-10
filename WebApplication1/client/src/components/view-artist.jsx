import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AlbumsList() {
    const [data, setData] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [search, setSearch] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7150/api/artist/${params.id}`).then((res) => {
            setData([res.data]);
            setAlbums(res.data.albums)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteArtist = () => {
        axios
            .delete(`https://localhost:7150/api/artist/${params.id}`)
            .then(() => console.log("deleted artist"));

        navigate("/");
    };

    const changeSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="container">
            {data.map((artist) => {
                return (
                    <div key={artist.id}>
                        <h2 className="text-light mt-5 mb-5 px-5">
                            {artist.name}
                        </h2>
                        <h5 className="text-light mb-5 px-5">{artist.bio}</h5>
                    </div>
                );
            })}
            {data.map((artist) => {
                return (
                    <div className="row mb-5" key={artist.id}>
                        <div className="d-flex">
                            <div className="col-sm-1 px-5">
                                <Link
                                    to={`/editartist/${artist.id}`}
                                    className="text-light"
                                >
                                    <button className="btn btn-primary text-dark">Edit</button>
                                </Link>
                            </div>
                            <div className="col-sm-2">
                                <button
                                    className="btn btn-danger text-dark mx-2"
                                    onClick={deleteArtist}
                                >
                                    Delete Artist
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
            <h2 className="text-light mt-5 mb-5 px-5">Discography</h2>
            <div className="mt-5">&nbsp;</div>
            <div className="row mb-3">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <label className="text-light">Search By Title: </label>
                    <input
                        className="form-control text-light mb-5"
                        onChange={changeSearch}
                        maxLength="40"
                        required
                    ></input>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {albums.length === 0 ? (
                    <h4 className="text-light text-center px-5">No albums to display</h4>
                ) : (
                    albums
                        // eslint-disable-next-line array-callback-return
                        .filter((val) => {
                            if (search === "") {
                                return val;
                            } else if (
                                val.title.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return val;
                            }
                        })
                        .map((album) => {
                            return (
                                <div className="row px-5" key={album.id}>
                                    <div className="d-flex mb-3 flex-column">
                                        <div className="col-sm-2"></div>
                                        <img
                                            src={album.cover}
                                            alt="album cover"
                                            className="img-preview"
                                        />
                                        <Link
                                            to={`/viewalbum/${album.id}`}
                                            className="text-light mt-2"
                                        >
                                            <button className="btn btn-primary text-dark mb-5">
                                                View
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                )}
            </div>
        </div>
    );
}
