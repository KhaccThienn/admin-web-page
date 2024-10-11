import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as Service from "../../../services/ComicService"
import Swal from 'sweetalert2';

function ListComic() {
    const [data, setData] = React.useState([]);
    const [query, setQuery] = React.useState('');

    const fetchDataAPI = async () => {
        try {
            const [result, error] = await Service.getAll();
            if (result) {
                console.log(result);
                setData(result.data);
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
                const [result, error] = await Service.deletee(id);
                if (result) {
                    Swal.fire("Deleted!", "", "success");
                    fetchDataAPI(); // Refresh the list after deletion
                }
                if (error) {
                    console.log(error);
                    Swal.fire("Error!", "Failed to delete the actor", "error");
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

    useEffect(() => {
        fetchDataAPI();
    }, []);
    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">List Comic</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                                <li className="breadcrumb-item active">List Comic</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={"/comic/add"} className="btn btn-primary">Add Comic</Link>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={e => handleChange(e)} />
                            <button className="btn btn-outline-success" type="button">Search</button>
                        </form>
                    </div>
                    <div className='table-responsive'>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Poster</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Release Year</th>
                                    <th scope="col">Views</th>
                                    <th scope="col">Rating</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{e.id}</td>
                                                <td style={{ width: "10%" }}>
                                                    <img className='card-img' src={e.poster} alt={e.name} />
                                                </td>
                                                <td>{e.title}</td>
                                                <td>
                                                    <div dangerouslySetInnerHTML={{ __html: e.description }} />
                                                </td>
                                                <td>{e.releaseYear}</td>
                                                <td>{e.view}</td>
                                                <td>{e.rating}</td>

                                                <td>
                                                    <Link to={`/comic/details/${e.id}`} className="btn btn-success rounded-0 mr-2 btn-sm me-2">Details</Link>
                                                    <Link to={`/comic/edit/${e.id}`} className="btn btn-warning rounded-0 mr-2 btn-sm me-2">Update</Link>
                                                    <button className="btn btn-danger rounded-0 btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </>
    );
}

export default ListComic