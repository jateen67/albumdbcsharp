import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAlbum() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState(new Date());
    const [cover, setCover] = useState("");
    const [artist, setArtist] = useState(0);
    const [artists, setArtists] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`https://localhost:7150/api/album/${params.id}`)
            .then((res) => {
                setTitle(res.data.title);
                setDescription(res.data.description);
                setDuration(res.data.duration);
                setCover(res.data.cover);
                setArtist(res.data.artistId);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios.get("https://localhost:7150/api/artist").then((res) => {
            if (res.data) {
                setArtists(
                    res.data.map((artist) => [artist.name, artist.id])
                );
            }
        });
    }, [title]);

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
        let id = params.id
        let artistId = Number(artist);
        const album = {
            id,
            title,
            description,
            duration,
            date,
            cover,
            artistId
        };

        axios
            .put(`https://localhost:7150/api/album/${params.id}`, album)
            .then(() => console.log("album edited"));

        navigate(`/viewalbum/${params.id}`);
    };

    return (
        <div className="container">
            <h2 className="text-light mt-5 mb-5 px-5">Edit Album</h2>
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
                            value={duration}
                            onChange={changeDuration}
                            maxLength="5"
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
                    <div className="col-lg-3"></div>
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
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex">
                        <div className="col-lg-7"></div>
                        <button className="btn btn-primary text-dark" type="submit">
                            Apply Changes
                        </button>
                        <button
                            className="btn btn-danger text-dark mx-2"
                            type="submit"
                            onClick={() => navigate(-1)}
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
