import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { URL_BACKEND } from "./api.js";
// import { BiShare } from "react-icons/bi";

const URL_BACKEND = 'http://192.168.11.106:1337';

function ResirvationComponent() {
    const [reservation, setReservation] = useState(null);
    const [userDC, setUserDC] = useState([]);
    const [filteredReservationsEnAttente, setFilteredReservationsEnAttente] = useState([]);
    const [filteredReservationsEnCours, setFilteredReservationsEnCours] = useState([]);
    const [filteredReservationsValide, setFilteredReservationsValide] = useState([]);
    const [filteredReservationsRefuse, setFilteredReservationsRefuse] = useState([]);

    // Pagination states
    const [currentPageEnAttente, setCurrentPageEnAttente] = useState(1);
    const [currentPageEnCours, setCurrentPageEnCours] = useState(1);
    const [currentPageValide, setCurrentPageValide] = useState(1);
    const [currentPageRefuse, setCurrentPageRefuse] = useState(1);
    const itemsPerPage = 5; // Number of items per page
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${URL_BACKEND}/api/users?populate=*&pagination[limit]=-1`);
            const users = response.data;
            setUserDC(users);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (!reservation) {
            fetchReservation();
        }
    }, [reservation]);

    const fetchReservation = async () => {
        try {
            const response = await axios.get(`${URL_BACKEND}/api/reservations?populate=*&pagination[limit]=-1`);
            const reservations = response.data.data;
            setReservation(reservations);
            //   console.log(reservations)

            setFilteredReservationsEnAttente(reservations?.filter(reservation => reservation.attributes.etat === "enAttente"));
            setFilteredReservationsEnCours(reservations?.filter(reservation => reservation.attributes.etat === "enCours"));
            setFilteredReservationsValide(reservations?.filter(reservation => reservation.attributes.etat === "valide"));
            setFilteredReservationsRefuse(reservations?.filter(reservation => reservation.attributes.etat === "refuse"));
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const imageUser = (userId) => {
        const currentUserData = userDC?.find(user => user.id === userId);
        return (
            <img
                src={currentUserData?.image && currentUserData?.image.url ? `${URL_BACKEND}${currentUserData?.image.url}` : 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/75/cc/7c/75cc7cf2-516f-b0f4-a8ed-3baccc1abcbf/source/512x512bb.jpg'}
                alt={currentUserData?.username}
                width={80}
                height={80}
                className='rounded-4'
            />

        );
    };

    const paasToenCours = async (id) => {
        try {
            await axios.put(`${URL_BACKEND}/api/reservations/${id}`, {
                data: { etat: "enCours" },
            });
            fetchReservation();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const paasToValid = async (id) => {
        try {
            await axios.put(`${URL_BACKEND}/api/reservations/${id}`, {
                data: { etat: "valide" },
            });
            fetchReservation();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const paasToRefuse = async (id) => {
        try {
            await axios.put(`${URL_BACKEND}/api/reservations/${id}`, {
                data: { etat: "refuse" },
            });
            fetchReservation();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const preToEnattente = async (id) => {
        try {
            await axios.put(`${URL_BACKEND}/api/reservations/${id}`, {
                data: { etat: "enAttente" },
            });
            fetchReservation();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const preToEncours = async (id) => {
        try {
            await axios.put(`${URL_BACKEND}/api/reservations/${id}`, {
                data: { etat: "enCours" },
            });
            fetchReservation();
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    // Helper function for rendering a table with pagination
    const renderTable = (reservations, currentPage, setCurrentPage) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = reservations.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            {/* <th scope="col">Select</th> */}
                            <th scope="col">User</th>
                            <th scope="col">Destination</th>
                            <th scope="col">Offre</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {currentItems.map((i, index) => (
                            <tr key={index}>
                                <td className="">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                {imageUser(i.attributes?.user?.data?.id)}
                                            </div>
                                        </div>
                                        <div >
                                            <div className="font-bold">{i.attributes?.user?.data?.attributes.username}</div>
                                            <div className="text-sm opacity-50">{i.attributes?.user?.data?.attributes.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="align-items-center">
                                    {i.attributes.destination}
                                    </td>
                                <td className="align-items-center">{i.attributes?.offre?.data.attributes.label}</td>
                                <td >
                                    <div className="d-flex"> 
                                        <button type="button" className="btn btn-sm mr-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => {
                                            setSelectedReservation(i);
                                        }}
                                    >
                                        details <i className="bi bi-eye-fill"></i>
                                    </button>
                                    {i.attributes.etat === "enAttente" && (
                                        <button className="btn btn-sm btn-info" onClick={() => paasToenCours(i.id)}>En Cours</button>
                                    )}
                                    {i.attributes.etat === "enCours" && (
                                        <>
                                            <button className="btn btn-sm mr-2 btn-outline-success" onClick={() => paasToValid(i.id)}>Validé</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => paasToRefuse(i.id)}>Refusé</button>
                                            <div className="lg:tooltip" data-tip="Annuler">
                                                <button className="btn btn-sm ml-1" onClick={() => preToEnattente(i.id)}><i className="bi bi-reply-all"></i></button>
                                            </div>

                                        </>
                                    )}
                                    {(i.attributes.etat === "valide" || i.attributes.etat === "refuse") && (
                                        <div className="lg:tooltip" data-tip="Annuler">
                                            <button className="btn btn-sm" onClick={() => preToEncours(i.id)}><i className="bi bi-reply-all"></i></button>
                                        </div>
                                    )}
                                    </div>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                        className="btn btn-sm "
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <span className="mx-2">{currentPage}</span>/{Math.max(Math.ceil(reservations.length / itemsPerPage))}
                    <button
                        onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(reservations.length / itemsPerPage)))}
                        className="btn btn-sm "
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </div>
            </>
        );
    };

    const DivUp = ({ reservation }) => {
        if (!reservation) return null;
        console.log('reservation :', reservation)
        return (
            <div className="fixed inset-0 d-flex  items-center justify-content-center z-50">
                <div className="bg-white p-2 rounded-lg shadow-lg z-10 w-auto d-flex justify-content-between">
                    <div className="card card-compact bg-base-100  shadow-xl">
                        <figure>
                            <img
                                src={reservation.attributes.offre?.data.attributes.image}
                                alt="Shoes"
                                width="100%"
                                height={400}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-titl text-lg">{reservation.attributes.offre?.data.attributes.label}</h2>
                            <p> {reservation.attributes.destination}</p>
                            <h2 className="card-titl text-lg">Etat de la demande</h2>
                            <p> {reservation.attributes.etat}</p>
                        </div>
                    </div>
                    <div className="card card-compact bg-base-100 w-auto shadow-xl mx-2">
                        <div className="card-body">
                            <h2 className="card-title text-lg">Nombre de voyageurs adultes</h2>
                            <p> {reservation.attributes.nbr_voyageurs_adultes}</p>
                            <h2 className="card-title text-lg">Nombre d’enfants</h2>
                            <p> {reservation.attributes.nbr_voyageurs_enfants}</p>
                            <h2 className="card-title text-lg">Pourquoi voyagez-vous ?</h2>
                            <p> {reservation.attributes.pourquoi_voyagez_vous}</p>
                            <h2 className="card-title text-lg">Quand souhaitez-vous partir ?</h2>
                            <p> {reservation.attributes.date_partir}</p>
                            <h2 className="card-title text-lg">Mes dates sont fixes</h2>
                            <p> {reservation.attributes.date_fixe.toString()}</p>
                            <h2 className="card-title text-lg">Quelle est la durée de votre séjour ?</h2>
                            <p> {reservation.attributes.duree}</p>
                            <h2 className="card-title text-lg">durée de mon voyage est non modifiable</h2>
                            <p> {reservation.attributes.duree_modifiable.toString()}</p>

                        </div>
                    </div>
                    <div className="card card-compact bg-base-100 w-auto shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-lg">Vous êtes intéressés par quelle catégorie d’hébergement ?</h2>
                            <p> {reservation.attributes.categorie_hebergement}</p>
                            <h2 className="card-title  text-lg">Choix de cabine</h2>
                            <p> {reservation.attributes.cabine}</p>
                            <h2 className="card-title text-lg">Quelle expérience vous souhaitez vivre ?</h2>
                            <p> {reservation.attributes.experience_souhaitez}</p>
                            <h2 className="card-title text-lg"> </h2>
                            <p></p>
                            <h2 className="card-title text-lg"> </h2>
                            <p></p>
                            <h2 className="card-title text-lg"> </h2>
                            <p></p>
                            <div className="flex w-52 flex-col gap-4">
                                <div className="d-flex items-center gap-4">
                                    <div className="skeleton h-24 w-20 shrink-0  mask mask-squircle rounded-full">
                                        {imageUser(reservation.attributes?.user?.data?.id)}

                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="skeleton w-auto p-2">{reservation.attributes?.user?.data?.attributes.username}</div>
                                        <div className="skeleton w-auto p-2">{reservation.attributes?.user?.data?.attributes.email}</div>
                                    </div>
                                </div>
                                <div className="skeleton h-32 w-full">
                                    <p className='text-sm p-3 font-medium'>Pays : {reservation.attributes?.user?.data?.attributes.pays}</p>
                                    <p className='text-sm p-3 font-medium'>Telephone : 0{reservation.attributes?.user?.data?.attributes.telephone}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );
    };

    return (
        <div>
            <main id="main" className="main">
                <div className="content-wrapper">
                    {/* Content */}
                    <div className="container-xxl flex-grow-1">


                        <div className="row">



                            <h2 className="card-title">Liste des Restaurant</h2>
                            {/*
                            <div className=" mb-5 d-flex">


                                <div className="col-lg-6">

                                    <label className="col-sm-5 form-label" htmlFor="basic-icon-default-select">Recherche par nom de restaurant</label>
                                    <div className="col-sm-8">
                                        <div className="input-group input-group-merge">
                                            <div className="input-group">
                                                <span id="basic-icon-default-fullname2" className="input-group-text">
                                                    <i className="bx bx-search fs-4 lh-0" /></span>
                                                <input type="text"
                                                    className="form-control border-0 "
                                                    value='' placeholder="Search..." aria-label="Search..." />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">

                                    <label className="col-sm-1 form-label" htmlFor="basic-icon-default-select">Ville</label>
                                    <div className="col-sm-10">
                                        <div className="input-group input-group-merge">
                                            <div className="input-group">
                                                <span id="basic-icon-default-fullname2" className="input-group-text">
                                                    <i className="bx bx-search fs-4 lh-0" /></span>

                                                <select className="form-select" onChange='' id="basic-icon-default-select">
                                                    <option value={""}></option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <label className="col-sm-1 form-label" htmlFor="basic-icon-default-select">Zone</label>
                                    <div className="col-sm-10">
                                        <div className="input-group input-group-merge">
                                            <div className="input-group">
                                                <span id="basic-icon-default-fullname2" className="input-group-text">
                                                    <i className="bx bx-search fs-4 lh-0" /></span>

                                                <select className="form-select" onChange={''} id="basic-icon-default-select">
                                                    <option value={""}></option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div> 
                            
                             /Search 

                            <div className="col-md-6 col-lg-4 mb-5" key={0}>

                                <div className="card h-100">
                                    <img className="card-img-top" src={''} alt="Card" height="200px" width="200px" />
                                    <div className="card-body">
                                        <h5 className="card-title">p</h5>
                                        <p className="card-text">
                                            <i className="ri-map-pin-2-fill" /> pa
                                        </p>
                                        <div className="dropdown">
                                            <button className="btn p-0" type="button" id="cardOpt{photo.photo_id}" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="bx bx-dots-vertical-rounded" />
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                                <a className="dropdown-item" onClick={() => console.log()} href>View more</a>
                                                <a className="dropdown-item" onClick={() => console.log()} href>Changer l'etat de validation</a>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            */}
                        </div>
                    </div>

                    <div className="row">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Etat de resirvation</h5>
                                {/* Default Tabs */}
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="EnAttente-tab" data-bs-toggle="tab" data-bs-target="#EnAttente" type="button" role="tab" aria-controls="EnAttente" aria-selected="true">
                                            En attente
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="EnCours-tab" data-bs-toggle="tab" data-bs-target="#EnCours" type="button" role="tab" aria-controls="EnCours" aria-selected="false" tabIndex='-1'>
                                            En cours
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="Valide-tab" data-bs-toggle="tab" data-bs-target="#Valide" type="button" role="tab" aria-controls="Valide" aria-selected="false" tabIndex='-1'>
                                            Validé
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="Refuse-tab" data-bs-toggle="tab" data-bs-target="#Refuse" type="button" role="tab" aria-controls="Refuse" aria-selected="false" tabIndex='-1'>
                                            Refusé
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content pt-2" id="myTabContent">
                                    <div className="tab-pane fade show active" id="EnAttente" role="tabpanel" aria-labelledby="EnAttente-tab">
                                        {/* Search */}
                                        <div className="navbar-nav align-items-center">
                                            <div className="nav-item d-flex align-items-center">
                                                <i className="bx bx-search fs-4 lh-0" />
                                                <input type="text"
                                                    className="form-control border-0 shadow-none"
                                                    value='xc' placeholder="Search..." aria-label="Search..." />
                                            </div>
                                        </div>
                                        {/* /Search */}
                                        <div className="table-responsive text-nowrap">
                                            {renderTable(filteredReservationsEnAttente, currentPageEnAttente, setCurrentPageEnAttente)}

                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="EnCours" role="tabpanel" aria-labelledby="EnCours-tab">
                                        {/* Search */}
                                        <div className="navbar-nav align-items-center">
                                            <div className="nav-item d-flex align-items-center">
                                                <i className="bx bx-search fs-4 lh-0" />
                                                <input type="text"
                                                    className="form-control border-0 shadow-none"
                                                    value='v' placeholder="Search..." aria-label="Search..." />
                                            </div>
                                        </div>
                                        {/* /Search */}
                                        <div className="table-responsive text-nowrap">
                                            {renderTable(filteredReservationsEnCours, currentPageEnCours, setCurrentPageEnCours)}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="Valide" role="tabpanel" aria-labelledby="Valide-tab">
                                        {/* Search */}
                                        <div className="navbar-nav align-items-center">
                                            <div className="nav-item d-flex align-items-center">
                                                <i className="bx bx-search fs-4 lh-0" />
                                                <input type="text"
                                                    className="form-control border-0 shadow-none"
                                                    value='in' placeholder="Search..." aria-label="Search..." />
                                            </div>
                                        </div>
                                        {/* /Search */}
                                        <div className="table-responsive text-nowrap">
                                            {renderTable(filteredReservationsValide, currentPageValide, setCurrentPageValide)}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="Refuse" role="tabpanel" aria-labelledby="Refuse-tab">
                                        {/* Search */}
                                        <div className="navbar-nav align-items-center">
                                            <div className="nav-item d-flex align-items-center">
                                                <i className="bx bx-search fs-4 lh-0" />
                                                <input type="text"
                                                    className="form-control border-0 shadow-none"
                                                    value='in' placeholder="Search..." aria-label="Search..." />
                                            </div>
                                        </div>
                                        {/* /Search */}
                                        <div className="table-responsive text-nowrap">
                                            {renderTable(filteredReservationsRefuse, currentPageRefuse, setCurrentPageRefuse)}
                                        </div>
                                    </div>
                                </div>{/* End Default Tabs */}
                            </div>
                        </div>

                    </div>



                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div>
                                    <button type="button" className="btn-close float-end m-2" data-bs-dismiss="modal" aria-label="Close"></button>

                                </div>
                                <DivUp reservation={selectedReservation} />

                            </div>
                        </div>
                    </div>


                </div>
            </main>
        </div>
    )
}

export default ResirvationComponent