import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddAlbum() {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState(0);
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState(new Date());
    const [cover, setCover] = useState("");
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://localhost:7150/api/artist").then((res) => {
            if (res.data) {
                setArtist(res.data[0].id);
                setArtists(
                    res.data.map((artist) => [artist.name, artist.id])
                );
            }
        });
    }, []);

    const changeTitle = (e) => {
        setTitle(e.target.value);
    };

    const changeArtist = (e) => {
        setArtist(e.target.value);
    };

    const changeDescription = (e) => {
        setDescription(e.target.value);
    };

    const changeDuration = (e) => {
        setDuration(e.target.value);
    };

    const changeDate = (e) => {
        setDate(e);
    };

    const changeCover = (e) => {
        setCover(e.target.value);
    };

    const addAlbumClicked = (e) => {
        e.preventDefault();
        let artistId = Number(artist);
        const album = {
            title,
            description,
            duration,
            date,
            cover,
            artistId
        };
        axios.post("https://localhost:7150/api/album", album).then((res) => {
            console.log("album added");
        });
        navigate("/");
    };

    return (
        <div className="container">
            <h2 className="text-light mt-5 mb-5 px-5">Add New Album</h2>
            <div className="mt-5">&nbsp;</div>
            <form onSubmit={addAlbumClicked}>
                <div className="row mb-3">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-4">
                        <label className="text-light">Title: </label>
                        <input
                            className="form-control text-light"
                            value={title}
                            onChange={changeTitle}
                            maxLength="40"
                            onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                            required
                        ></input>
                    </div>
                    <div className="col-lg-4">
                        <label className="text-light">Artist: </label>
                        <select
                            className="form-control text-light"
                            required
                            value={artist}
                            onChange={changeArtist}
                            onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                        >
                            {artists.map((artist) => {
                                return (
                                    <option key={artist} value={artist[1]}>
                                        {artist[0]}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-4">
                        <label className="text-light">Duration: </label>
                        <input
                            className="form-control text-light"
                            type="text"
                            pattern="\d*"
                            value={duration}
                            onChange={changeDuration}
                            maxLength="3"
                            onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                            required
                        ></input>
                    </div>
                    <div className="col-lg-4">
                        <label className="text-light">Date Released: </label>
                        <DatePicker
                            className="form-control text-light"
                            selected={date}
                            onChange={changeDate}
                            onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-4">
                        <label className="text-light">
                            Cover (300x300 .png recommended):
                        </label>
                        <input
                            className="form-control text-light"
                            type="text"
                            value={cover}
                            onChange={changeCover}
                            onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                            required
                        ></input>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <label className="text-light">Description: </label>
                        <textarea
                            className="form-control text-light"
                            value={description}
                            onChange={changeDescription}
                            rows="5"
                            maxLength="300"
                            onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex">
                        <div className="col-lg-7"></div>
                        <button className="btn btn-primary text-dark" type="submit">
                            Add Album
                        </button>
                        <button
                            className="btn btn-danger text-dark mx-2"
                            type="submit"
                            onClick={() => navigate("/")}
                            onKeyDown={(e) => {
                                e.key === "Enter" && e.preventDefault();
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
