import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AlbumsList() {
    const [data, setData] = useState([]);
    const [artist, setArtist] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7150/api/album/${params.id}`).then((res) => {
            axios.get(`https://localhost:7150/api/artist/${res.data.artistId}`).then((w) => {
                setArtist(w.data.name);
            });
            setData([res.data]);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteAlbum = (id) => {
        axios.delete(`https://localhost:7150/api/album/${id}`).then(() => console.log("deleted album"));
        navigate(-1);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-4 px-5">
                    {data.map((album) => {
                        return (
                            <div key={album.id}>
                                <h2 className="text-light mt-5 mb-5">{album.title}</h2>
                                <img
                                    src={album.cover}
                                    alt="album cover"
                                    className="cover"
                                />
                                <div className="d-flex mt-2">
                                    <Link
                                        to={`/editalbum/${album.id}`}
                                        className="text-light"
                                    >
                                        <button className="btn btn-primary text-dark">Edit</button>
                                    </Link>
                                    <Link
                                        to={`/viewartist/${album.artistId}`}
                                        className="text-light"
                                    >
                                        <button className="btn btn-primary text-dark mx-2">
                                            View Artist
                                        </button>
                                    </Link>
                                    <button
                                        className="btn btn-danger text-dark "
                                        onClick={() => {
                                            deleteAlbum(album.id);
                                        }}
                                    >
                                        Delete Album
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {data.map((album) => {
                    return (
                        <div className="col-lg-8" key={album.id}>
                            <div className="mt-5">&nbsp;</div>
                            <div className="mt-5">&nbsp;</div>
                            <div className="row mb-2">
                                <div className="d-flex col-lg-3">
                                    <h4 className="text-light mb-3">Artist:</h4>
                                </div>
                                <div className="col-lg-5">
                                    <h4 className="text-light">{artist}</h4>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="d-flex col-lg-3">
                                    <h4 className="text-light mb-3">Date Released:</h4>
                                </div>
                                <div className="col-lg-5">
                                    <h4 className="text-light">
                                        {album.date.substring(0, 10)}
                                    </h4>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="d-flex col-lg-3">
                                    <h4 className="text-light mb-3">Duration:</h4>
                                </div>
                                <div className="col-lg-5">
                                    <h4 className="text-light">{album.duration} minutes</h4>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-3">
                                    <h4 className="text-light mb-3 align-baseline">
                                        Description:
                                    </h4>
                                </div>
                                <div className="col-lg-8">
                                    <h4 className="text-light">{album.description}</h4>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
