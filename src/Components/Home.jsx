import React, { useState } from 'react'
import './Home.css'
import axios from 'axios';
// import '@material/ripple'
import { Link } from 'react-router-dom';

function Home() {

    const [input, setInput] = useState({
        name: "",
        designation: "",
        phone: "",
        email: "",
        logo: "",
        address: ""
    })

    function handle(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value })
    }

    function submitForm(e) {
        e.preventDefault();
        axios.post("http://localhost:8080/users", input).then((res) => {
            alert("Form Submitted")
        })
    }

    return (
        <>
            <div className="vh-100 gradient-custom">
                <div className="container h-100">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-12 col-xl-7">
                            <div className="card shadow-2-strong card-registration">
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Visiting Card Form</h3>

                                    <form onSubmit={submitForm}>

                                        <div className="row">
                                            <div className="col-lg-6 mb-4">

                                                <div data-mdb-input-init className="form-outline">
                                                    <input onChange={handle} value={input.name} name='name' type="text" id="fullName" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="fullName">Full Name</label>
                                                </div>

                                            </div>
                                            <div className="col-lg-6 mb-4">

                                                <div data-mdb-input-init className="form-outline">
                                                    <input onChange={handle} value={input.designation} name='designation' type="text" id="designation" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="designation">Designation</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-4 pb-2">

                                                <div data-mdb-input-init className="form-outline">
                                                    <input onChange={handle} value={input.phone} name='phone' type="tel" maxLength='10' id="phoneNumber" className="form-control form-control-lg" />
                                                    <label className="form-label" name="phoneNumber">Phone Number</label>
                                                </div>

                                            </div>

                                            <div className="col-md-6 mb-4 pb-2">

                                                <div data-mdb-input-init className="form-outline">
                                                    <input onChange={handle} value={input.email} name='email' type="email" id="emailAddress" className="form-control form-control-lg" />
                                                    <label className="form-label" name="emailAddress">Email</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className="col-md-12 mb-2 pb-2">

                                                <div data-mdb-input-init className="form-outline">
                                                    <input onChange={handle} value={input.logo} name='logo' type="text" maxLength='7' id="logoText" className="form-control form-control-lg" />
                                                    <label className="form-label" name="logoText">Logo Text</label>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col-md-12 mb-6 pb-2">

                                                <div data-mdb-input-init className="form-outline">
                                                    <textarea onChange={handle} value={input.address} name='address' type="text" id="address" className="form-control form-control-lg" />
                                                    <label className="form-label" name="address">Address</label>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="mt-4 pt-2">
                                            <input data-mdb-ripple-init className="btn btn-lg w-100 fw-bold" style={{ backgroundColor: "#00b2b9", color: "white", padding: "15px" }} type="submit" value="Add User" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="container">
                <div className='viewUser'>
                    <Link to={'/vcard'} className='btn btn-info text-end text-light fw-bold'>View User <i class="far fa-arrow-alt-circle-right"></i></Link>
                </div>
            </div>
        </>
    )
}

export default Home