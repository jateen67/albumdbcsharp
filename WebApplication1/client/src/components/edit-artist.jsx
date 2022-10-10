import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditArtist() {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    const changeName = (e) => {
        setName(e.target.value);
    };

    const changeBio = (e) => {
        setBio(e.target.value);
    };

    const addArtistClicked = (e) => {
        e.preventDefault();
        const id = params.id
        const artist = { id, name, bio };
        axios
            .put(`https://localhost:7150/api/artist/${params.id}`, artist)
            .then(() => console.log("artist edited"));
        navigate(`/viewartist/${id}`);
    };

    useEffect(() => {
        axios
            .get(`https://localhost:7150/api/artist/${params.id}`)
            .then((res) => {
                setName(res.data.name);
                setBio(res.data.bio);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <h2 className="text-light mt-5 mb-5 px-5">Edit Album</h2>
            <div className="mt-5">&nbsp;</div>
            <form onSubmit={addArtistClicked}>
                <div className="row mb-3">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <label className="text-light">Artist: </label>
                        <input
                            className="form-control text-light"
                            value={name}
                            onChange={changeName}
                            maxLength="40"
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
                        <label className="text-light">Bio: </label>
                        <textarea
                            className="form-control text-light"
                            value={bio}
                            onChange={changeBio}
                            maxLength="300"
                            rows="5"
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
