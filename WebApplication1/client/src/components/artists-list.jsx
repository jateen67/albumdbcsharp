import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Constants from "../utilities/Constants";

export default function AlbumsList() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const url = Constants.BASE_URL;

    useEffect(() => {
        axios.get(`${url}/api/artist`).then((res) => {
            setData(res.data);
        });
    }, []);

    const deleteArtist = (id) => {
        axios
            .delete(`${url}/api/artist/${id}`)
            .then(() => console.log("deleted artist"));

        setData((prev) => prev.filter((el, i) => el.id !== id));
    };

    const changeSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="container">
            <h2 className="text-light mt-5 mb-5 px-5">Logged Artists</h2>
            <div className="mt-5">&nbsp;</div>
            <div className="row mb-3">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <label className="text-light">Search By Name: </label>
                    <input
                        className="form-control text-light mb-5"
                        onChange={changeSearch}
                        maxLength="40"
                        required
                    ></input>
                </div>
            </div>
            {data.length === 0 ? (
                <h4 className="text-light text-center px-5">No artists to display</h4>
            ) : (
                data
                    // eslint-disable-next-line array-callback-return
                    .filter((val) => {
                        if (search === "") {
                            return val;
                        } else if (
                            val.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return val;
                        }
                    })
                    .map((artist) => {
                        return (
                            <div className="row px-5" key={artist.id}>
                                <div className="d-flex mb-3">
                                    <div className="col-sm-2"></div>
                                    <h3 className="text-light col-sm-6">{artist.name}</h3>
                                    <Link
                                        to={`/viewartist/${artist.id}`}
                                        className="text-light"
                                    >
                                        <button className="btn btn-primary text-dark mx-2">
                                            View
                                        </button>
                                    </Link>
                                    <Link
                                        to={`/editartist/${artist.id}`}
                                        className="text-light"
                                    >
                                        <button className="btn btn-primary text-dark">Edit</button>
                                    </Link>
                                    <button
                                        className="btn btn-danger text-dark mx-2"
                                        onClick={() => {
                                            deleteArtist(artist.id);
                                        }}
                                    >
                                        Delete Artist
                                    </button>
                                </div>
                            </div>
                        );
                    })
            )}
        </div>
    );
}
