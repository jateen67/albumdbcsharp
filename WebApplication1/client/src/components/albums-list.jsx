import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AlbumsList() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("https://localhost:7150/api/album").then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                setData((data) => [
                    ...data,
                    [
                        res.data[i].id,
                        res.data[i].title,
                        res.data[i].cover,
                    ],
                ])
            }
        });
    }, []);

    const changeSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="container">
            <div className="container mt-5">
                <h2 className="text-center text-light mt-3">
                    Welcome to Albumize, a music album database.
                </h2>
                <h6 className="text-center text-light mt-5">
                    This website allows you to keep track of music artists and albums.
                </h6>
                <h6 className="text-center text-light">
                    Created using the PERN tech stack and Bootstrap.
                </h6>
            </div>
            <div className="mb-5">&nbsp;</div>
            <h2 className="text-light mt-5 mb-5 px-5">Logged Albums</h2>
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
                {data.length === 0 ? (
                    <h4 className="text-light text-center px-5">No albums to display</h4>
                ) : (
                    data
                        // eslint-disable-next-line array-callback-return
                        .filter((val) => {
                            if (search === "") {
                                return val;
                            } else if (val[1].toLowerCase().includes(search.toLowerCase())) {
                                return val;
                            }
                        })
                        .map((album) => {
                            return (
                                <div className="row px-5" key={album[0]}>
                                    <div className="mb-3 d-flex flex-column">
                                        <div className="col-sm-2"></div>
                                        <img
                                            src={album[2]}
                                            alt="album cover"
                                            className="img-preview"
                                        />
                                        <Link
                                            to={`/viewalbum/${album[0]}`}
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
