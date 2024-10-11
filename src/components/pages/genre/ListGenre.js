import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import * as GenreService from "../../../services/GenreService"
import Swal from 'sweetalert2';
function ListGenre() {
    const [genres, setGenres] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const fetchGenres = async () => {
        try {
            const [result, error] = await GenreService.getGenres();
            if (result) {
                console.log(result);
                setGenres(result.data);
            }
            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Do you want to delete that item?",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
        })

        if (result.isConfirmed) {
            try {
                const [result, error] = await GenreService.deleteGenre(id);
                if (result) {
                    Swal.fire("Deleted!", "", "success");
                    fetchGenres(); // Refresh the list after deletion
                }
                if (error) {
                    console.log(error);
                    Swal.fire("Error!", "Failed to delete the genre", "error");
                }
            } catch (error) {
                console.log(error);
                Swal.fire("Error!", "An unexpected error occurred", "error");
            }
        }
    }

    const handleChange = async (e) => {
        console.log(e.target.value);
        setQuery(e.target.value)
    }

    const handleSearchForm = async (e) => {
        console.log(query);
        e.preventDefault()
        try {
            const [result, error] = await GenreService.getGenreByQuery(query);
            if (result) {
                console.log(result);
                setGenres(result.data);
            }
            if (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchGenres();
    }, []);
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List Genre</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List Genre</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={"/genre/add"} className="btn btn-primary">Add Genre</Link>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => handleChange(e)} />
                            <button className="btn btn-outline-success" type="button" onClick={e => handleSearchForm(e)}>Search</button>
                        </form>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                genres && genres.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{e.id}</td>
                                            <td>{e.name}</td>
                                            <td>{e.slug}</td>
                                            <td>
                                                <Link to={`/genre/edit/${e.id}`} className="btn btn-warning rounded-0 mr-2 btn-sm me-2">Update</Link>
                                                <button className="btn btn-danger rounded-0 btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default ListGenre